const Employee = require('../model/RemotEmployee');

const remotemployeeController = {
getAllEmployees: async (req, res) => {
    try {
      const employees = await Employee.getAllEmployees();
      res.json(employees);
    } catch (err) {
      console.error('Error fetching employees:', err);
      res.status(500).send('Error fetching employees');
    }
  },
  getEmployeeByUsername: async (req, res) => {
    const { username } = req.params;
    try {
      const employee = await Employee.getEmployeeByUsername(id);
      if (employee) {
        res.json(employee);
      } else {
        res.status(404).send('Employee not found');
      }
    } catch (err) {
      console.error('Error fetching employee:', err);
      res.status(500).send('Error fetching employee');
    }
  },
  addEmployee: async (req, res) => {
    const employeeData = req.body;
     try {
      const newEmployeeId = await Employee.addEmployee(employeeData);
      res.status(201).json({ employee_id: newEmployeeId });
    } catch (err) {
      console.error('Error adding employee:', err);
      res.status(500).send('Error adding new employee');
    }
  },
  updateEmployee: async (req, res) => {
    const { id } = req.params;
    const employeeData = req.body;
     try {
      await Employee.updateEmployee(id, employeeData);
      res.status(200).send('Employee updated successfully');
    } catch (err) {
      console.error('Error updating employee:', err);
      res.status(500).send('Error updating employee');
    }
  },
  deleteEmployee: async (req, res) => {
    const { id } = req.params;
    try {
      await Employee.deleteEmployee(id);
      res.status(204).send('Employee deleted successfully');
    } catch (err) {
      console.error('Error deleting employee:', err);
      res.status(500).send('Error deleting employee');
    }
  },
  login: async (req, res) => {
    const { username, password } = req.body;
     
    
      try {
        const user = await Employee.authenticate(username,password);
        if (user) {
          res.cookie('user', user);
          res.json({ user });
        } else {
          res.status(401).send('Invalid credentials');
        }
      } catch (err) {
        console.error('Error during login:', err);
        res.status(500).send('Error during login');
      }
     
    
  },

}

module.exports = remotemployeeController;

