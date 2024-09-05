require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const pool = require('./src/models/connect');
const router = require('./src/routers/index.router');
const swaggerDocs = require('./src/config/swagger');
require('./src/config/passportGoogle');
const passport = require('passport');

const app = express();
passport.serializeUser((user, done) => {
  // Tuần tự hóa thông tin người dùng thành một chuỗi
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // Giải tuần tự hóa chuỗi thành thông tin người dùng
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
app.use(session({
  secret: process.env.secret,
  resave: false,
  saveUninitialized: false
}))
pool.connect();
app.use(cors());
app.use(express.json());
app.use('/api', router);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  swaggerDocs(app, PORT);
});
