import { useContext, React, useState } from 'react';
import { MainContext } from './App';
import { ThreeDots } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';




export default function Login(){
    const [disabled, setDisabled] = useState(false);
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword]= useState("");
    const {setToken,setName } = useContext(MainContext);
    const navigate = useNavigate();

    async function signIn(event){
        event.preventDefault();
        setDisabled(true);
        try{
            const res = await axios.post("localhost:5000/login",{
                email: loginEmail,
                password: loginPassword
            });
            const {token, name} = res.data;
            setToken(token);
            setName(name);
            navigate("/wallet");
        }catch(error){
            alert("Usuario ou senha incorretos");
            setDisabled(false);
            setLoginEmail("");
            setLoginPassword("");
        }
    }
    return(
        <MainDiv>
            <h1>MyWallet</h1>
            {(disabled)?
                <FormStyle enable ={false}>
                    <form>
                        <input type="email"  placeholder='email' value={loginEmail} onChange={e => setLoginEmail(e.target.value)} disabled={true} />
                        <input type="password" placeholder='senha' value={loginPassword} onChange={e=> setLoginPassword((e.target.value))}  disabled ={true} />
                        <MainLoader>
                            <ThreeDots heigth="70" width="70" color="white" ariaLabel="loading" />
                        </MainLoader>
                    </form>
                </FormStyle>
                :
                <FormStyle enable ={true}>
                    <form onSubmit={signIn}>
                        <input type="email"  placeholder='E-mail' value={loginEmail} onChange={e => setLoginEmail(e.target.value)} required />
                        <input type="password" placeholder='Senha' value={loginPassword} onChange={e=> setLoginPassword((e.target.value))}  required />
                        <button type='submit'> Entrar </button>
                    </form>
                </FormStyle>
            }
            <Link to={"/register"} style ={{textDecoration:'none'}}>
                <h2>
                    Primeira vez? Cadastre-se!
                </h2>
            </Link>
        </MainDiv>
    );
}

export const MainDiv = styled.div`
    display: flex;
    min-height: 667px;
    justify-content: center;
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

export const FormStyle = styled.div `
     form{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    input{
        box-sizing: border-box;
        width: 326px;
        height: 58px;
        left: 36px;
        top: 279px;
        background:${props =>props.enable? '#FFFFFF' : '#F2F2F2' };
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        margin-bottom: 13px;
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
        padding-left: 11px;
        ::placeholder{
            color: #000000;
        }
    }
`;
export const MainLoader = styled.div `
    width: 303px;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #52B6FF;
`