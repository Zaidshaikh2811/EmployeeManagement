const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const moment = require('moment');

const Employee = require('./models/employee');
const Attendance = require('./models/Attendance');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URL, {})
    .then(() => console.log('connected'))
    .catch((err) => console.log(err));

app.listen(PORT, () => console.log(`server running on port ${PORT}`));

app.post("/addEmployee", async (req, res) => {
    const { employeeId, employeeName, email, designation, joiningDate, salary, activeEmployee, dateOfBirth, phoneNo, address } = req.body;

    // Validate the required fields
    if (!employeeId || !employeeName || !email || !designation || !joiningDate || !salary || !dateOfBirth || !phoneNo || !address) {
        console.log(
            employeeId, employeeName, email, designation, joiningDate, salary, activeEmployee, dateOfBirth, phoneNo, address
        );

        return res.status(400).send("All fields are required."); // Send a 400 status code for bad requests
    }

    const employee = new Employee({
        employeeId,
        employeeName,
        email,
        designation,
        joiningDate,
        salary,
        activeEmployee,
        dateOfBirth,
        phoneNo,
        address
    });

    try {
        await employee.save();
        console.log("Employee added successfully");
        res.status(201).send("Employee added successfully"); // Send a 201 status code for created resource
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding employee: " + err.message); // Send a 500 status code for server errors
    }
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



app.post("/attendance", async (req, res) => {
    try {
        const { employeeId, employeeName, date, status } = req.body
        const existingAttendance = await Attendance.findOne({ employeeId, date });

        if (existingAttendance) {
            existingAttendance.status = status;
            await existingAttendance.save();
            res.status(201).send("Attendance added successfully");
        }
        else {
            console.log("Adding new attendance")
            const newAttendance = new Attendance({ employeeId, employeeName, date, status });
            console.log(newAttendance)
            await newAttendance.save();
            res.status(201).send("Attendance added successfully");
        }

    } catch (error) {
        console.log(error);
        res.status(500).send(error); // Send a 500 status code for errors
    }
});



app.get("/attendance", async (req, res) => {
    try {
        const { date } = req.query


        const attendanceData = await Attendance.find({ date })
        res.send(attendanceData)

    } catch (error) {
        res.send(500).json({ "message": error })
    }
})



app.get("/attendance-report-all-employees", async (req, res) => {
    try {
        const { month, year } = req.query;

        console.log("Query parameters:", month, year);
        // Calculate the start and end dates for the selected month and year
        const startDate = moment(`${year}-${month}-01`, "YYYY-MM-DD")
            .startOf("month")
            .toDate();
        const endDate = moment(startDate).endOf("month").toDate();

        // Aggregate attendance data for all employees and date range
        const report = await Attendance.aggregate([
            {
                $match: {
                    $expr: {
                        $and: [
                            {
                                $eq: [
                                    { $month: { $dateFromString: { dateString: "$date" } } },
                                    parseInt(req.query.month),
                                ],
                            },
                            {
                                $eq: [
                                    { $year: { $dateFromString: { dateString: "$date" } } },
                                    parseInt(req.query.year),
                                ],
                            },
                        ],
                    },
                },
            },

            {
                $group: {
                    _id: "$employeeId",
                    present: {
                        $sum: {
                            $cond: { if: { $eq: ["$status", "present"] }, then: 1, else: 0 },
                        },
                    },
                    absent: {
                        $sum: {
                            $cond: { if: { $eq: ["$status", "absent"] }, then: 1, else: 0 },
                        },
                    },
                    halfday: {
                        $sum: {
                            $cond: { if: { $eq: ["$status", "halfday"] }, then: 1, else: 0 },
                        },
                    },
                    holiday: {
                        $sum: {
                            $cond: { if: { $eq: ["$status", "holiday"] }, then: 1, else: 0 },
                        },
                    },
                },
            },
            {
                $lookup: {
                    from: "employees", // Name of the employee collection
                    localField: "_id",
                    foreignField: "employeeId",
                    as: "employeeDetails",
                },
            },
            {
                $unwind: "$employeeDetails", // Unwind the employeeDetails array
            },
            {
                $project: {
                    _id: 1,
                    present: 1,
                    absent: 1,
                    halfday: 1,
                    name: "$employeeDetails.employeeName",
                    designation: "$employeeDetails.designation",
                    salary: "$employeeDetails.salary",
                    employeeId: "$employeeDetails.employeeId",
                },
            },
        ]);

        res.status(200).json({ report });
    } catch (error) {
        console.error("Error generating attendance report:", error);
        res.status(500).json({ message: "Error generating the report" });
    }
});