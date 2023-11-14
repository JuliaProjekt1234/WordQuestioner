const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('my-database', null, null, {
  dialect: 'sqlite',
  storage: 'my-database.db',
});
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const LocalStrategy = require('passport-local').Strategy;


const Categories = sequelize.define('categories', {
  category: Sequelize.STRING,
  userId: Sequelize.INTEGER
});


const Users = sequelize.define('users', {
  login: Sequelize.STRING,
  password: Sequelize.STRING
});

const Lessons = sequelize.define('lesson', {
  name: {
    type: Sequelize.STRING,
  },
  userId: Sequelize.INTEGER,
  category: {
    type: Sequelize.STRING,
  },
  colorTag: {
    type: Sequelize.STRING,
  },
  finishedCount: {
    type: Sequelize.INTEGER,
  },
  startedCount: {
    type: Sequelize.INTEGER,
  },
  translations: {
    type: Sequelize.JSON,
  },
  questionerType: {
    type: Sequelize.STRING,
  },
  questionerLanguageMode: {
    type: Sequelize.STRING,
  },
});


sequelize.sync()
  .then(() => {
    console.log('The Table was made or exist');
  })
  .catch((err) => {
    console.error('eror with synchronization of table:', err);
  });

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false },
}));
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(flash());


passport.use(new LocalStrategy(
  async (username, password, done) => {
    let user = await Users.findOne({
      attributes: ['id', 'login', 'password'],
      where: {
        login: username
      },
    });

    if (!user) return done(null, false, { message: 'user does not exist' });

    if (password != user.password)
      return done(null, false, { message: 'Wrong password' });

    return done(null, user);
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  let user = await Users.findOne({
    attributes: ['id', 'login', 'password'],
    where: {
      id: id
    },
  });
  done(null, user);
});

function requireAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).send("lack of authentification");
}

app.get('/getLessons', [requireAuthentication], async (req, res) => {
  let lessons = await Lessons.findAll({
    where: { userId: req.user.id }
  });
  res.status(200).json(lessons);
});


app.post('/addLesson', [requireAuthentication], (req, res) => {
  const lesson = req.body;
  lesson.userId = req.user.id;
  Lessons.create(lesson)
  res.status(200).json('Not implemented yet');
});


app.post('/addCategory', [requireAuthentication], (req, res) => {
  const categoryName = req.body.categoryName;
  Categories.create({
    category: categoryName,
    userId: req.user.id
  });
  res.status(200).json(categoryName);
});


app.get('/getCategories', [requireAuthentication], async (req, res) => {
  //To do - add status if error\
  let categoriesFromDb = await Categories.findAll({
    where: { userId: req.user.id }
  });
  res.status(200).json(categoriesFromDb.map(c => c.category));
});

app.post('/login',
  passport.authenticate('local', {
    failureRedirect: '/login', failureFlash: true
  }),
  function (req, res) {
    res.status(200).json("kfmf")
  });

app.get('/login', (req, res) => {
  const errorMessage = req.flash('error')[0];
  res.status(401).json(errorMessage || 'Błąd uwierzytelniania.');
});

app.post('/registration', async (req, res) => {
  //To do - add status if error\
  const login = req.body.login;
  const password = req.body.password;
  await Users.create({
    login: login,
    password: password
  });
  res.status(200).json("ok");
});

app.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.status(200).json('/');
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/`);
});