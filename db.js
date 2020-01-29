const spicedPg = require("spiced-pg");

const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/network"
);

exports.addUser = function(first, last, email, password) {
    return db.query(
        `INSERT INTO users (first, last, email, password)
        VALUES ($1, $2, $3, $4)
        RETURNING id`,
        [first, last, email, password]
    );
};

exports.login = function(email) {
    return db
        .query(
            `SELECT email, password, id
            FROM users
            WHERE email = '${email}'`
        )
        .then(({ rows }) => rows);
};
