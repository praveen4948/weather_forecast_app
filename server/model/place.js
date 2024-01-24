const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  name:{
    type: String,
    required: [true, 'Place name is required.'],
    unique: true
  }
})

const place = mongoose.model('place', placeSchema);

module.exports = place;