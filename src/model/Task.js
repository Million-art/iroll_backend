const pool = require('../../connection');

const task = {
    getAllTasks: () => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM task';
            pool.query(sql, (err, results) => {
                if (err) {
                    console.error('Error in getAllTasks:', err);
                     reject(err);
                } else {
                    resolve(results);
                    
                }
            });
        });
    },
    getTaskByUsername: (username) => {
         return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM task WHERE assign_to = ?';
            pool.query(sql, [username], (err, results) => {
                if (err) {
                    console.error('Error in getTaskByUsername:', err);
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },
    addTask: (newTask) => {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO task SET ?';
            pool.query(sql, newTask, (err, result) => {
                if (err) {
                    console.error('Error in addTask:', err);
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    },
    updateTask: (id, TaskData) => {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE task SET ? WHERE id = ?';
            pool.query(query, [TaskData, id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },
    deleteTask: (taskId) => {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM task WHERE id = ?';
            pool.query(sql, [taskId], (err, result) => {
                if (err) {
                    console.error('Error in deleteTask:', err);
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
};

module.exports = task;
