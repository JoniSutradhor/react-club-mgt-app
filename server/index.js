const mysql = require('mysql');
const express = require('express');
const cors = require('cors');
const multer = require('multer');

var app = express();
const bodyparser = require('body-parser');

const fileStorateEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../client/public')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
})
const upload = multer({ storage: fileStorateEngine })


app.use(cors())
app.use(bodyparser.json())

var mysqlConnection = mysql.createConnection({ host: 'localhost', user: 'root', password: '', database: 'clubDB' });

mysqlConnection.connect((err) => {
    if (!err) {
        console.log('Connection Ok!')
    } else console.log('Connection failed :', err)
})

app.listen(3001, () => console.log('express server is running at port num: 3001'));

//Get all members
app.get('/members', (req, res) => {
    mysqlConnection.query('SELECT * FROM members', (err, rows, fields) => {
        if (!err) res.send(rows)
        else console.log(err)
    })
})

//Get a member
app.get('/members/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM members WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err) res.send(rows)
        else console.log(err)
    })
})

//Delete a member
app.delete('/members/dropMember/:id', (req, res) => {
    let id = req.params.id;
    mysqlConnection.query('DELETE FROM members WHERE id = ?', id, (err, rows, fields) => {
        if (!err) res.send('Deleted successfully')
        else console.log(err)
    })
})

//Create a member
app.post('/members/create', upload.single('profilePic'), (req, res) => {
    console.log('req.file', req.file)
    let name = req.body.name;
    let email = req.body.email;
    let cell = req.body.cell;
    let age = req.body.age;
    let gender = req.body.gender;
    let profilePic = req.file.filename;
    mysqlConnection.query('INSERT INTO members (name, email, cell, age, gender, profilePic) VALUES (?, ?, ?, ?, ?, ?)', [name, email, cell, age, gender, profilePic], (err, rows, fields) => {
        if (!err) res.send('Inserted successfully')
        else console.log(err)
    })
})

//Update a member
app.post('/members/update/:id', upload.single('profilePic'), (req, res) => {
    console.log('req.file', req.file)
    let id = req.params.id;
    let name = req.body.name;
    let email = req.body.email;
    let cell = req.body.cell;
    let age = req.body.age;
    let gender = req.body.gender;
    let profilePic = req.file.filename;
    mysqlConnection.query('UPDATE members SET name = ?, email = ?, cell = ?, age = ?, gender = ?, profilePic = ? where id = ?', [name, email, cell, age, gender, profilePic, id], (err, rows, fields) => {
        if (!err) res.send('Update successfully')
        else console.log(err)
    })
})