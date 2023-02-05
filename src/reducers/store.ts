import { UserProps } from "../routes/users"
import { filterUsers, patchUser } from "../utils"

export interface FormFieldsProps {
  name: string
  age: string
  avatar: string
}

export interface RootStore {
  users: UserProps[]
  formFields: FormFieldsProps
}

export type ActionTypes = "user/Add" | "user/Delete" | "user/Patch" | "formFields/onChange" | "user/Set"

export type ActionProps<T> = {
  type: T
  payload?: any
}

export const initialState: RootStore = {
  users: [],
  formFields: {
    name: "",
    age: "",
    avatar: "",
  },
}

export function reducer(state: RootStore, action: ActionProps<ActionTypes>): RootStore {
  switch (action.type) {
    case "formFields/onChange":
      const key: keyof FormFieldsProps = action.payload.key
      const value: string = action.payload.field
      return { ...state, formFields: { ...state.formFields, [key]: value } }

      case "user/Set":
        return { ...state, users: action.payload }

    case "user/Add":
      const newUser = action.payload as UserProps
      return { ...state, users: [...state.users, newUser] }

    case "user/Delete":
      const userID = action.payload as string
      const filteredUsers = filterUsers(state.users, userID)
      return { ...state, users: filteredUsers }

    case "user/Patch":
      const updatedUser = action.payload as UserProps
      const patchedUsers = patchUser(state.users, updatedUser)
      return { ...state, users: patchedUsers }

    default:
      return state
  }
}
