const express = require('express');
const cors = require('cors'); // Import the cors package
const app = express();
const port = 5000;

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Sample employee data (Mock data)
let employees = [
  {
    id: 1,
    name: 'Bharti Patel',
    position: 'Software Engineer',
    department: 'Engineering',
    email: 'bhpatlkh@gmail.com',
    phone: '7836914852',
  },
  {
    id: 2,
    name: 'Hetal Lad',
    position: 'Product Manager',
    department: 'Product',
    email: 'ladhetal@gmail.com',
    phone: '9863472185',
  },
  {
    id: 3,
    name: 'Hardik Patel',
    position: 'HR Recruiter',
    department: 'HR',
    email: 'hardikpatel@gmail.com',
    phone: '9645892136',
  },
];

// Sample departments data (Mock data)
const departments = [
  { id: 1, name: 'Engineering' },
  { id: 2, name: 'Product' },
  { id: 3, name: 'HR' },
  { id: 4, name: 'Sales' },
  { id: 5, name: 'Customer Support' },
];

// Sample user role (for simplicity, we will hardcode it here)
const userRole = 'admin'; // Change this to "user" for non-admin role, or fetch it dynamically

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
    return res.status(400).json({
      message:
        'All fields (name, position, department, email, phone) are required',
    });
  }

  const newEmployee = {
    id: employees.length + 1, // Simple ID generation
    name,
    position,
    department,
    email,
    phone,
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
    return res.status(400).json({
      message:
        'All fields (name, position, department, email, phone) are required',
    });
  }

  const employeeIndex = employees.findIndex((emp) => emp.id === parseInt(id));
  if (employeeIndex !== -1) {
    // Update employee details
    employees[employeeIndex] = {
      id: parseInt(id),
      name,
      position,
      department,
      email,
      phone,
    };
    res.json(employees[employeeIndex]);
  } else {
    res.status(404).json({ message: 'Employee not found' });
  }
});

// DELETE /employees/:id - Delete an employee by ID
app.delete('/employees/:id', (req, res) => {
  const { id } = req.params;
  const employeeIndex = employees.findIndex((emp) => emp.id === parseInt(id));

  if (employeeIndex !== -1) {
    employees.splice(employeeIndex, 1); // Remove employee from the array
    res.status(204).end(); // Respond with no content
  } else {
    res.status(404).json({ message: 'Employee not found' });
  }
});

// GET /departments - Retrieve all departments
app.get('/departments', (req, res) => {
  res.json(departments);
});

// GET /departments/:id - Retrieve a department by ID
app.get('/departments/:id', (req, res) => {
  const departmentId = parseInt(req.params.id); // Get department ID from URL
  const department = departments.find((dep) => dep.id === departmentId);

  if (department) {
    res.json(department); // Respond with department data if found
  } else {
    res.status(404).json({ error: 'Department not found' }); // If not found, return 404
  }
});

// POST /departments - Add a new department
app.post('/departments', (req, res) => {
  const { name } = req.body;

  // Validate the request
  if (!name) {
    return res.status(400).json({ message: 'Department name is required' });
  }

  // Create new department
  const newDepartment = { id: departments.length + 1, name };

  // Add the new department to the departments array
  departments.push(newDepartment);

  // Send the new department as the response
  res.status(201).json(newDepartment);
});

// GET /user-role - Retrieve the user role (admin/user)
app.get('/user-role', (req, res) => {
  res.json({ role: userRole });
});

// GET /employees/:id - Retrieve an employee by ID
app.get('/employees/:id', (req, res) => {
  const employeeId = parseInt(req.params.id); // Get employee ID from URL
  const employee = employees.find((emp) => emp.id === employeeId);

  if (employee) {
    res.json(employee); // Respond with employee data if found
  } else {
    res.status(404).json({ error: 'Employee not found' }); // If not found, return 404
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
