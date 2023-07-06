const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const RecipeModel = require('./models/Recipe.model');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return RecipeModel.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    const instructions = {
      title: "Lasagna",
      level: "Amateur Chef",
      ingredients: ['minced meat', 'lasagna-sheets', 'tomatoe-sauce', 'cheese', 'bechamel-sauce', 'spices'],
      cuisine: 'italian',
      dishType: 'main_course',
      image: "",
      duration: 45,
      creator: "Lea",
      created: ('2020-01-21'),
    }

    const newRecipe = RecipeModel.create(instructions)
    return newRecipe
  })
  .then((recipe) => console.log(recipe.title))
  .then(() => {
    return RecipeModel.insertMany(data)
  })
  .then((recipes) => {
    recipes.forEach((recipe) => { console.log(recipe.title) })
  })
  .then(() => {
    try {
      return RecipeModel.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 }, { new: true })
    } catch (err) {
      console.log(err);
    }
    console.log("It worked");
  })
  .then(() => {
    try{
      return RecipeModel.deleteOne({title: 'Carrot Cake'})
    }catch(err){
      console.log(err);
    }
    console.log('Success');
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })
  .finally(() => mongoose.connection.close())
