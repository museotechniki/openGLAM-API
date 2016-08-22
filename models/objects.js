// var restful = require('node-restful');
const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

  //=======================//
 //    Objects Schema    //
//=====================//
const ObjectSchema = new Schema({
  museum_number: {type:String, lowercase: true},
  date:{type:String},//to edit
  date_text: {type:String},
  period: {type:String},
  categories: {type:String},//array of categories
  tags:{type:String},//array of tags
  materials:{type:String},//array of materials
  artist: {type:String},//array of artists
  title: {type:String},
  description: {type:String},
  collection_code: {type:String, lowercase: true},
  rights:{type: String, enum:[0,1,2,3], default:3},
  location:{
            atlocation:{type:String},
            onDisplay:{type:Boolean},
            onLoan:{type:Boolean}
            },
  place: {type:String},
          longitude: {type:String},//to edit
          latitude: {type:String}//to edit
        });

module.exports = mongoose.model('Object', ObjectSchema);
