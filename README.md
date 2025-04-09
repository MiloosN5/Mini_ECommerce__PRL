# Mini ECommerce__PRL

## Table of contents

- [Preview](#preview)
- [About](#about)
  - [Tools & Requirements](#tools--requirements)
- [Local Installation](#local-installation)
- [Frontend](#frontend)
  - [Components & Reusable Code](#components--reusable-code)
  - [Redux](#redux)
  - [Authentication System](#authentication-system)
  - [Guarded Routes](#guarded-routes)
  - [Products & Cart](#products--cart)
  - [Color Picker & Decorative Images)(#color-picker--decorative-images)
- [Backend](#backend)
- [Credits](#credits)

## Preview

<img src="./frontend/public/preview/MiniECommerce__LinkedIn__1.png"  width="100%;" height="auto" alt="" />
<img src="./frontend/public/preview/MiniECommerce__LinkedIn__2.png"  width="100%;" height="auto" alt="" />

## About

A website designed to help users conveniently order the products they need online. This project demonstrates my knowledge of Laravel as the backend, React as the frontend, and PostgreSQL as the database, as well as how they are integrated into a full-stack application. Users can add or remove products from the cart and update product quantities. User registration and login are required to access these features.

### Tools & Requirements

- Frontend
  - ***Development environment***: Vite
  - ***Language***: TypeScript
  - ***Framework***: React
  - ***State Management***: Redux
  - ***Architecture***: SPA (Single Page Application)
  - ***Approach***: Mobile-first workflow
  - ***Routing***: React Router
  - ***Structure***: Reusable code and components
  - ***Skeleton***: Semantic HTML5 markup
  - ***Styling***: CSS/SASS
  - ***Features***:
    - Register/Login system
    - Cart feature
    - Products feature
  - ***Dynamism***:
    - Transitions
    - Hover effects
  - ***Accessibility***:
    - Responsive design (viewport sizes, REM/EM units)
    - Visibility for screenreaders
    - ARIA (Accessible Rich Internet Applications) roles & attributes
  - ***Library***: Axios, react-router-dom
- Backend
  - ***Runtime***: 	PHP 8
  - ***Language***: PHP
  - ***Framework***: Laravel
  - ***Arhitecture***: MVC + RESTful API
  - ***Database***: PostgreSQL
  - ***ORM***: Eloquent ORM
  - ***Authentication System***: Laravel Sanctum
  - ***Security***:
    - CSRF Protection
    - CORS Configuration
   
## Local Installation
   
## Frontend

On the client side, users can add products to their cart, modify the cart, and add new products to the product list. To have a personal cart, the user must first register and then log in. The frontend communicates with the backend using the Axios library, which fetches data from the server and displays it to the user. Redux with persistence is used for locally storing user-related data (such as cart and authentication), as well as product data and selected color preferences, which are visible even without registration.

### Components & Reusable Code

To improve code readability, maintainability, and structure, the project is organized into smaller components that serve as blueprints or templates. These components can be reused with variations by passing different props when invoked.

### Redux

The data fetched from the backend is temporarily stored in local or session storage, and thanks to Redux Persist, it can also persist across page reloads. Redux is implemented through a system of communication between the store, reducers, and dispatchers. The dispatcher reacts to actions defined in reducers and informs them of the new state, which is then saved in the store.
State is handled through different slices (e.g., cartSlice, productsSlice) and thunks that handle asynchronous backend requests. Each slice defines an initial state and actions to modify it (e.g., addToCart, removeFromCart), as well as thunks for operations like loginUser and fetchProducts.

### Authentication System

For purchasing products online, users are required to register by filling out a form with necessary information, including email and password. After successful registration, the user can log in and is redirected to a dashboard page, which is protected and inaccessible to non-authenticated users.
Once logged in, user data is saved in localStorage under the Application tab. Thanks to Redux Persist, this data persists even after tab closure or page refresh (and possibly even server restarts, depending on implementation).
The authSlice is used to manage authentication data, using actions and thunks like registerUser, loginUser, and logoutUser. The user token is stored once the user logs in and removed upon logout.

### Guarded Routes

A custom GuardPage component was created to protect routes. It checks whether the user exists in the Redux state. If the user is authenticated, access is granted to the requested route; otherwise, the user is redirected to the login page. GuardPage wraps the target route to provide this logic.

### Products & Cart

Both products and the cart are managed by their respective slices (productsSlice and cartSlice), which update state using actions and thunks. Actions like addToCart and removeFromCart update the local state, and then a thunk (e.g., updateCart) is called to asynchronously update the backend.
A product can’t be added multiple times to the cart; it becomes available again only after being removed from the cart. Inside the cart, users can also change the product quantity using the changeQuantity action.

### Color Picker & Decorative Images

A better user experience is achieved by allowing user personalization and subtle interaction. Decorative illustrations are used to hold user attention, and a color picker allows users to choose a dominant color for the interface. The selected color is stored in colorSlice and persists in localStorage (for both guest and logged-in users).
Thanks to Redux, this color preference can be used across multiple parts of the app, including the generation of a complementary color, which is then used for text color, borders, and other visual elements.


## Backend

### Routes

### Authentication system with Laravel Sanctum

### PostgreSQL as a database

### Models, Controllers & Migrations

### CSRF & CORS Configurations




## Credits
