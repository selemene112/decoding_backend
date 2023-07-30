const express = require('express');
const route = express.Router();
const ControlerBooks = require('../controller/ControllerBooks');

//==================================================

route.get('/', ControlerBooks.ControllerGetAll);
route.get('/:id', ControlerBooks.ConstrollerGetbyID);
route.post('/', ControlerBooks.ControllerCreate);
route.put('/:id', ControlerBooks.ControllerUpdate);
route.delete('/:id', ControlerBooks.ControllerDelete);

module.exports = route;
