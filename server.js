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

sequelize.sync()
  .then(() => {
    console.log('The Table was made or exist');
  })
  .catch((err) => {
    console.error('eror with synchronization of table:', err);
  });

app.use(cors());
app.use(bodyParser.json());


app.post('/addLesson', (req, res) => {
  res.status(200).send('Not implemented yet');
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