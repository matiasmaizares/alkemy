const mongoose = require('mongoose');


const OperacionSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    monto:{
        type:Number,
        required: true,
        min:0
    },
    creador: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    fecha: {
        type: Date,
    	
    },
    tipo:{
        type: String,
        required: true,
        trim: true
    }
    ,
    categoria:{
        type: String,
        required: true,
        trim: true
    }
    
},{
    timestamps:true
});

module.exports = mongoose.model('Operacion', OperacionSchema);