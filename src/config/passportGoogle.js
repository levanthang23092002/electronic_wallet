require('dotenv').config();
const passport = require('passport');
const db = require('../models/connect')
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const jwt = require('jsonwebtoken');



passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:4000/api/auth/google/callback",
    passReqToCallback: true
},
    async function (request, accessToken, refreshToken, profile, done) {
        // thêm user vào db

        if (profile?.email) {
            try {
                const client = await db.connect();
                const result = await client.query('SELECT * FROM accounts WHERE email = $1 AND google_id = $2', [profile.email, profile.id]);
                client.release();
                const token = jwt.sign({ "user": result.rows[0] }, process.env.JWT_SECRET, { expiresIn: '1h' });

                if (result.rows.length > 0) {
                    const user = result.rows[0];
                    console.log(user);

                    done(null, user, token);
                } else {
                    const registerClient = await db.connect();
                    const registerResult = await registerClient.query('INSERT INTO accounts (email, google_id) VALUES ($1, $2)', [profile?.email, profile?.id]);
                    console.log(registerClient.rows[0])
                    registerClient.release();
                   
                    done(null, profile, token);
                }
            } catch (error) {
                console.error('Error executing query:', error);
                return done(error, null);
            }
        }

    }
));