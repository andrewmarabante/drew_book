import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Error from './Error.jsx'
import Login from './LoginPage.jsx'
import Profiles from './Profiles.jsx'
import Chats from './Chats.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddFriends from './AddFriends.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />

  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "profiles",
    element: <Profiles/>
  },
  {
    path: "chats",
    element: <Chats/>
  },
  {
    path: "addFriends",
    element: <AddFriends/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
