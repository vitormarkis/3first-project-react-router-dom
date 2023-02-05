import React, { useEffect, useState } from "react"
import { ActionFunctionArgs, Form, redirect, useLoaderData, useNavigate } from "react-router-dom"
import { baseURL } from "../constants/baseURL"
import { useStore } from "../contexts/store"
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
  const userID = useLoaderData() as string
  const navigate = useNavigate()
  const { state, dispatch } = useStore()
  const [user, setUser] = useState<UserProps | null>(null)
  const specificUser = state.users.find((user) => user.id === userID) as UserProps

  function handleOnChangeInput(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.currentTarget
    dispatch({ type: "formFields/onChange", payload: { key: name, field: value } })
  }

  function handleEditClick() {
    dispatch({ type: "user/Patch", payload: { ...specificUser, ...state.formFields } })
  }

  async function handleBackNavigation() {
    if (!specificUser.name) await api.delete(`${baseURL}/users/${userID}`)
    navigate(-1)
  }

  useEffect(() => {
    setUser(specificUser)
  }, [])

  return (
    <Form method="post" className="bg-white flex flex-col gap-3">
      <header className="mb-3">
        <h1 className="font-semibold text-4xl text-neutral-700">Editar usuário</h1>
        <dd className="text-xl text-neutral-700/50 font-semibold">Atualize as informações desse usuário.</dd>
      </header>
      <input
        type="text"
        placeholder="Nome..."
        defaultValue={user?.name}
        name="name"
        className="p-4 rounded-xl outline-neutral-400 outline-offset-4 bg-neutral-100 text-neutral-700 placeholder-neutral-400 text-xl"
        onChange={handleOnChangeInput}
      />
      <input
        type="text"
        placeholder="Idade..."
        defaultValue={user?.age}
        name="age"
        className="p-4 rounded-xl outline-neutral-400 outline-offset-4 bg-neutral-100 text-neutral-700 placeholder-neutral-400 text-xl"
        onChange={handleOnChangeInput}
      />
      <input
        type="text"
        placeholder="Avatar..."
        defaultValue={user?.avatar}
        name="avatar"
        className="p-4 rounded-xl outline-neutral-400 outline-offset-4 bg-neutral-100 text-neutral-700 placeholder-neutral-400 text-xl"
        onChange={handleOnChangeInput}
      />

      <div className="flex gap-3 ml-auto">
        <button
          onClick={handleBackNavigation}
          type="button"
          className="p-1 rounded-xl text-white text-xl w-fit"
        >
          <LeftArrow width={32} height={32} className="text-neutral-800" />
        </button>

        <button onClick={handleEditClick} type="submit" className="p-1 rounded-xl text-white text-xl w-fit">
          <EditIcon width={32} height={32} className="text-neutral-800" />
        </button>
      </div>
    </Form>
  )
}

export default Edit
