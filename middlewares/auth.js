const db = require("../model");
const User = db.user;
const Role = db.role;

isVerified = (req, res, next) => {
    if(req.isAuthenticated() && req.user.status) {
        next();
    } else {
        res.status(403).send({status: "Error", message: "Unauthorized Access"});
    }
}

isAdmin = (req, res, next) => {
    User.findById(req.user.id).exec((err, user) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }

        Role.find(
            {
                _id: {$in: user.roles}
            },
            (err, roles) => {
                if (err) {
                    res.status(500).send({message: err});
                    return;
                }

                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name === "admin") {
                        next();
                        return;
                    }
                }

                res.status(403).send({message: "Require Admin Role!"});
            }
        );
    });
};

isModerator = (req, res, next) => {
    User.findById(req.user.id).exec((err, user) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }

        Role.find(
            {
                _id: {$in: user.roles}
            },
            (err, roles) => {
                if (err) {
                    res.status(500).send({message: err});
                    return;
                }

                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name === "moderator") {
                        next();
                        return;
                    }
                }

                res.status(403).send({message: "Require Moderator Role!"});
            }
        );
    });
};

const auth = {
    isVerified,
    isAdmin,
    isModerator
};
module.exports = auth;