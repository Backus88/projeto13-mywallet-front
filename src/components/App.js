import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createContext, useState, React } from 'react';
import Login from './Login';
import Register from './Register';

export const MainContext = createContext();

export default function App(){
    const[token, setToken]= useState(null);
    const[name, setName]= useState('');

    return (
        <BrowserRouter>
            <MainContext.Provider value ={{token, setToken, name,setName}}>
                <Routes>
                    <Route path="/" element={<Login  />} />
                    <Route path="/register" element = {<Register/>} />
                </Routes>
            </MainContext.Provider>
        </BrowserRouter>
    );
}