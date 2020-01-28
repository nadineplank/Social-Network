const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
const bcrypt = require("./bcrypt");
const { addUser } = require("./db");

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

app.use(compression());

app.use(express.static("./public"));

app.use(express.json());

app.use(
    express.urlencoded({
        extended: false
    })
);

app.use(
    cookieSession({
        secret: secrets.SESSION_SECRET,
        maxAge: 1000 * 60 * 60 * 24 * 14
    })
);

app.get("/register", function(req, res) {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.post("/register", (req, res) => {
    console.log("Req.body: ", req.body);
    let first = req.body.first,
        last = req.body.last,
        email = req.body.email;

    ///// hash the submitted password
    bcrypt.hash(req.body.password).then(hashedPass => {
        // put the first, last, email and hashed password into the users table
        addUser(first, last, email, hashedPass)
            .then(function(data) {
                console.log("Data: ", data);
                // upon success put the user's id into req.session and redirect to the petition
                req.session.userId = data.rows[0].id;
                res.json(data.rows[0]);
            })
            // upon failure, re-render the register template with an error message
            .catch(function(err) {
                console.log("err in register: ", err);
                res.sendStatus(500);
            });
    });
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
