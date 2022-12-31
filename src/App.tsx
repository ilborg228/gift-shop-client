import React, {useState} from 'react';
import Navbar from "./components/Navbar";
import ProductList from "./pages/ProductList";
import {Route, Routes} from 'react-router-dom';
import ProductDetails from "./pages/ProductDetails";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import {AuthContext} from "./context";

function App() {

    const [userId, setUserId] = useState(0)

    return (
    <AuthContext.Provider value={{userId, setUserId}}>
        <Navbar/>
        <Routes>
            <Route path={"/store"} element={<ProductList categoryId={1}/>}/>
            <Route path={"/products/:id"} element={<ProductDetails/>}/>
            <Route path={"/registration"} element={<RegistrationPage/>}/>
            <Route path={"/login"} element={<LoginPage/>}/>
        </Routes>
    </AuthContext.Provider>
    );
}

export default App;
