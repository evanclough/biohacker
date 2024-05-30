import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Amplify } from 'aws-amplify';
import amplifyconfig from './amplifyconfiguration.json';
import {loader as compoundLoader} from './Compound';
import {loader as protocolLoader} from './Protocol';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
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
  }
]);

Amplify.configure(amplifyconfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
