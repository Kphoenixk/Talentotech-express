const mongoose = require("mongoose")

const UserSchema= new mongoose.Schema({
    nombre:{
        type: String,
        required: true
    },

    apellidos:{
        type: String,
        required: true
    },

    correo:{
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(correo){
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
            },

        message: props => props.value + " no es un correo valido"
    }

    },

    password:{
        type: String,
        required: true,
    }

})

module.exports= mongoose.model('usuario', UserSchema) 


