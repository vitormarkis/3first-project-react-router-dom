import React from "react"
import { ActionFunctionArgs, Form, redirect, useLoaderData, useNavigate } from "react-router-dom"
import { api } from "../libs/axios"
import { Edit as EditIcon, LeftArrow } from "../styles/icons"
import { UserProps } from "./users"

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData()
  const updatedUser = Object.fromEntries(formData)
  api.patch(`http://localhost:3000/users/${params.id}`, updatedUser)
  return redirect(`/user/${params.id}`)
}

const Edit: React.FC = () => {
  const user = useLoaderData() as UserProps
  const navigate = useNavigate()

  return (
    <Form method="post" className="bg-white flex flex-col gap-3">
      <header className="mb-3">
        <h1 className="font-semibold text-4xl text-neutral-700">Editar usuário</h1>
        <dd className="text-xl text-neutral-700/50 font-semibold">Atualize as informações desse usuário.</dd>
      </header>
      <input
        type="text"
        placeholder="Nome..."
        defaultValue={user.name}
        name="name"
        className="p-4 rounded-xl outline-neutral-400 outline-offset-4 bg-neutral-100 text-neutral-700 placeholder-neutral-400 text-xl"
      />
      <input
        type="text"
        placeholder="Idade..."
        defaultValue={user.age}
        name="age"
        className="p-4 rounded-xl outline-neutral-400 outline-offset-4 bg-neutral-100 text-neutral-700 placeholder-neutral-400 text-xl"
      />

      <div className="flex gap-3 ml-auto">
      <button onClick={() => navigate(-1)} type="button" className="p-2 rounded-xl text-white text-xl w-fit">
        <LeftArrow width={48} height={48} className="text-neutral-800" />
      </button>

      <button type="submit" className="p-2 rounded-xl text-white text-xl w-fit">
        <EditIcon width={48} height={48} className="text-neutral-800" />
      </button>
      </div>
    </Form>
  )
}

export default Edit
