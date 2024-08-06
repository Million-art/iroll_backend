const Task = require('../model/Task');
const { Telegraf } = require('telegraf');
const bot = new Telegraf('6358898928:AAF24pOFDVvCB8WC9BhUW-xbwWsxZGVGmxg');

const admin =386095768;
const taskController = {
  getAllTasks: async (req, res) => {
    try {
      const tasks = await Task.getAllTasks();
      res.json(tasks);
    } catch (err) {
      console.error('Error fetching Tasks:', err);
      res.status(500).send('Error fetching Tasks');
     }
  },
 getTaskByUsername: async (req, res) => {
  const { username } = req.params;
  console.log(username)
  try {
    const tasks = await Task.getTaskByUsername(username);
    if (tasks.length > 0) {
      res.json(tasks);
    } else {
      res.status(404).send('No tasks found for this user');
    }
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).send('Error fetching tasks');
  }
},

  addTask: async (req, res) => {
    const TaskData = req.body;
    try {
      const newTaskId = await Task.addTask(TaskData);
      const chatId = '-4112375017';
  
      // Extracting data from TaskData
      const { name, description, assign_to, assigned_by, task_type, company_name, estimate_hour, task_priority } = TaskData;
  
      // Constructing the message to send
      const message = `
      @${assign_to}
        New Task Added:
        Name: ${name}
        Description: ${description}
        Assigned By: @${assigned_by}
        Task Type: ${task_type}
        Company Name: ${company_name}
        Estimate Hour: ${estimate_hour}
        Task Priority: ${task_priority}
      `;
  
      // Sending the message to the Telegram channel
      await bot.telegram.sendMessage(chatId, message);
  
      res.status(201).json({ Task_id: newTaskId });
    } catch (err) {
      console.error('Error adding Task:', err);
      res.status(500).send('Error adding new Task');
    }
  },
  
  
  updateTask: async (req, res) => {
    const { id } = req.params;
    const TaskData = req.body;
     try {
      await Task.updateTask(id, TaskData);
      res.status(200).send('Task updated successfully');
    } catch (err) {
      console.error('Error updating Task:', err);
      res.status(500).send('Error updating Task');
    }
  },
  deleteTask: async (req, res) => {
    const { id } = req.params;
    try {
      await Task.deleteTask(id);
      res.status(204).send('Task deleted successfully');
    } catch (err) {
      console.error('Error deleting Task:', err);
      res.status(500).send('Error deleting Task');
    }
  },
  login: async (req, res) => {
    const { username, is_login } = req.body;
 
    try {
      const user = await Task.authenticate(username, is_login);
      if (user) {
        res.cookie('user', user);
        res.json({ user });
       } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } catch (err) {
      console.error('Error during login:', err);
      res.status(500).json({ error: 'Error during login' });
    }
  },
  
 
  logout: async (req, res) => {
    const { id } = req.body;
    try {
      const isLogoutSuccessful = await Task.logout(id);
      if (isLogoutSuccessful) {
        res.status(200).send('Logout successful');
      } else {
        res.status(401).send('Invalid user or already logged out');
      }
    } catch (err) {
      console.error('Error during logout:', err);
      res.status(500).send('Error during logout');
    }
  },
};
 

// Add a command listener for /mytask
bot.command('mytasks', async (ctx) => {
  const username = ctx.message.from.username; 
  try {
    const tasks = await Task.getTaskByUsername(username);
     if (tasks.length > 0) {
      let message = 'Your tasks:\n';
      tasks.forEach(task => {
        message += `Name: ${task.name}\n`;
        message += `Description: ${task.description}\n`;
        message += `Assigned By: @${task.assigned_by}\n`;
        message += `Task Type: ${task.task_type}\n`;
        message += `Company Name: ${task.company_name}\n`;
        message += `Estimate Hour: ${task.estimate_hour}\n`;
        message += `Task Priority: ${task.task_priority}\n`;
        message += `Assigned at: ${task.assign_time}\n\n`;
        message += `see detail: iroll.blihmarketing.com\n\n`;
      });
      // Send tasks to the user privately
      await ctx.reply(message);
    } else {
      // Send a message if no tasks are found
      await ctx.reply('No tasks found for you.');
    }
  } catch (err) {
    bot.telegram.sendMessage(admin,'Error fetching users tasks:', err);
    await ctx.reply('Error fetching tasks. Please try again later.');
  }
});

// fetching all pending  tasks
bot.command('pending', async (ctx) => {
  const username = ctx.message.from.username; 
  try {
    const tasks = await Task.getAllTasks();
    const pendingTasks = tasks.filter(task => !task.start_time);
    
    if (pendingTasks.length > 0) {
      let message = 'Your pending tasks:\n';
      pendingTasks.forEach(task => {
        message += `Name: ${task.name}\n`;
        message += `Description: ${task.description}\n`;
        message += `Assigned To: @${task.assign_to}\n`;
        message += `Assigned By: @${task.assigned_by}\n`;
        message += `Task Type: ${task.task_type}\n`;
        message += `Company Name: ${task.company_name}\n`;
        message += `Estimate Hour: ${task.estimate_hour}\n`;
        message += `Task Priority: ${task.task_priority}\n\n`;
        message += `Assigned at: ${task.assign_time}\n\n`;
        message += `See detail: iroll.blihmarketing.com\n\n`;
      });
      // Send pending tasks to the user privately
      await ctx.reply(message);
    } else {
      // Send a message if no pending tasks are found
      await ctx.reply('No pending tasks found.');
    }
  } catch (err) {
    bot.telegram.sendMessage(admin,'Error fetching pending tasks:', err);
    await ctx.reply('Error fetching tasks. Please try again later.');
  }
});

bot.command('ongoing', async (ctx) => {
  const username = ctx.message.from.username; 
  try {
    const tasks = await Task.getAllTasks();
    const ongoingTasks = tasks.filter(task => task.end_time === null || task.end_time === undefined);
    
    if (ongoingTasks.length > 0) {
      let message = 'Your ongoing tasks:\n';
      ongoingTasks.forEach(task => {
        message += `Name: ${task.name}\n`;
        message += `Description: ${task.description}\n`;
        message += `Assigned To: @${task.assign_to}\n`;
        message += `Assigned By: @${task.assigned_by}\n`;
        message += `Task Type: ${task.task_type}\n`;
        message += `Company Name: ${task.company_name}\n`;
        message += `Estimate Hour: ${task.estimate_hour}\n`;
        message += `Task Priority: ${task.task_priority}\n\n`;
        message += `Assigned at: ${task.assign_time}\n\n`;
        message += `See detail: iroll.blihmarketing.com\n\n`;
      });
      // Send ongoing tasks to the user privately
      await ctx.reply(message);
    } else {
      // Send a message if no ongoing tasks are found
      await ctx.reply('No ongoing tasks found.');
    }
  } catch (err) {
    bot.telegram.sendMessage(admin,'Error fetching ongoing tasks:', err);
    await ctx.reply('Error fetching tasks. Please try again later.');
  }
});

bot.command('finished', async (ctx) => {
  const username = ctx.message.from.username; 
  try {
    const tasks = await Task.getAllTasks();
    const finishedTasks = tasks.filter(task => task.st !== null && task.end_time !== null);
    
    if (finishedTasks.length > 0) {
      let message = 'Your finished tasks:\n';
      finishedTasks.forEach(task => {
        message += `Name: ${task.name}\n`;
        message += `Description: ${task.description}\n`;
        message += `Assigned To: @${task.assign_to}\n`;
        message += `Assigned By: @${task.assigned_by}\n`;
        message += `Task Type: ${task.task_type}\n`;
        message += `Company Name: ${task.company_name}\n`;
        message += `Estimate Hour: ${task.estimate_hour}\n`;
        message += `Task Priority: ${task.task_priority}\n\n`;
        message += `Assigned at: ${task.assign_time}\n\n`;
        message += `See detail: iroll.blihmarketing.com\n\n`;
      });
      // Send tasks to the user privately
      await ctx.reply(message);
    } else {
      // Send a message if no finished tasks are found
      await ctx.reply('No finished tasks found.');
    }
  } catch (err) {
    bot.telegram.sendMessage(admin,'Error fetching finished tasks:', err);
    await ctx.reply('Error fetching tasks. Please try again later.');
  }
});


bot.command('newtasks', async (ctx) => {
  const username = ctx.message.from.username; 
  try {
    const tasks = await Task.getTaskByUsername(username);
     if ( tasks.start_time == null) {
       let message = 'Your tasks:\n';
      tasks.forEach(task => {
        message += `Name: ${task.name}\n`;
        message += `Description: ${task.description}\n`;
        message += `Assigned By: @${task.assigned_by}\n`;
        message += `Task Type: ${task.task_type}\n`;
        message += `Company Name: ${task.company_name}\n`;
        message += `Estimate Hour: ${task.estimate_hour}\n`;
        message += `Task Priority: ${task.task_priority}\n\n`;
        message += `Assigned at: ${task.assign_time}\n\n`;
        message += `see detail: iroll.blihmarketing.com\n\n`;
      });
      // Send tasks to the user privately
      await ctx.reply(message);
    } else {
      // Send a message if no tasks are found
      await ctx.reply('No new task found for you.');
    }
  } catch (err) {
    bot.telegram.sendMessage(admin,'Error fetching new tasks:', err);
    await ctx.reply('Error fetching tasks. Please try again later.');
  }
});

 bot.command('start',(ctx)=>{
  const username = ctx.message.from.username; 
  try {
    ctx.reply(`hello ${username} wellcome to iroll
      /mytasks to view all of your tasks
      /newtasks to view tasks assigned to you 
    
    `)
  } catch (error) {
    
  }
 })
module.exports = taskController;
// Ensure the bot starts listening for incoming messages
bot.launch();