const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
const bcrypt = require("./bcrypt");
const {
    addUser,
    getUser,
    verify,
    updatePassword,
    storeCode,
    updateImage,
    setBio,
    otherUser
} = require("./db");
const csurf = require("csurf");
const { requireLoggedOutUser } = require("./middleware");
const cryptoRandomString = require("crypto-random-string");
const { sendEmail } = require("./ses");
const s3 = require("./s3");
const { s3Url } = require("./config");

app.use(compression());

let secrets;
if (process.env.NODE_ENV != "production") {
    secrets = require("./secrets");
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    secrets = process.env;
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.use(express.json());

app.use(
    cookieSession({
        secret: secrets.SESSION_SECRET,
        maxAge: 1000 * 60 * 60 * 24 * 14
    })
);

app.use(csurf());

app.use(
    express.urlencoded({
        extended: false
    })
);

/////// DO NOT TOUCH

const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");

const diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

/////// DO NOT TOUCH

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

app.use(express.static("./public"));

app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

app.get("/register", function(req, res) {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.post("/register", (req, res) => {
    let first = req.body.first,
        last = req.body.last,
        email = req.body.email;

    ///// hash the submitted password
    bcrypt.hash(req.body.password).then(hashedPass => {
        // put the first, last, email and hashed password into the users table
        addUser(first, last, email, hashedPass)
            .then(function(data) {
                // upon success put the user's id into req.session and redirect to home
                req.session.userId = data.rows[0].id;
                req.session.email = data.rows[0].email;
                res.json(data.rows[0]);
            })
            // upon failure, re-render the register template with an error message
            .catch(function(err) {
                console.log("err in register: ", err);
                res.sendStatus(500);
            });
    });
});

app.post("/login", (req, res) => {
    let email = req.body.email,
        password = req.body.password;
    // - find the info from the user's table by the submitted email address
    getUser(email)
        .then(data => {
            // - compare the submitted password to the saved hashed password from the database using bcrypt's compare
            bcrypt.compare(password, data[0].password).then(result => {
                if (result) {
                    req.session.userId = data[0].id;
                    req.session.email = data[0].email;
                    // if (data[0].id) {
                    //     req.session.profileId = data[0].id;
                    // }
                    res.json(data[0]);
                } else {
                    // - if there is no match, re-render the template with an error message
                    res.json(false);
                }
            });
        })
        .catch(err => {
            console.log("error in login: ", err);
            res.json(false);
        });
});

app.post("/reset", requireLoggedOutUser, (req, res) => {
    const secretCode = cryptoRandomString({ length: 6 });
    let email = req.body.email,
        message = "Here is your code for reseting: " + secretCode;

    // find the users email in the table
    getUser(email)
        .then(data => {
            if (data) {
                res.json(data[0]);
                sendEmail(email, message, "Reset your password")
                    .then(() => {
                        console.log("SendEmail was successfull: ");
                    })
                    .catch(err => {
                        console.log("error in sendEmail: ", err);
                    });

                storeCode(email, secretCode).then(result => {
                    console.log("StoreCode worked!: ", result);
                });
            } else {
                res.json(false);
            }
        })
        .catch(err => {
            console.log("Error in reset: ", err);
            res.json(false);
        });
});

app.post("/verify", requireLoggedOutUser, (req, res) => {
    let email = req.body.email,
        code = req.body.code,
        password = req.body.password;
    console.log("email: ", email);

    // compare code with code from database and insert new password
    verify(email)
        .then(data => {
            if (data[0].code === code) {
                bcrypt
                    .hash(password)
                    .then(hashedPass => {
                        // put the first, last, email and hashed password into the users table
                        updatePassword(email, hashedPass)
                            .then(function(data) {
                                res.json(data);
                            })
                            // upon failure, re-render the register template with an error message
                            .catch(function(err) {
                                console.log("err in setNewPassword: ", err);
                                res.json(false);
                            });
                    })
                    .catch(err => {
                        console.log("Error in bcyrpt: ", err);
                        res.json(false);
                    });
            } else {
                res.json(false);
            }
        })
        .catch(err => {
            console.log("Error in verify: ", err);
        });
});

app.get("/user", (req, res) => {
    let email = req.session.email;

    getUser(email)
        .then(data => {
            res.json({
                first: data[0].first,
                last: data[0].last,
                id: data[0].id,
                image: data[0].image || "/default.png",
                bio: data[0].bio
            });
        })
        .catch(err => {
            console.log("error in GET /user: ", err);
        });
});

app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    let file = s3Url + req.file.filename,
        id = req.session.userId;

    updateImage(file, id)
        .then(data => {
            res.json(data.rows[0].image);
        })
        .catch(err => {
            console.log("Error in updateImage: ", err);
            res.sendStatus(500);
            res.json(false);
        });
});

app.post("/setBio", (req, res) => {
    let bio = req.body.bio,
        id = req.session.userId;
    console.log("bio: ", bio);
    setBio(bio, id)
        .then(data => {
            console.log("data from setBio: ", data);
            res.json(data.rows[0].bio);
        })
        .catch(err => {
            console.log("error in setBio: ", err);
        });
});

app.get("/user/:id.json", (req, res) => {
    let id = req.params.id,
        userId = req.session.id;
    console.log("id: ", id);
    otherUser(id).then(data => {
        console.log("otherUser: ", data);
        res.json({
            first: data[0].first,
            last: data[0].last,
            image: data[0].image || "/default.png",
            bio: data[0].bio,
            userId: userId,
            id: data[0].id
        });
    });
});

app.get("/logout", (req, res) => {
    (req.session.userId = null), res.redirect("/");
});

////// HAS TO BE THE LAST ROUTE ///////
app.get("*", function(req, res) {
    if (!req.session.userId) {
        res.redirect("/register");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

//////////////////////////////////////

app.listen(8080, function() {
    console.log("I'm listening.");
});
