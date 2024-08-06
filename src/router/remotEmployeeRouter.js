const express = require('express');
const router = express.Router(); 
const remotemployeeController = require('../controllers/remotEmployeeController');

// Define routes for employees
router.get('/employees', remotemployeeController.getAllEmployees);
router.get('/employees/:email', remotemployeeController.getEmployeeByUsername);
router.post('/employees', remotemployeeController.addEmployee);
router.put('/employees/:id', remotemployeeController.updateEmployee);
router.delete('/employees/:id', remotemployeeController.deleteEmployee);

router.post('/login', remotemployeeController.login);
 
module.exports = router;
