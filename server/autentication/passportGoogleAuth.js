import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import User from "../models/user.model.js"
import passport from 'passport';
import { generateRandomName, generateRandomPassword } from "../utilis/functionandler.js"

passport.use(new GoogleStrategy({
    clientID: "659689354757-kbc9mfj98i9nhmmetvsqlp4frpo3ee9j.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:4000/auth/google/callback"
},
    async function (accessToken, refreshToken, profile, done) {
        console.log(profile)
        try {
            const user = await User.findOne({ email: profile._json.email })

            if (user) {
                return done(null, user);
            }

            const randomName = generateRandomName();
            const randomPassword = generateRandomPassword();

            const newUser = await User.create({
                fullName: profile.displayName,
                email: profile._json.email,
                username: randomName,
                password: randomPassword,
                profileImage: { google: profile._json.picture },
                googleId: profile.id,
                accessToken: accessToken,
                refreshToken: refreshToken,

            })

            return done(null, newUser);

        }
        catch (error) {
            console.log(error)
        }
    }
))


export default passport