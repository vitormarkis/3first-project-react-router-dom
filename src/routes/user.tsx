import { useEffect, useState } from "react"
import { Form, Link, LoaderFunctionArgs, useLoaderData, useNavigate } from "react-router-dom"
import { baseURL } from "../constants/baseURL"
import { useStore } from "../contexts/store"
import { api } from "../libs/axios"
import { Edit, LeftArrow, UserX } from "../styles/icons"
import { UserProps } from "./users"

export async function loader({ params }: LoaderFunctionArgs) {
  return params.id
}

const User: React.FC = () => {
  const userID = useLoaderData() as string
  const { state, dispatch } = useStore()
  const [user, setUser] = useState<UserProps | null>(null)
  const specificUser = state.users.find((user) => user.id === userID) as UserProps

  useEffect(() => {
    api
      .get(`${baseURL}/users`)
      .then((response) => dispatch({ type: "user/Set", payload: response.data }))
  }, [state.users])

  useEffect(() => {
    setUser(specificUser)
  }, [userID, state.users])

  return (
    <div className="bg-white flex flex-col justify-between gap-8">
      <div className="flex justify-between">
        <img src={user?.avatar} alt="" className="w-32 h-32 rounded-full border-2 border-neutral-800" />
        <div className="flex flex-col">
          <h2 className="text-right font-semibold text-5xl text-neutral-800">{user?.name}</h2>
          <p className="ml-auto font-semibold text-3xl text-neutral-700">{user?.age}</p>
        </div>
      </div>
      <div className="flex gap-3 justify-end">
          <Link to={"/"}>
            <button type="button" className="p-1 rounded-xl text-white text-xl">
              <LeftArrow width={32} height={32} className="text-neutral-800" />
            </button>
          </Link>
          <Form action="edit">
            <button type="submit" className="p-1 rounded-xl text-white text-xl">
              <Edit width={32} height={32} className="text-blue-600" />
            </button>
          </Form>
          <Form method="post" action="delete">
            <button className="p-1 rounded-xl text-white text-xl">
              <UserX width={32} height={32} className="text-red-700" />
            </button>
          </Form>
        </div>
    </div>
  )
}

export default User
