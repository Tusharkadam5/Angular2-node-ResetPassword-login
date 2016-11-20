'use strict';

exports.port = process.env.PORT || 3000;
exports.mongodb = {
  uri: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://127.0.0.1/taskAng'
};
exports.companyName = 'Task, Inc.';
exports.projectName = 'Task';
exports.systemEmail = 'thr.kdm@gmail.com';
exports.secret = 'k3yb0ardc4t28580';


exports.smtp = {
  from: {
    name: process.env.SMTP_FROM_NAME || exports.projectName +' Website',
    address: 'thr.kdm@gmail.com'
  },
  credentials: {
    user:'thr.kdm@gmail.com', // set your email id here
    password:'pass', // set your password here
    host: 'smtp.gmail.com',
    ssl: true
  }
};

