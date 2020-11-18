const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//creating a mongodb schema for rregistration a schema is a model of our collection

let Regschema=new Schema({
    email:{
        type: String,
        required: 'Email address is required',
       
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],

    },
    name: {
        type: String,
        
        required: [true, "can't be blank"],

    },
    password: {
        type: String,
        required: true,
        trim: true
    }



});
module.exports = mongoose.model('Registerschema',Regschema);

