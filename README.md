# **Reebelo Case Study Frontend (React with TypeScript)**

## **Overview**

This is the frontend for the **Reebelo Case Study** built using **React** with **TypeScript**. The project handles product and order management, allowing users to create, view, and update products and orders.

---

## **Technologies Used**

- **React**: JavaScript library for building user interfaces.
- **TypeScript**: Adds static typing to JavaScript for improved code quality and reliability.
- **Redux Toolkit**: For state management across components.
- **Axios**: For making HTTP requests to the backend.
- **React Router**: For client-side routing.
- **React Bootstrap**: For responsive and styled UI components.
- **Jest & React Testing Library**: For unit and integration testing.

## **Setup Instructions**

### **1. Clone the repository**

```bash
git clone <repository-url>
cd frontend
```

### **2. Install dependencies**

```bash
npm install
```

### **3. Environment Variables**

Create a `.env` file in the root directory to define the backend API URL:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

### **4. Run the application**

```bash
npm start
```

This will start the React development server on `http://localhost:3000`.

---

## **Key Features**

- **Product Management**: Create, view, edit, and delete products.
- **Order Management**: Create orders, update order status, and shipping information.
- **Pagination**: Handles paginated data fetching for both products and orders.
- **State Management**: Centralized state management using **Redux Toolkit** for handling products and orders efficiently.
- **Validation**: Form validation for creating and updating products and orders.
- **Lazy Loading**: Uses React’s **Suspense** for lazy-loading large components.
- **Styled UI**: Uses **React Bootstrap** for a consistent and responsive user interface.

---

## **Project Features**

- **Scalability**: Designed to handle millions of users and products using Redux for efficient state management and Axios for API interaction.
- **Pagination**: Implements custom pagination to handle large datasets for products and orders.
- **Error Handling**: Toastr-style notifications for handling success and error messages.
- **User Experience**: Intuitive UI designed for usability, with quick feedback on actions like adding, updating, or deleting products.
