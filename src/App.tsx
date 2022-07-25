import React from 'react';
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import {Route, BrowserRouter, Routes} from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <Navbar/>
        <BrowserRouter>
            <Routes>
                <Route path={"/store"} element={<ProductList/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
