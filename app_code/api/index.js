const express = require("express");
const mongojs = require("mongojs");
const bodyParser = require("body-parser");
const cors = require('cors');
const connectionString = 'mongodb://dpv:123456d@ds013599.mlab.com:13599/dimidb';
const db = mongojs(connectionString, ['students']);

const port = '7000';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
//get all students
app.get('/api/students', (req, res) => {
    db.students.find((error, students) => {
        if (error) res.send(error);

        res.json(students);
    })
});

//get single student by id
app.get('/api/students/:id', (req, res) => {
    db.students.findOne({ _id: mongojs.ObjectId(req.params.id)}, (error, student) => {
        if (error) res.send(error);

        res.json(student);
    })
});

//create new student
app.post('/api/students', (req, res) => {
    const newStudent = {
        fname: req.body.fname,
        lname: req.body.lname,
        facNumber: req.body.facNumber,
        birthDate: req.body.birthDate
    }

    db.students.save(newStudent, (error, savedStudent) => {
        if (error) res.send(error);

        res.json(savedStudent);
    });

});

app.delete('/api/students/:id', (req, res) =>{
    db.students.remove({ _id: mongojs.ObjectId(req.params.id)}, (error, deletedStudent) => {
        if (error) res.send(error);

        res.json(deletedStudent);
    })
})

app.patch('/api/students/:id', (req, res) => {
    const updatedStudent = {
        fname: req.body.fname,
        lname: req.body.lname,
        facNumber: req.body.facNumber,
        birthDate: req.body.birthDate
    }

    db.students.update(
        { _id: mongojs.ObjectId(req.params.id)},
        { $set: updatedStudent},
        { multi: true},
        (error, student) => {        
            if (error) res.send(error);

            res.json(student);
        });
});


app.listen(port, () => {
    console.log('Server is running on: '+port)
});