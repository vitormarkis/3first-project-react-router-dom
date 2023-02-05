import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { StoreProvider } from "./contexts/store"
import "./index.css"
import Users from "./routes/users"
import User, { loader as userLoader } from "./routes/user"
import EditIcon, { action as editAction } from "./routes/edit"
import Index, { action as rootAction } from "./routes/root"
import Add, { action as addAction, loader as addLoader } from "./routes/add"
import { deleteAction } from "./routes/delete"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
    action: rootAction,
    children: [
      { index: true, element: <Users /> },
      {
        path: "/user/:id",
        loader: userLoader,
        element: <User />,
      },
      {
        path: "/user/add",
        loader: addLoader,
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
    <StoreProvider>
      <RouterProvider router={router} />
    </StoreProvider>
  </React.StrictMode>
)
