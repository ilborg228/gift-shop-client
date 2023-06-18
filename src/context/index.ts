import {createContext} from "react";
import {IUser} from "../utils/types";

export type AuthFlag = {
    user: IUser
    setUser: (user: IUser) => void
}

const defUser: IUser = {
    id: '0',
    username: '',
    role: ''
}

export const AuthContext = createContext<AuthFlag>({user: defUser, setUser: ()=>{}})