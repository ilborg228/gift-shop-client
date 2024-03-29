import React, {useContext, useEffect, useState} from 'react';
import {LockClosedIcon} from "@heroicons/react/solid";
import {AuthContext} from "../context";
import {registration} from "../utils/api";
import {useNavigate} from "react-router-dom";

const RegistrationPage = () => {

    const {user, setUser} = useContext(AuthContext)
    const [email, setEmail] = useState('')
    const navigate = useNavigate()
    const [password, setPassword] = useState('')

    useEffect(()=>{
        if (user === undefined || user.id === undefined || user.id === '0') {}
        else navigate(-1)
    },[])

    return (
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Создайте новый аккаунт
                    </h2>
                </div>
                <form className="mt-8 space-y-6" action="#" method="POST">
                    <input type="hidden" name="remember" defaultValue="true"/>
                    <div className="-space-y-px rounded-md shadow-sm">
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input  onChange={event=>{setEmail(event.target.value)}}
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="Email"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input  onChange={event=>{setPassword(event.target.value)}}
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="Пароль"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            onClick={event=>{event.preventDefault(); registration(email, password, setUser).then(r => navigate(-1))}}
                            type="submit"
                            className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                            Зарегистрироваться
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegistrationPage;