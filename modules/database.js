'use strict';
// get the client
const mysql = require('mysql2');

const connect = () => {
  // create the connection to database
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
  });
  return connection;
};

const select = (connection, callback, res) => {
  // simple query
  connection.query(
      'SELECT * FROM p_media',
      (err, results, fields) => {
        // console.log(results); // results contains rows returned by server
        // console.log(fields); // fields contains extra meta data about results, if available
        console.log(err);
        callback(results, res);
      },
  );
};


const insert = (data, connection, callback) => {
  // simple query
  connection.execute(
      'INSERT INTO p_media (title, details, category, url, userID, mimetype) VALUES (?, ?, ?, ?, ?, ?);',
      data,
      (err, results, fields) => {
        console.log(results); // results contains rows returned by server
        // console.log(fields); // fields contains extra meta data about results, if available
        console.log(err);
        callback();
      },
  );
};

const del = (data, connection) => {
  // simple query
  return connection.execute(
      'DELETE FROM p_media WHERE mID = ?;',
      data,
      (err, results, fields) => {
        console.log(results); // results contains rows returned by server
        // console.log(fields); // fields contains extra meta data about results, if available
        console.log(err);
      },
  );
};

const login = (data, connection, callback) => {
  // simple query
  connection.execute(
      'SELECT * FROM p_users WHERE pUsername = ?;',
      data,
      (err, results, fields) => {
        console.log(results); // results contains rows returned by server
        // console.log(fields); // fields contains extra meta data about results, if available
        console.log(err);
        callback(results);
      },
  );
};

const search = (connection, data, callback) => {
  // simple query
  connection.execute(
      'SELECT * FROM p_media WHERE title LIKE ?;',
      data,
      (err, results, fields) => {
        // console.log(results); // results contains rows returned by server
        // console.log(fields); // fields contains extra meta data about results, if available
        console.log(err);
        callback(results);
      },
  );
};

const register = (data, connection, callback) => {
  // simple query
  connection.execute(
      'INSERT INTO p_users (pUsername, password) VALUES (?, ?);',
      data,
      (err, results, fields) => {
        console.log(results); // results contains rows returned by server
        // console.log(fields); // fields contains extra meta data about results, if available
        console.log(err);
        callback();
      },
  );
};

const username = (connection, data, callback) => {
  // simple query
  connection.execute(
      'SELECT pUsername, uID FROM p_users WHERE uID = ?;',
      data,
      (err, results, fields) => {
        // console.log(results); // results contains rows returned by server
        // console.log(fields); // fields contains extra meta data about results, if available
        console.log(err);
        callback(results);
      },
  );
};

module.exports = {
  connect: connect,
  select: select,
  insert: insert,
  login: login,
  register: register,
  search: search,
  del: del,
  username: username
};