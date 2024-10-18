const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const Employee = require('./models/employee');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URL, {})
    .then(() => console.log('connected'))
    .catch((err) => console.log(err));

app.listen(PORT, () => console.log(`server running on port ${PORT}`));

app.post("/addEmployee", (req, res) => {
    const { employeeId, employeeName, email, designation, joiningDate, salary, activeEmployee } = req.body;
    const employee = new Employee({
        employeeId,
        employeeName,
        email,
        designation,
        joiningDate,
        salary,
        activeEmployee
    });

    employee.save((err) => {
        if (err) {
            console.log(err);
            res.status(500).send(err); // Send a 500 status code for errors
        } else {
            console.log("employee added successfully");
            res.send("employee added successfully");
        }
    });
});

app.get("/employees", async (req, res) => {
    try {
        const employeeList = await Employee.find({}); // Await the promise
        res.send(employeeList);
    } catch (error) {
        console.log(error);
        res.status(500).send(error); // Send a 500 status code for errors
    }
});
