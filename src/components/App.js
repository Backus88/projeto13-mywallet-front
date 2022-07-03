import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createContext, useState, React } from 'react';
import Login from './Login';
import Register from './Register';
import Wallet from './Wallet';
import Transaction from './Transaction';

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
                    <Route path = "/wallet" element ={ <Wallet/>}/>
                    <Route path="/transaction" element ={ <Transaction/>} />
                </Routes>
            </MainContext.Provider>
        </BrowserRouter>
    );
}