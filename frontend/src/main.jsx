import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import App from "./App";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import AddTodo from "./pages/AddTodo";
import PrivateRoute from "./component/PrivateRoute";
import UpdateUserProfile from "./pages/UpdateUserProfile";
import AllTodo from "./pages/AllTodos";
import UpdateTodo from "./pages/UpdateTodo";
import NotFound from "./component/NotFound";
import GetAllUserTodos from "./pages/GetAllUserTodos";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />} />
      <Route
        path="dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      ></Route>
      <Route
        path="update-profile"
        element={
          <PrivateRoute>
            <UpdateUserProfile />
          </PrivateRoute>
        }
      ></Route>
      <Route
        path="all-todo"
        element={
          <PrivateRoute>
            <AllTodo />
          </PrivateRoute>
        }
      ></Route>
      <Route
        path="update-todo/:id"
        element={
          <PrivateRoute>
            <UpdateTodo />
          </PrivateRoute>
        }
      ></Route>
      <Route
        path="add-todo"
        element={
          <PrivateRoute>
            <AddTodo />
          </PrivateRoute>
        }
      ></Route>
      <Route
        path="get-user-todos"
        element={
          <PrivateRoute>
            <GetAllUserTodos />
          </PrivateRoute>
        }
      ></Route>
      <Route path="*" element={<NotFound />} />

      <Route path="login" element={<Login />} />
      <Route path="register" element={<Registration />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
