import React from "react"
import { Form, NavLink, Outlet, useLoaderData } from "react-router-dom"
import { api } from "../libs/axios"
import { ChevronsRight } from "../styles/icons"
import { UserProps } from "./users"

export async function loader() {
  const response = await api.get(`http://localhost:3000/users`)
  return response.data
}

const Index: React.FC = () => {
  const users = useLoaderData() as UserProps[]

  return (
    <div className="w-screen h-screen bg-slate-500 flex">
      <nav className="basis-[320px] grow-0 shrink-0 bg-white flex flex-col gap-3 p-8">
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
          <NavLink to={`user/add`} className="cursor-pointer p-2 flex items-center justify-center sh rounded-2xl text-blue-600 font-semibold w-fit mx-auto">
            <ChevronsRight width={24} height={24} className="rotate-90" />
          </NavLink>
      </nav>
      <div className="p-8 basis-0 grow-[4] bg-transparent">
        <div className="bg-white p-8 w-full max-w-[756px] h-full sh rounded-2xl">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Index
