import React from 'react';
import Navbar from "./components/Navbar";
import ProductList from "./pages/ProductList";
import {Route, Routes} from 'react-router-dom';
import ProductDetails from "./pages/ProductDetails";

function App() {
  return (
    <div className="App">
        <Navbar/>
        <Routes>
            <Route path={"/store"} element={<ProductList categoryId={1}/>}/>
            <Route path={"/product/:id"} element={<ProductDetails/>}/>
        </Routes>
    </div>
  );
}

export default App;
