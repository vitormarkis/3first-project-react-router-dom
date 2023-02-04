import { ActionFunctionArgs, redirect } from "react-router-dom"
import { api } from "../libs/axios"

export async function deleteAction({ params }: ActionFunctionArgs) {
  api.delete(`http://localhost:3000/users/${params.id}`)
  return redirect("/")
}
