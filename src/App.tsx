import React from 'react';
import Navbar from "./components/Navbar";
import ProductList from "./pages/ProductList";
import {Route, Routes} from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <Navbar/>
        <Routes>
            <Route path={"/store"} element={<ProductList categoryId={1}/>}/>
            <Route path={"/product/:id"} element={<ProductList categoryId={1}/>}/>
        </Routes>
    </div>
  );
}

export default App;
