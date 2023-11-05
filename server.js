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

const Categories = sequelize.define('categories', {
  category: Sequelize.STRING,
});

const Lessons = sequelize.define('lesson', {
  name: {
    type: Sequelize.STRING,
  },
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

app.use(cors());
app.use(bodyParser.json());

//To do - seaprate to new file
app.get('/getLessons', async (req, res) => {
  //To do - add Satus if error
  let lessons = await Lessons.findAll();
  res.status(200).json(lessons);
});

//To do - seaprate to new file
app.post('/addLesson', (req, res) => {
  //To do - add Satus if error
  const lesson = req.body;
  Lessons.create(lesson)
  res.status(200).json('Not implemented yet');
});

app.put('/addCategory', (req, res) => {
  //To do - add Satus if error
  const categoryName = req.body.categoryName;
  Categories.create({
    category: categoryName,
  })
  res.status(200).json(categoryName);
});

app.get('/getCategories', async (req, res) => {
  //To do - add status if error
  let categoriesFromDb = await Categories.findAll();
  res.status(200).json(categoriesFromDb.map(c => c.category));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/`);
});