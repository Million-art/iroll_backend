const pool = require('../../connection');


const RemotEmployee = {

    authenticate: (username,password) => {
         return new Promise((resolve, reject) => {
          const selectQuery = 'SELECT * FROM remot_employees  WHERE username = ? && password = ?';
          pool.query(selectQuery, [username,password], (err, results) => {
            if (err) {
              reject(err);
            } else {
                resolve(results[0]);
            }
          });
        });
      },
      getAllEmployees: () => {
        return new Promise((resolve, reject) => {
          const query = 'SELECT * FROM remot_employees';
          pool.query(query, (err, results) => {
            if (err) {
              reject(err);
            } else {
              // Check if results is an array before resolving
              if (Array.isArray(results)) {
                resolve(results);
              } else {
                // If results is not an array, handle it accordingly
                reject(new Error('Unexpected result from the database'));
              }
            }
          });
        });
      },
      
      getEmployeeByUsername: (username) => {
        return new Promise((resolve, reject) => {
          const query = 'SELECT * FROM remot_employees WHERE username = ?';
          pool.query(query, [username], (err, results) => {
            if (err) {
              reject(err);
            } else {
              resolve(results[0]);
            }
          });
        });
      },
      addEmployee: (employeeData) => {
         return new Promise((resolve, reject) => {
          const query = 'INSERT INTO remot_employees SET ?';
           pool.query(query, [employeeData], (err, results) => {
            if (err) {
              reject(err);
            } else {
              resolve(results.insertId);
            }
          });
        });
      },
      updateEmployee: (id, employeeData) => {
         return new Promise((resolve, reject) => {
          const query = 'UPDATE remot_employees SET ? WHERE id = ?';
          pool.query(query, [employeeData, id], (err, results) => {
            if (err) {
              reject(err);
            } else {
              resolve(results);
            }
          });
        });
      },
      deleteEmployee: (id) => {
        return new Promise((resolve, reject) => {
          const query = 'DELETE FROM remot_employees WHERE id = ?';
          pool.query(query, [id], (err, results) => {
            if (err) {
              reject(err);
            } else {
              resolve(results);
            }
          });
        });
      },
}

module.exports = RemotEmployee;
