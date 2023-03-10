import React from "react"
import {
  ActionFunctionArgs,
  Form,
  LoaderFunctionArgs,
  redirect,
  useLoaderData,
  useNavigate,
} from "react-router-dom"
import { useStore } from "../contexts/store"
import { api } from "../libs/axios"
import { LeftArrow, PlusCircle } from "../styles/icons"
import { UserFields, UserProps } from "./users"

export async function loader({ params }: LoaderFunctionArgs) {
  return params.id
}

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData()
  const formFields = Object.fromEntries(formData) as unknown
  const userFields = formFields as UserFields
  const userWithID = { id: params.id, ...userFields } as UserProps
  api.post("http://localhost:3000/users/", userWithID)
  return redirect("/")
}

const Add: React.FC = () => {
  const id = useLoaderData() as UserProps
  const { state, dispatch } = useStore()
  const navigate = useNavigate()

  function handleOnChangeInput(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.currentTarget
    dispatch({ type: "formFields/onChange", payload: { key: name, field: value } })
  }

  function handleAddClick() {
    dispatch({ type: "user/Add", payload: { ...state.formFields, id } })
  }

  return (
    <Form method="post" className="bg-white flex flex-col gap-3">
      <header className="mb-3">
        <h1 className="font-semibold text-4xl text-neutral-700">Adicionar um usuário</h1>
        <dd className="text-xl text-neutral-700/50 font-semibold">Adicione as informações desse usuário.</dd>
      </header>
      <input
        type="text"
        placeholder="Nome..."
        name="name"
        className="p-4 rounded-xl outline-neutral-400 outline-offset-4 bg-neutral-100 text-neutral-700 placeholder-neutral-400 text-xl"
        onChange={handleOnChangeInput}
      />
      <input
        type="text"
        placeholder="Idade..."
        name="age"
        className="p-4 rounded-xl outline-neutral-400 outline-offset-4 bg-neutral-100 text-neutral-700 placeholder-neutral-400 text-xl"
        onChange={handleOnChangeInput}
      />
      <input
        type="text"
        placeholder="Avatar..."
        name="avatar"
        className="p-4 rounded-xl outline-neutral-400 outline-offset-4 bg-neutral-100 text-neutral-700 placeholder-neutral-400 text-xl"
        onChange={handleOnChangeInput}
      />

      <div className="flex gap-3 ml-auto">
        <button
          onClick={() => navigate(-1)}
          type="button"
          className="p-2 rounded-xl text-white text-xl w-fit"
        >
          <LeftArrow width={48} height={48} className="text-neutral-800" />
        </button>
        <button onClick={handleAddClick} type="submit" className="p-2 rounded-xl text-white text-xl w-fit">
          <PlusCircle width={48} height={48} className="text-neutral-800" />
        </button>
      </div>
    </Form>
  )
}

export default Add
