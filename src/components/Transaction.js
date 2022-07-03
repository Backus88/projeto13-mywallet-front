import { useContext, React, useState } from 'react';
import { MainContext } from './App';
import { ThreeDots } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import dayjs from 'dayjs';
import { WalletDiv } from './Wallet';
import { FormStyle, MainLoader } from './Login';

export default function Transaction (){
    const {token} = useContext(MainContext);
    const[disabled, setDisabled]= useState(false);
    const[value, setValue]= useState("");
    const[description, setDescription]= useState("");
    const type = false;
    const navigate = useNavigate();

    // Mount the authorizathion token
    const config ={
        headers:{
            "Authorization": `Bearer ${token}`
        }
    }

    async function newTransaction(event){
        event.preventDefault();
        setDisabled(true);
        const body = JSON.stringify({
            description: description,
            date: dayjs().format("DD/MM"),
            value: value
        });

        try{
            const res = await axios.post("localhost:50000/wallet", body, config);
            navigate("/wallet");
        }catch(error){
            alert("Dados nao compativeis");
            setDisabled(false);
            setValue("");
            setDescription("");
        }
    }

    return(
        <WalletDiv>
            <TransctionDiv>
                {(type)?
                <h3>Nova Entrada</h3>
                :
                <h3>Nova Saída</h3>
                }
            </TransctionDiv>
             {(disabled)?
                <FormStyle enable ={false}>
                    <form>
                        <input type="number"  placeholder='Valor' value={value} onChange={e => setValue(e.target.value)} disabled={true} />
                        <input type="text" placeholder='Descrição' value={description} onChange={e=> setDescription((e.target.value))}  disabled ={true} />
                        <MainLoader>
                            <ThreeDots heigth="70" width="70" color="white" ariaLabel="loading" />
                        </MainLoader>
                    </form>
                </FormStyle>
                :
                <FormStyle enable ={true}>
                    <form onSubmit={newTransaction}>
                        <input type="number"  placeholder='Valor' value={value} onChange={e => setValue(e.target.value)} required />
                        <input type="text" placeholder='Descrição' value={description} onChange={e=> setDescription((e.target.value))}  required />
                        <button type='submit'> Entrar </button>
                    </form>
                </FormStyle>
            }
                
            <Link to={"/cadastro"} style ={{textDecoration:'none'}}>
                <h2>
                    Não tem uma conta? Cadastre-se!
                </h2>
            </Link>
        </WalletDiv>
    );
}


export const TransctionDiv = styled.div `
    width: 100%;
    max-width: 380px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    padding: 35px 0px;
    padding-left: 25px;
`;