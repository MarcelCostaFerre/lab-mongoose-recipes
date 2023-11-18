const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    Recipe.create({
      "title": "Pa amb tomàquet",
      "level": "Amateur Chef",
      "ingredients": [
        "1 llesca de pa de pagès",
        "1 tomàquet madur",
        "1 dent d'all",
        "oli",
        "sal",
      ],
      "cuisine": "Catalan",
      "dishType": "main_course",
      "image": "https://www.cuina.cat/uploads/s1/65/39/26/Patomaquet_2_43_542x337.jpg",
      "duration": 5,
      "creator": "Chef Popular"
    }).then(console.log("Pa amb tomàquet"))
  })
  .then(() => {
    return Recipe.insertMany(data).then((recipes) => { 
      recipes.forEach(element => {
        console.log(element.title)
      });
    })
  })
  
  .then(() => {
    Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration: 100}, {new: true})
    .then(console.log('Duration Changed!'))
  })
  .then(() => {
    Recipe.deleteOne({title: 'Carrot Cake'}).then(console.log('Carrot Cake deleted!'))
  })


  .catch(error => {
    console.error('Error connecting to the database', error);
  });


  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('Mongoose default connection disconnected through app termination');
      process.exit(0);
    });
  });
