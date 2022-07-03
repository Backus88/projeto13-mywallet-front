import { useContext, React, useState } from 'react';
import { MainContext } from './App';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import exitImg from '../assets/exit.svg'

export default function Wallet(){

    const {name, token} = useContext(MainContext);
    const[type, setType]= useState(null);
    const navigate = useNavigate();

    return(
        <WalletDiv>
            <RowDiv>
                <h1>Ola</h1>
                <img src={exitImg} alt="dont have" />
            </RowDiv>
            <ListDiv>
            </ListDiv>
            
            <RowDiv>
                <ButtonDiv>
                    <ion-icon name="add-circle-outline"></ion-icon>
                    <h3>Nova Entrada</h3>
                </ButtonDiv>
                <ButtonDiv>
                    <ion-icon name="remove-circle-outline"></ion-icon>
                    <h3>Nova Saída</h3>
                </ButtonDiv>
            </RowDiv>
        </WalletDiv>
    )


}

export const WalletDiv = styled.div`
    padding-top: 10px;
    display: flex;
    min-height: 100vh;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    background-color: #8C11BE;
    h1{
        font-family: 'Saira Stencil One';
        font-style: normal;
        font-weight: 400;
        font-size: 32px;
        line-height: 50px;
        color: #FFFFFF;
    }
    h2{
        margin-top: 32px;
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 15px;
        line-height: 18px;
        color: #FFFFFF;
        text-decoration-line: underline;
    }
    h3{
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 26px;
        line-height: 31px;
        color: #FFFFFF;
    }
    button{
        width: 326px;
        height: 46px;
        background: #A328D6;
        border-radius: 5px;
        border: none;
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 23px;
        text-align: center;
        color: #FFFFFF;
        cursor: pointer;
    }
`;

export const ListDiv = styled.div `
    display: flex;
    width: 326px;
    height: 446px;
    background: #FFFFFF;
    border-radius: 5px;
    margin: 14px 0px;
    overflow-y: scroll;
    ::-webkit-scrollbar{
        width: 0px;
    }
`

export const RowDiv = styled.div`
    box-sizing: border-box;
    padding: 0 25px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 380px;
`; 

export const ButtonDiv = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    width: 155px;
    height: 114px;
    background: #A328D6;
    border-radius: 5px;
    padding: 9px 0px 9px 9px;
    ion-icon{
        color: #FFFFFF;
        width: 25px;
        height: 25px;
    }
    h3{
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 17px;
        line-height: 20px;
        color: #FFFFFF;
    }
`;