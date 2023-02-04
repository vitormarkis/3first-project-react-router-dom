import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./index.css"
import Add, { action as addAction } from "./routes/add"
import { deleteAction } from "./routes/delete"
import EditIcon, { action as editAction } from "./routes/edit"
import Index, { loader as rootLoader } from "./routes/root"
import User, { loader as userLoader } from "./routes/user"
import Users from "./routes/users"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
    loader: rootLoader,
    errorElement: <div>ROOOOOOOT</div>,
    children: [
      { index: true, element: <Users />, loader: rootLoader },
      {
        path: "/user/:id",
        loader: userLoader,
        element: <User />,
      },
      {
        path: "/user/add",
        action: addAction,
        element: <Add />,
      },
      {
        path: "/user/:id/edit",
        loader: userLoader,
        action: editAction,
        element: <EditIcon />,
      },
      {
        path: "/user/:id/delete",
        action: deleteAction,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
