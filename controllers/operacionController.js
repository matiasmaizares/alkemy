const Operacion = require('../models/Operacion');
const { validationResult } = require('express-validator');

exports.create = async (req, res) => {
    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array() })
    }
    try {
        const proyecto = new Operacion(req.body);
        proyecto.creador = req.usuario.id;
        await proyecto.save();
        res.json(proyecto);     
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.readAll = async (req, res) => {
    console.log(req.usuario.id)
    try {
        const proyectos = await Operacion.find({ creador: req.usuario.id }).sort({ createdAt: -1 }).limit(10);
        res.json({ proyectos });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.readOne = async (req, res) => {
    try {
        const proyecto = await Operacion.findById({ _id: req.params.id });
        res.json({ proyecto});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.update = async (req, res) => {
    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array() })
    }
    try {        
        const { nombre,monto,categoria} = req.body;
        let proyecto = await Operacion.findById(req.params.id);

        if(!proyecto) {
            return res.status(404).json({msg: 'Proyecto no encontrado'})
        }
        if(proyecto.creador.toString() !== req.usuario.id ) {
            return res.status(401).json({msg: 'No Autorizado'});
        }
        proyecto = await Operacion.findByIdAndUpdate({ _id: req.params.id },{nombre,monto,categoria} , { new: true });
        res.json({proyecto});
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
}

exports.delete = async (req, res ) => {
    try { 
        let proyecto = await Operacion.findById(req.params.id);
        if(!proyecto) {
            return res.status(404).json({msg: 'Proyecto no encontrado'})
        }
        if(proyecto.creador.toString() !== req.usuario.id ) {
            return res.status(401).json({msg: 'No Autorizado'});
        }
        await Operacion.findOneAndRemove({ _id : req.params.id });
        res.json({ msg: 'Proyecto eliminado '})

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor')
    }
}


