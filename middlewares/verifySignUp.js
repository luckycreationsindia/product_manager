const db = require("../model");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUser = (req, res, next) => {
    console.log("CHECK DUPLICATE USER");
    // Username
    User.findOne({
        email: req.body.email
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (user) {
            res.status(400).send({ message: "Failed! Email is already in use!" });
            return;
        }

        next();
    });
};

checkRolesExisted = (req, res, next) => {
    console.log("CHECK VALID ROLE");
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                res.status(400).send({
                    message: `Failed! Role ${req.body.roles[i]} does not exist!`
                });
                return;
            }
        }
    }

    next();
};

const verifySignUp = {
    checkDuplicateUser,
    checkRolesExisted
};

module.exports = verifySignUp;