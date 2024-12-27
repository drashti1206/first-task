const express = require('express');
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Sample employee data (Mock data)
let employees = [
    { id: 1, name: "Bharti Patel", position: "Software Engineer", department: "Engineering", email: "bhpatlkh@gmail.com", phone: "7836914852" },
    { id: 2, name: "Hetal Lad", position: "Product Manager", department: "Product", email: "ladhetal@gmail.com", phone: "9863472185" },
    { id: 3, name: "Hardik Patel", position: "HR Recruiter", department: "HR", email: "hardikpatel@gmail.com", phone: "9645892136" },
];

// Root route for handling GET requests to "/"
app.get('/', (req, res) => {
    res.send('Welcome to the Employee API');
});

// GET /employees - Retrieve all employees
app.get('/employees', (req, res) => {
    res.json(employees);
});

// POST /employees - Add a new employee
app.post('/employees', (req, res) => {
    const { name, position, department, email, phone } = req.body;

    // Validation to ensure all required fields are provided
    if (!name || !position || !department || !email || !phone) {
        return res.status(400).json({ message: 'All fields (name, position, department, email, phone) are required' });
    }
    
    const newEmployee = {
        id: employees.length + 1,  // Simple ID generation
        name,
        position,
        department,
        email,
        phone
    };

    employees.push(newEmployee);
    res.status(201).json(newEmployee);
});

// PUT /employees/:id - Update an employee by ID
app.put('/employees/:id', (req, res) => {
    const { id } = req.params;
    const { name, position, department, email, phone } = req.body;

    // Validation to ensure required fields are provided
    if (!name || !position || !department || !email || !phone) {
        return res.status(400).json({ message: 'All fields (name, position, department, email, phone) are required' });
    }

    const employeeIndex = employees.findIndex(emp => emp.id === parseInt(id));
    if (employeeIndex !== -1) {
        // Update employee details
        employees[employeeIndex] = { id: parseInt(id), name, position, department, email, phone };
        res.json(employees[employeeIndex]);
    } else {
        res.status(404).json({ message: 'Employee not found' });
    }
});

// DELETE /employees/:id - Delete an employee by ID
app.delete('/employees/:id', (req, res) => {
    const { id } = req.params;
    const employeeIndex = employees.findIndex(emp => emp.id === parseInt(id));

    if (employeeIndex !== -1) {
        employees.splice(employeeIndex, 1); // Remove employee from the array
        res.status(204).end(); // Respond with no content
    } else {
        res.status(404).json({ message: 'Employee not found' });
    }
});

// Start the server
app.listen(5000, () => {
    console.log(`Server running on http://localhost:5000`);
});
