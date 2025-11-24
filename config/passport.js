const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/user');

module.exports = function (passport) {
    passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL,
        scope: ['user:email']
    },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ githubId: profile.id });
                if (user) {
                    return done(null, user);
                } else {
                    const newUser = new User({
                        githubId: profile.id,
                        username: profile.username,
                        email: profile.emails && profile.emails.length > 0 ? profile.emails[0].value : undefined,
                        displayName: profile.displayName
                    });
                    user = await newUser.save();
                    return done(null, user);
                }
            } catch (err) {
                return done(err, null);
            }
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });

};
