import { Form, LoaderFunctionArgs, useLoaderData, useNavigate } from "react-router-dom"
import { api } from "../libs/axios"
import { Edit, LeftArrow, UserX } from "../styles/icons"
import { UserProps } from "./users"

export async function loader({ params }: LoaderFunctionArgs) {
  const response = await api.get(`http://localhost:3000/users/${params.id}`)
  return response.data
}

const User: React.FC = () => {
  const user = useLoaderData() as UserProps
  const navigate = useNavigate()

  return (
    <div className="bg-white flex justify-between h-1/2  ">
      <img src={user.avatar} alt="" className="w-32 h-32 rounded-full border-2 border-neutral-800" />
      <div className="flex flex-col justify-between">
        <h2 className="text-right font-semibold text-5xl text-neutral-800">{user.name}</h2>
        <p className="ml-auto font-semibold text-3xl text-neutral-700">{user.age}</p>
        <div className="flex gap-3 ml-auto">
          <button
            onClick={() => navigate(-1)}
            type="button"
            className="p-2 rounded-xl text-white text-xl w-fit"
          >
            <LeftArrow width={48} height={48} className="text-neutral-800" />
          </button>
          <Form method="post" action="delete">
            <button className="p-2 rounded-xl text-white text-xl">
              <UserX width={48} height={48} className="text-neutral-800" />
            </button>
          </Form>
          <Form action="edit" className="ml-auto">
            <button type="submit" className="p-2 rounded-xl text-white text-xl">
              <Edit width={48} height={48} className="text-neutral-800" />
            </button>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default User
