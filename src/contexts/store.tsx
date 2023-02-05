import React, { createContext, useContext, useEffect, useReducer } from "react"
import { ActionProps, ActionTypes, initialState, reducer, RootStore } from "../reducers/store"

export interface GlobalStoreProps {
  state: RootStore
  dispatch: React.Dispatch<ActionProps<ActionTypes>>
}

const StoreContext = createContext<GlobalStoreProps | null>(null)

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    console.log(state)
  }, [state]);
  return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>
}

export const useStore: () => GlobalStoreProps = () => useContext(StoreContext)!
