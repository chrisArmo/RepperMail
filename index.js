/**
 * Repper Mail Server
 */

// Dependencies

const express = require("express"),
    passport = require("passport"),
    { Strategy: GoogleStrategy } = require("passport-google-oauth20");

const {
    googleClientID: clientID,
    googleClientSecret: clientSecret
} = require("./config");

// Application setup

const app = express(),
    PORT = process.env.PORT || 3000;

// Passport setup

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use(
    new GoogleStrategy(
        {
            clientID,
            clientSecret,
            callbackURL: "/auth/google/callback"
        },
        (accessToken, refreshToken, profile, cb) => {
            console.log(
                "Access Token:", accessToken,
                "\nRefresh Token:", refreshToken,
                "\nProfile:", profile
            );
            cb();
        }
    )
);

// Routes

app.get("/", (req, res) => {
    res.status(200).json({ message: "Hello, world!" });
});

app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
    "/auth/google/callback",
    passport.authenticate("google")
);

// Listen

app.listen(PORT, () => {
    console.log(`Repper Mail server running on port ${PORT}`);
});
