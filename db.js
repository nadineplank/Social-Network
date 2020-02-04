const spicedPg = require("spiced-pg");

const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/network"
);

exports.addUser = function(first, last, email, password) {
    return db.query(
        `INSERT INTO users (first, last, email, password)
        VALUES ($1, $2, $3, $4)
        RETURNING id, email`,
        [first, last, email, password]
    );
};

exports.getUser = function(email) {
    return db
        .query(
            `SELECT *
            FROM users
            WHERE email = $1`,
            [email]
        )
        .then(({ rows }) => rows);
};

exports.storeCode = function(email, secretCode) {
    return db.query(
        `INSERT INTO reset (email, code)
            VALUES ($1, $2)
            ON CONFLICT (email)
            DO UPDATE SET code = $2
            created_at = now()
            RETURNING code`,
        [email, secretCode]
    );
};

exports.verify = function(email) {
    return db
        .query(
            `SELECT code
            FROM reset
            WHERE CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes'
            AND email = $1`,
            [email]
        )
        .then(({ rows }) => rows);
};

exports.updatePassword = function(password, email) {
    return db.query(
        `UPDATE users
    SET password = $1
    WHERE email = $2`,
        [password, email]
    );
};

exports.updateImage = function(image, id) {
    return db.query(
        `UPDATE users
        SET image = $1
        WHERE id = $2
        RETURNING image`,
        [image, id]
    );
};

exports.setBio = function(bio, id) {
    return db.query(
        `UPDATE users
        SET bio = $1
        WHERE id = $2
        RETURNING bio`,
        [bio, id]
    );
};

exports.getOtherUser = function(id) {
    return db
        .query(
            `SELECT image, bio, first, last, id
        FROM users
        WHERE id = $1`,
            [id]
        )
        .then(({ rows }) => rows);
};

exports.findPeople = function(val) {
    return db
        .query(
            `SELECT first, last, image, id, bio
        FROM users
        WHERE first ILIKE $1;`,
            [val + "%"]
        )
        .then(({ rows }) => rows);
};

exports.newUsers = function() {
    return db
        .query(
            `SELECT first, last, image, id, bio
        FROM users
        ORDER BY id DESC LIMIT 3.`
        )
        .then(({ rows }) => rows);
};
