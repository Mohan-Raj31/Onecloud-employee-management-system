# OneCloud Employee Management System

A responsive Employee Management System built using **React and TypeScript**.

This application allows users to manage employee information through a simple and responsive interface.

## Features

- Dashboard with dynamic employee statistics
- Add new employees
- Edit employee information
- Delete employees with confirmation
- View employee details
- Search employees by name
- Filter employees by department
- Filter employees by status
- Combined search and filtering
- Form validation
- Unique Employee ID validation
- Email and phone number validation
- Loading, empty and error states
- Data persistence using localStorage
- React Router navigation
- Responsive design for desktop, tablet and mobile
- Mobile hamburger menu

## Technologies Used

- React
- TypeScript
- React Router DOM
- Vite
- HTML5
- CSS3
- LocalStorage

## Project Structure

```text
Onecloud-employee-management-system/
│
├── src/
│   ├── components/
│   │   ├── employees/
│   │   │   ├── EmployeeCard.tsx
│   │   │   ├── EmployeeFilters.tsx
│   │   │   ├── EmployeeForm.tsx
│   │   │   └── EmployeeSearch.tsx
│   │   │
│   │   └── layout/
│   │       ├── Header.tsx
│   │       ├── Layout.tsx
│   │       └── Sidebar.tsx
│   │
│   ├── data/
│   │   └── employees.ts
│   │
│   ├── pages/
│   │   ├── AddEmployee.tsx
│   │   ├── Dashboard.tsx
│   │   ├── EditEmployee.tsx
│   │   ├── EmployeeDetails.tsx
│   │   └── Employees.tsx
│   │
│   ├── routes/
│   │   └── AppRoutes.tsx
│   │
│   ├── App.tsx
│   ├── main.tsx
│   ├── types.ts
│   └── index.css
│
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Application Pages

### Dashboard

The Dashboard displays employee statistics dynamically:

- Total Employees
- Active Employees
- Inactive Employees
- Departments

### Employees

The Employees page provides:

- Employee list
- Search employees
- Department filtering
- Status filtering
- Add Employee
- View Details
- Delete Employee

### Add Employee

Allows users to add a new employee.

The form includes validation for required fields, Employee ID, email and phone number.

### Edit Employee

Allows users to update existing employee information using a pre-filled form.

### Employee Details

Displays detailed information about a selected employee.

## Search and Filtering

Employees can be searched by name and filtered by:

- Department
- Status

Search and filters can also be used together to find specific employees.

## Form Validation

The application validates:

- Required fields
- Unique Employee ID
- Valid email format
- 10-digit phone number

Validation messages are displayed when invalid information is entered.

## LocalStorage

Employee information is stored in the browser using **localStorage**.

This allows the employee data to remain available after refreshing the browser.

```text
React State
     ↓
  useEffect
     ↓
localStorage
```

## Routing

The application uses **React Router DOM** for navigation.

```text
/                    → Dashboard
/dashboard           → Dashboard
/employees           → Employee List
/employees/add       → Add Employee
/employees/:id       → Employee Details
/employees/:id/edit  → Edit Employee
```

## Responsive Design

The application supports:

- Desktop
- Tablet
- Mobile

On mobile screens, the sidebar is replaced with a **hamburger menu** for navigation.

## React Concepts Used

- Functional Components
- TSX
- Props
- useState
- useEffect
- Event Handling
- Controlled Components
- Conditional Rendering
- map()
- filter()
- Component Reusability
- React Router
- useNavigate
- useParams
- localStorage

## TypeScript Concepts Used

- Interfaces
- Type Aliases
- Union Types
- Typed Props
- Typed State
- Typed Event Handlers
- Type-safe Functions

## Installation

### Clone the Repository

```bash
git clone <your-github-repository-url>
```

### Navigate to the Project

```bash
cd Onecloud-employee-management-system
```

### Install Dependencies

```bash
npm install
```

## Run the Application

```bash
npm run dev
```

## Build the Application

```bash
npm run build
```

## Author

**Mohan Raj**

Java Full Stack Developer
