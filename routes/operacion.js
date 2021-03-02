const express = require('express');
const router = express.Router();
const operacionController = require('../controllers/operacionController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

router.post('/', 
    auth,
    [
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty(),
        check('monto', 'El monto del proyecto es obligatorio y numerico').not().isEmpty().isNumeric(),
        check('tipo', 'El tipo del proyecto es obligatorio').not().isEmpty(),
        check('categoria', 'la categooria del proyecto es obligatorio').not().isEmpty(),
    ],
    operacionController.create
);

router.get('/', 
    auth,
    operacionController.readAll
)


router.get('/:id', 
    auth,
    operacionController.readOne
)

router.put('/:id', 
    auth,
    [
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty(),
        check('monto', 'El monto del proyecto es obligatorio').not().isEmpty().isNumeric(),
        check('categoria', 'la categooria del proyecto es obligatorio').not().isEmpty(),

    ],
    operacionController.update
);


router.delete('/:id', 
    auth,
    operacionController.delete
);

module.exports = router;