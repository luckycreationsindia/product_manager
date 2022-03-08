const { auth } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/test/all", controller.allAccess);

    app.get("/api/test/user", [auth.isVerified], controller.userBoard);

    app.get(
        "/api/test/mod",
        [auth.isVerified, auth.isModerator],
        controller.moderatorBoard
    );

    app.get(
        "/api/test/admin",
        [auth.isVerified, auth.isAdmin],
        controller.adminBoard
    );

    app.get('/api/user/profile', auth.isVerified, (req, res) => {
        res.json({status: 'Success', message: req.user});
    });
};