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
    // Run your code here, after you have insured that the connection was made
    return Recipe.create({
      title: 'Rfissa',
      level: 'UltraPro Chef',
      ingredients:["1 large chicken, - quartered or left whole",
        "3 large onions, - thinly sliced",
        "75 ml olive oil",
        "1 tbsp salt",
        "1 tbsp pepper",
        "1 1/2 tbsp ginger",
        "1 tbsp Ras el Hanout - (or 1 1/2 tbsp msakhen)",
        "1 1/2 tsp turmeric",
        "100 g uncooked lentils, green or brown",
        "4 tbsp fenugreek seeds, - soaked overnight and drained",
        "1 1/2 tsp saffron threads, - heated gently and then crumbled",
        "1 handful fresh cilantro, - finely chopped",
        "1 handful fresh parsley, - finely chopped",
        "1.15 l water",
        "1 1/2 tsp smen - (Moroccan preserved butter)",
        "1 to 1 1/2 batches msemen, shredded - (or trid pastry)"],
      cuisine:'Moroccan',
      dishType:'main_course',
      image: 'https://tasteofmaroc.com/wp-content/uploads/2017/11/rfissa-2b.jpg.webp',
      duration: 120,
      creator: 'OmElHid',
    })
  })

  .then((newRecipe)=>{
    console.log(newRecipe.title);
    return Recipe.insertMany(data)
  })

  .then((manyRecipes)=>{
    manyRecipes.forEach(recipe => console.log(recipe.title))
    return Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration: 100})
  })

  .then(()=>{
    console.log('Recipe updated with success');
    return Recipe.deleteOne({title: 'Carrot Cake'})
  })

  .then (()=>{
    console.log('Recipe deleted with success');
    mongoose.disconnect()
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });
