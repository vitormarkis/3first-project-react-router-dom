import { ActionFunctionArgs, redirect } from "react-router-dom"
import { baseURL } from "../constants/baseURL"
import { api } from "../libs/axios"

export async function deleteAction({ params }: ActionFunctionArgs) {
  api.delete(`${baseURL}/users/${params.id}`)
  return redirect("/")
}
