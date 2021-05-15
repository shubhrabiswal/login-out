const Pet = require("../model/pet");


exports.addpet = (req, res) => {

    let pic_file = [];

  if (req.files.length > 0) {
    pic_file = req.files.map((file) => {
      return { img: file.location };
    });
  }
  // console.log(req.body)

  // const pet =  new Pet ({
  //   petname:req.body.name,
  //   breed:req.body.breed,
  //   origin:req.body.origin,
  //   food_preference:req.body.food_preference,
  //   pic_file,
  //   speciality:req.body.speciality
  // })

  const obj = JSON.parse(JSON.stringify(req.body));
  console.log(obj);
  console.log(obj.petname)

  const pet =  new Pet ({
    petname:obj.petname,
    breed:obj.breed,
    origin:obj.origin,
    food_preference:obj.food_preference,
    pic_file,
    speciality:obj.speciality
  })
  console.log(pet)

  pet.save((error, pet) => {
    if (error) return res.status(400).json({ error });
    if (pet) {
      res.status(201).json({ pet, files: req.files });
    }
  });
};

