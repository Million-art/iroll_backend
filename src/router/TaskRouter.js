const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/taskController');

// Define routes for RouterIpAddress
router.get('/task', TaskController.getAllTasks);
router.get('/task:username', TaskController.getTaskByUsername);
router.post('/task', TaskController.addTask);
 router.put('/task/:id', TaskController.updateTask);
router.delete('/task/:id', TaskController.deleteTask);
// Add new route for retrieving and comparing IPs
 
module.exports = router;
