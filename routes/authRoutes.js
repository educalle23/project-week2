const router = require("express").Router();
const passport = require("passport");

router.get("/login", passport.authenticate("github"), (req, res) => { });

router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/login"
  }),
  function (req, res) {
    const username = req.user.displayName ? req.user.displayName : 'Guest';
    res.json({
      success: true,
      message: `Welcome, ${username}! You have successfully logged in with GitHub.`,
    });
  }
);


router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      res.clearCookie("connect.sid");
      res.json({
        success: true,
        message: "You have successfully logged out."
      });
    });
  });
});

module.exports = router;