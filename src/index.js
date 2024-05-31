import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {loader as compoundLoader} from './Compound';
import {loader as protocolLoader} from './Protocol';
import {loader as userLoader} from "./Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App tab={"landing"}/>,
    errorElement: <div>{"404 :("}</div>
  },
  {
    path: "/compounds",
    element: <App tab={"compounds"}/>
  },
  {
    path: "/compounds/:compoundId",
    element: <App tab={"compound"}/>,
    loader: compoundLoader
  },
  {
    path: "/protocols",
    element: <App tab={"protocols"}/>
  },
  {
    path: "/protocols/:protocolId",
    element: <App tab={"protocol"}/>,
    loader: protocolLoader
  },
  {
    path: "/users",
    element: <App tab={"users"}/>
  },
  {
    path: "/users/:userId",
    element: <App tab={"user"}/>,
    loader: userLoader
  },
  {
    path: "/login",
    element:  <App tab={"landing"} /> /* once site is not entirely behind auth, this can just be a link to the landing component wrapped in authenticator. for now we just chill tho */
  }
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
