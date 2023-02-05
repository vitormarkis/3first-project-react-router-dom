import React, { useEffect, useState } from "react"
import { useLoaderData } from "react-router-dom"
import { useStore } from "../contexts/store"
import { api } from "../libs/axios"

// import { Container } from './styles';

export interface UserFields {
  name: string
  age: string
  avatar: string
}

export interface UserProps extends UserFields {
  id: string
}

const Users: React.FC = () => {
  // const users = useLoaderData() as UserProps[]
  const { state, dispatch } = useStore()
  const { users } = state

  useEffect(() => {
    api
      .get(`http://localhost:3000/users`)
      .then((response) => dispatch({ type: "user/Set", payload: response.data }))
  }, [])
  return (
    <div>
      <ul className="list-none">
        {users.map((user) => (
          <div key={user.id} className="flex justify-between items-center py-2 border-b-neutral-400 border-b">
            <li>{user.name}</li>
            <dl className="text-sm">{user.age} anos</dl>
          </div>
        ))}
      </ul>
    </div>
  )
}

export default Users
