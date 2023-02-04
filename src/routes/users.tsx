import React, { useEffect, useState } from "react"
import { useLoaderData } from "react-router-dom"

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
  const users = useLoaderData() as UserProps[]

  console.log(users)
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
