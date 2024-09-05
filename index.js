require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const pool = require('./src/models/connect');
const router = require('./src/routers/index.router');
const { swaggerSpec, swaggerDocs } = require('./src/config/swagger'); 
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
app.use(cors({
  origin: '*',
}));
app.use(express.json());
app.use('/api', router);
app.get('/swagger.json', (req, res) => {
  res.json(swaggerSpec);
});

app.get('/', (req, res) => {
  res.send('Hello World');
});


const PORT = process.env.PORT || 3000;
swaggerDocs(app, PORT);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
