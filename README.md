# OneCloud Employee Management System

A responsive enterprise-style management application built using React, TypeScript, Tailwind CSS, TanStack Query, and React Router.

The application combines **Employee Management**, **Super Admin Dashboard**, and **Tenant Management** into a single application.

---

## Overview

The OneCloud Employee Management System is designed to provide an organized interface for managing employees and tenants while giving Super Administrators an overview of platform-level information.

The project follows a reusable component-based architecture and uses TanStack Query for data fetching, mutations, caching, and query invalidation.

---

## Features

### Employee Management

- View all employees
- Add new employees
- Edit employee information
- View employee details
- Delete employees
- Search employees
- Filter employees
- Manage employee status
- Employee form validation
- Responsive employee cards and layouts

### Super Admin Dashboard

- Platform overview
- Total tenants
- Active tenants
- Inactive tenants
- Total users
- Active licenses
- Employee statistics
- Platform health
- Tenant growth
- Tenant status
- Recent activities
- Responsive dashboard cards

### Tenant Management

- View all tenants
- Create new tenants
- View tenant details
- Edit tenant information
- Delete tenants
- Activate tenants
- Deactivate tenants
- Search tenants
- Filter by tenant status
- Filter by subscription plan
- Sort tenant data
- Tenant statistics

### Subscription Plans

The application supports:

- Basic
- Pro
- Enterprise

### Tenant Status

- Active
- Inactive

---

## Technology Stack

| Technology | Usage |
|---|---|
| React | UI development |
| TypeScript | Type safety |
| Tailwind CSS | Styling and responsive design |
| TanStack Query | Data fetching and state management |
| React Router DOM | Application routing |
| Vite | Development and build tool |
| LocalStorage | Local data persistence |

---

## TanStack Query

TanStack Query is used to manage application data and asynchronous operations.

The project uses:

- `useQuery`
- `useMutation`
- `useQueryClient`
- Query invalidation
- Refetching
- Loading states
- Error states

Custom hooks are used to keep query and mutation logic separate from UI components.

### Employee

```text
useEmployees
     ↓
employeeService
     ↓
LocalStorage
Tenant
useTenants
     ↓
tenantService
     ↓
LocalStorage
Dashboard
useSuperAdminDashboard
     ↓
dashboardService
     ↓
Dashboard Data
Dashboard Card Architecture


The main application routes are:

/dashboard

/employees
/employees/add
/employees/:id
/employees/:id/edit

/tenants
/tenants/new
/tenants/:id
/tenants/:id/edit

The application also maintains redirects for previous Super Admin routes where required.

Project Structure
src/
│
├── components/
│   ├── employees/
│   └── layout/
│
├── data/
│   └── employees.ts
│
├── hooks/
│   └── useEmployees.ts
│
├── pages/
│   ├── Dashboard.tsx
│   ├── Employees.tsx
│   ├── AddEmployee.tsx
│   ├── EditEmployee.tsx
│   └── EmployeeDetails.tsx
│
├── routes/
│   └── AppRoutes.tsx
│
├── services/
│   └── employeeService.ts
│
├── super-admin/
│   ├── components/
│   │   ├── dashboard/
│   │   └── tenant-management/
│   │
│   ├── data/
│   ├── hooks/
│   ├── pages/
│   └── services/
│
├── App.tsx
├── main.tsx
├── types.ts
└── index.css
Responsive Design

The application is designed to work across different screen sizes:

Desktop
Laptop
Tablet
Mobile

Responsive features include:

Collapsible sidebar
Mobile hamburger navigation
Responsive dashboard cards
Responsive employee layouts
Responsive tenant management
Responsive forms
Tablet-specific layouts
Mobile-friendly navigation
Data Management

The current application uses browser LocalStorage for employee and tenant data.

The application separates data operations into service files, making the project easier to maintain and allowing the service layer to be replaced with real backend APIs in the future.

Current services include:

employeeService.ts
tenantService.ts
dashboardService.ts
TypeScript

The project uses TypeScript throughout the application.

Important types include:

Employee
EmployeeFormData
EmployeeStatus

Tenant
TenantFormData
TenantStatus
SubscriptionPlan
TenantStats

DashboardStats
PlatformHealth
RecentActivity
TenantGrowthPoint

This provides type safety across components, hooks, services, forms, and dashboard data.

Getting Started
Prerequisites

Make sure Node.js and npm are installed.

node -v
npm -v
Install Dependencies
npm install
Start Development Server
npm run dev
Build for Production
npm run build
Run Lint
npm run lint
Deployment

The project is built using Vite and is suitable for deployment on platforms such as Vercel.

Production build:

npm run build

The generated production files are available in:

dist/
