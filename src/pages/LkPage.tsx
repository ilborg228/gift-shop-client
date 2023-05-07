import React, {useContext, useEffect, useState} from 'react';
import {AuthContext, AuthFlag} from "../context";
import OrdersList from "../components/OrdersList";
import {updateUserName} from "../utils/api";
import Cookies from "universal-cookie";
import {ROLE_GUEST} from "../utils/constants";
import {useNavigate} from "react-router-dom";

const LkPage = () => {

    const cookies = new Cookies()
    const navigate = useNavigate()

    const {user, setUser} = useContext<AuthFlag>(AuthContext)
    const [name, setName] = useState(user.username)

    useEffect(()=>{
        console.log(user)
        if (user === undefined || user.id === undefined || user.id === 0 || user.role !== ROLE_GUEST)
            navigate('/', {replace:true})
    },[user])

    return (
        <div>
            <div className="my-6 flex rounded-md shadow-sm">

                <label htmlFor="company-website" className="mx-3 block text-sm font-medium text-gray-700">
                    Ваш email
                </label>

                <input
                    value={name}
                    onChange={(event)=>setName(event.target.value)}
                    type="text"
                    name="company-website"
                    id="company-website"
                    className="block w-full flex-1 rounded-l-md rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm mx-6"
                    placeholder=""
                />
                    <button
                        onClick={
                            event=>{
                                event.preventDefault();
                                if (user && user.id && name) {
                                    updateUserName(user.id, name)
                                    cookies.set('user', {...user, username: name}, { path: '/' })
                                    setUser({...user, username: name})
                                }
                            }
                        }
                        type="submit"
                        className="block justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Сохранить
                    </button>

            </div>
            <h1 className="my-3 font-medium mx-2 text-3xl">Ваши заказы:</h1>
            <OrdersList userId={user.id}/>
        </div>
    );
};

export default LkPage;