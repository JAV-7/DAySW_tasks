const Pet = require('../models/pet.model');

//Create pet
exports.createPet = async (req, res) => {
    try{
        const pet = await Pet.create(req.body);
        res.status(201).json(pet);
    }catch(error){
        res.status(400).json( { message: error.message } );
    }
};

//Get pets
exports.getPets = async (req, res) =>{
    const pets = await Pet.find();
    res.status(201).json(pets);
};

//Get pet by species
exports.getPetBySpecies = async(req, res) =>{
    try{
        const chosenSpecies = req.params.species; // o req.query.species si lo pasas como query
        const pets = await Pet.find({ species: chosenSpecies });
        res.status(201).json(pets);
    }catch(error){
        res.status(400).json({ message: error.message });
    }
}

//Get pet by breed
exports.getPetByBreed = async(req, res) =>{
    try{
        const chosenBreed = req.params.breed; // o req.query.species si lo pasas como query
        const pets = await Pet.find({ breed: chosenBreed });
        res.status(201).json(pets);
    }catch(error){
        res.status(400).json({ message: error.message });
    }
}

//Get pet by id
exports.getPetById = async (req, res) =>{
    try{
        const pet = await Pet.findById(req.params.id);
        if(!pet) res.status(400).json( { message: "Pet not found !"} );
        res.status(200).json(pet);
    } catch(error){
        res.status(400).json({ message: error.message });
    }
};



//Update pet
exports.updatePet = async (req, res) =>{
    try{
        const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if(!pet) return res.status(400).json( { message: "Pet not found! "} );
        res.status(200).json(pet);
    } catch(error){
        res.status(400).json({ message: error.message });
    }
};

//Delete pet
exports.deletePet = async (req, res) =>{
    try{
        const pet = await Pet.findByIdAndDelete(req.params.id);
        if(!pet) return res.status(400).json( { message: "Pet not found! "} );
        res.json( { message: "Pet has been removed from database!" } );
    } catch(error){
        res.status(400).json({ message: error.message });
    }
};

