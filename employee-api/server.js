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
    hireDate: 'Sep 20,2024',
    phone: '7836914852',
  },
  {
    id: 2,
    name: 'Hetal Lad',
    position: 'Product Manager',
    department: 'Product',
    email: 'ladhetal@gmail.com',
    hireDate: 'Apr 23,2021',
    phone: '9863472185',
  },
  {
    id: 3,
    name: 'Hardik Patel',
    position: 'HR Recruiter',
    department: 'HR',
    email: 'hardikpatel@gmail.com',
    hireDate: 'Dec 09,2024',
    phone: '9645892136',
  },
  {
    id: 4,
    name: 'Raha Tandel',
    position: 'Analyst',
    department: 'Executive',
    email: 'tandelraha1276@gmail.com',
    hireDate: 'Feb 18,2022',
    phone: '7200036001',
  },
  {
    id: 5,
    name: 'Amrut Panchal',
    position: 'Manager',
    department: 'HR',
    email: 'amratbhai442@gmail.com',
    hireDate: 'Jun 12,2023',
    phone: '9426689380',
  },
  {
    id: 6,
    name: 'Divya Patel',
    position: 'Software Engineer',
    department: 'Engineering',
    email: 'pateldivya1503@outlook.com',
    hireDate: 'Aug 15,2024',
    phone: '9950017933',
  },
  {
    id: 7,
    name: 'Piyush Lad',
    position: 'Product Manager',
    department: 'Customer Care',
    email: 'ladpiyush209876@gmail.com',
    hireDate: 'Jan 01,2022',
    phone: '9820136127',
  },
  {
    id: 8,
    name: 'Bella Parmar',
    position: 'Product Manager',
    department: 'Sales',
    email: 'par23bella@gmail.com',
    hireDate: 'Dec 19,2024',
    phone: '9912098420',
  },
  {
    id: 9,
    name: 'Frank Johnson',
    position: 'Analyst',
    department: 'Executive',
    email: 'johnfrank234@gmail.com',
    hireDate: 'Jan 01,2025',
    phone: '9898201200',
  },
  {
    id: 10,
    name: 'Smith Mark',
    position: 'Software Engineer',
    department: 'Engineering',
    email: 'mark8900smith@gmail.com',
    hireDate: 'Nov 03,2023',
    phone: '9586056566',
  },
  {
    id: 11,
    name: 'Nirali Patel',
    position: 'Analyst',
    department: 'HR',
    email: 'niralipatel@gmail.com',
    phone: '9824119388',
    hireDate: '2023-12-13',
  },
  {
    id: 12,
    name: 'Pooja Pandit',
    position: 'Developer',
    department: 'Engineering',
    email: 'panditpooja23@outlook.com',
    phone: '9621000365',
    hireDate: '2024-10-09',
  },
  {
    id: 13,
    name: 'Chahi Choksi',
    position: 'Developer',
    department: 'Sales',
    email: 'ch345choksi@gmail.com',
    phone: '7520344188',
    hireDate: '2021-04-20',
  },
  {
    id: 14,
    name: 'Sunil Surati',
    position: 'Manager',
    department: 'Product',
    email: 'sunilsurati@outlook.com',
    phone: '9246308769',
    hireDate: '2025-01-01',
  },
  {
    id: 15,
    name: 'Jay Gajjar',
    position: 'Technician',
    department: 'Engineering',
    email: 'gajajrjay@gmail.com',
    phone: '7821063999',
    hireDate: '2024-05-25',
  },
  {
    id: 16,
    name: 'Dhaval Patel',
    position: 'Consultant',
    department: 'Finance',
    email: 'pateldhaval22@gmail.com',
    phone: '9123330458',
    hireDate: '2024-06-03',
  },
  {
    id: 17,
    name: 'Malhar Patel',
    position: 'Manager',
    department: 'Marketing',
    email: 'patelmalahr@outlook.som',
    phone: '9655524898',
    hireDate: '2021-09-08',
  },
  {
    id: 18,
    name: 'Dev Tolat',
    position: 'Analyst',
    department: 'Finance',
    email: 'irabanekar@gmail.com',
    phone: '6548796311',
    hireDate: '2022-09-18',
  },
  {
    id: 19,
    name: 'Stuti Thakkar',
    position: 'Developer',
    department: 'HR',
    email: 'stutitha@outlook.com',
    phone: '7089554416',
    hireDate: '2024-10-10',
  },
  {
    id: 20,
    name: 'Hiya Anghan',
    position: 'Consultant',
    department: 'Finance',
    email: 'hiuyaaanghan@gmail.com',
    phone: '9856103347',
    hireDate: '2021-12-03',
  },
  {
    id: 21,
    name: 'Jisha Patel',
    position: 'Product Manager',
    department: 'Marketing',
    email: 'patjishaa@gmail.com',
    phone: '8238591683',
    hireDate: '2023-11-03',
  },
];

// Sample departments data (Mock data)
const departments = [
  { id: 1, name: 'Engineering' },
  { id: 2, name: 'Product' },
  { id: 3, name: 'HR' },
  { id: 4, name: 'Sales' },
  { id: 5, name: 'Customer Support' },
  { id: 6, name: 'Executive' },
  { id: 7, name: 'Finance' },
  { id: 8, name: 'Marketing' },
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
  const { name, position, department, email, phone, hireDate } = req.body;

  // Validation to ensure all required fields are provided
  if (!name || !position || !department || !email || !phone || !hireDate) {
    return res.status(400).json({
      message:
        'All fields (name, position, department, email, phone, hireDate) are required',
    });
  }

  const newEmployee = {
    id: employees.length + 1, // Simple ID generation
    name,
    position,
    department,
    email,
    phone,
    hireDate,
  };

  employees.push(newEmployee);
  res.status(201).json(newEmployee);
});
console.log(employees);
// PUT /employees/:id - Update an employee by ID
app.put('/employees/:id', (req, res) => {
  const { id } = req.params;
  const { name, position, department, email, phone, hireDate } = req.body;

  // Validation to ensure required fields are provided
  if (!name || !position || !department || !email || !phone || !hireDate) {
    return res.status(400).json({
      message:
        'All fields (name, position, department, email, phone, hireDate) are required',
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
      hireDate,
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

// PUT /users/:id - Update user profile
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  const user = employees.find((emp) => emp.id === parseInt(id));
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  user.name = name || user.name;
  user.email = email || user.email;

  res.json({ message: 'Profile updated successfully', user });
});

// POST /users/:id/change-password - Change user password
app.post('/users/:id/change-password', (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: 'Password is required' });
  }

  const user = employees.find((emp) => emp.id === parseInt(id));
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  user.password = password; // In a real app, hash the password before storing

  res.json({ message: 'Password changed successfully' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
