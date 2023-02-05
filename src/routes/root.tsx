import React, { useEffect } from "react"
import { Form, Link, NavLink, Outlet, redirect } from "react-router-dom"
import { useStore } from "../contexts/store"
import { api } from "../libs/axios"
import { ChevronsRight } from "../styles/icons"

// export async function loader() {
//   const response = await api.get(`http://localhost:3000/users`)
//   return response.data
// }

export async function action() {
  const id: string = Math.random().toString(20).substring(2, 20)
  await api.post("http://localhost:3000/users/", { id })
  return redirect(`/user/${id}/edit`)
}

const Index: React.FC = () => {
  const { state, dispatch } = useStore()
  const { users } = state
  // const users = useLoaderData() as UserProps[]

  useEffect(() => {
    api
      .get(`http://localhost:3000/users`)
      .then((response) => dispatch({ type: "user/Set", payload: response.data }))
  }, [])

  return (
    <div className="w-screen h-screen bg-slate-500 flex">
      <nav className="basis-[320px] grow-0 shrink-0 bg-white flex flex-col gap-3 p-8">
      <Link to={`/`} className="text-3xl font-black text-slate-700 text-center">LoG_Oz</Link>
      <hr />
        <ul className="flex flex-col gap-3">
          {users.map((user) => (
            <NavLink
              key={user.id}
              to={`user/${user.id}`}
              className={({ isActive }) => {
                const activeClass = isActive ? "active " : ""
                return `${activeClass}sh bg-transparent hover:bg-neutral-100 p-3 cursor-pointer rounded-2xl`
              }}
            >
              {user.name}
            </NavLink>
          ))}
        </ul>
        <Form method="post">
          <button
            className="cursor-pointer p-2 flex items-center justify-center sh rounded-2xl text-blue-600 font-semibold w-fit mx-auto"
            type="submit"
          >
            <ChevronsRight width={24} height={24} className="rotate-90" />
          </button>
        </Form>
      </nav>
      <div className="px-8 basis-0 grow-[4] bg-transparent">
        <div className="bg-white p-8 w-full max-w-[756px] h-full sh">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Index
