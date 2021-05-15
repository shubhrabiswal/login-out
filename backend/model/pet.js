const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  petname: {
    type: String,
    required: true
  },
  breed:{
    type: String,
    // required:true
  },
  origin:{
    type:String
  },
  food_preference:{
    type:String
  },
  pic_file: [
    { img: { type: String } }
  ],
  speciality:{
    type:String
  }
});

const Pet = mongoose.model("PET", petSchema);
module.exports = Pet;