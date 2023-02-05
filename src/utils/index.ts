import { UserFields, UserProps } from "../routes/users"

export function filterUsers(users: UserProps[], userID: string): UserProps[] {
  return users.filter((user) => user.id !== userID)
}

export function patchUser(users: UserProps[], updatedData: UserProps): UserProps[] {
  return users.map((user) => (user.id === updatedData.id ? { ...user, ...updatedData } : { ...user }))
}
