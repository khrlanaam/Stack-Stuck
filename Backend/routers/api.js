const students = require('../controller/students.json');
const express = require('express');
const routers = express.Router();

routers.get('/', (req, res) => {
  res.send('Hello Express!');
});

routers.get('/students', (req, res) => {
  res.send('menampilkan data students');
});

routers.get("/students", (req, res) => {
    const {id} = req.params;
    const student = students.find((s) => s.id === parseInt(id));
  res.send('Hello Express!');
});

routers.get('/', (req, res) => {
  res.send('Hello Express!');
});
