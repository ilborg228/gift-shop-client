import React, {useEffect, useState} from 'react';
import Navbar from "./components/Navbar";
import ProductList from "./pages/ProductList";
import {Route, Routes} from 'react-router-dom';
import ProductDetails from "./pages/ProductDetails";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import {AuthContext} from "./context";
import HomePage from "./pages/HomePage";
import ContactsPage from "./pages/ContactsPage";
import LawInfoPage from "./pages/LawInfoPage";
import StorePage from "./pages/StorePage";
import Cookies from "universal-cookie";
import AdminPage from "./pages/AdminPage";
import LkPage from "./pages/LkPage";
import {healthCheck} from "./utils/api";
import ServerTiredPage from "./pages/ServerTiredPage";

function App() {

    const cookies = new Cookies();
    const [user, setUser] = useState(cookies.get('user'))
    const [serverHealth, setServerHealth] = useState(true)

    useEffect(() => {
        healthCheck(setServerHealth)
    }, [])

    if (serverHealth)
        return (
            <AuthContext.Provider value={{user, setUser}}>
                <Navbar/>
                <Routes>
                    <Route path={"/"} element={<HomePage/>}/>
                    <Route path={"/store/:id"} element={<StorePage/>}/>
                    <Route path={"/store"} element={<StorePage/>}/>
                    <Route path={"/products/:id"} element={<ProductDetails/>}/>
                    <Route path={"/category/:id"} element={<ProductList/>}/>
                    <Route path={"/registration"} element={<RegistrationPage/>}/>
                    <Route path={"/login"} element={<LoginPage/>}/>
                    <Route path={"/contacts"} element={<ContactsPage/>}/>
                    <Route path={"/law-info"} element={<LawInfoPage/>}/>
                    <Route path={"/admin"} element={<AdminPage/>}/>
                    <Route path={"/lk"} element={<LkPage/>}/>
                </Routes>
            </AuthContext.Provider>
        );
    else
        return (
            <ServerTiredPage/>
        )
}

export default App;
