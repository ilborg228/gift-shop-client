import {createContext} from "react";

export type AuthFlag = {
    userId: number
    setUserId: (userId: number) => void
}

export const AuthContext = createContext<AuthFlag>({userId: 0, setUserId: ()=>{}})