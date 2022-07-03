import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { MainDiv } from './Login'
import { MainLoader } from './Login'
import { FormStyle } from './Login'

export default function Register(){
    const[email, setEmail] = useState("");
    const[pwd, setPwd]= useState("");
    const[name, setName]= useState("");
    const[pwdConfirm, setPwdConfirm]= useState("");
    const[disabled, setDisabled]= useState(false);
    const navigate = useNavigate();

    async function registerNew(event){
        event.preventDefault();
        setDisabled(true);
        try{
            const res = await axios.post("localhost:5000/register", {
                name: name,
                email: email,
                password: pwd,
                confirmPassword: pwdConfirm
            });
            setDisabled(false);
            navigate("/");

        }catch(error){
            alert(error.response.data.details);
            setDisabled(false);
            setEmail("");
            setName("");
            setPwdConfirm("");
            setPwd("");
        }
    }
    return(
        <MainDiv>
            <h1>MyWallet</h1>
            {(disabled)?
                <FormStyle enable ={false}>
                    <form >
                        <input type="text" placeholder='Nome' value={name} onChange={e => setName(e.target.value)} disabled={true} />
                        <input type="email" placeholder='E-mail' value={email} onChange={e => setEmail(e.target.value)} disabled={true} />
                        <input type="password" placeholder='Senha' value={pwd} onChange={e => setPwd(e.target.value)} disabled={true} />
                        <input type="text" placeholder='Confirme a senha' value={pwdConfirm} onChange={e => setPwdConfirm(e.target.value)} disabled={true} />
                        <MainLoader>
                            <ThreeDots heigth="70" width="70" color="white" ariaLabel="loading" />
                        </MainLoader>
                    </form>
                </FormStyle>    
            :
                <FormStyle enable ={true}>
                    <form onSubmit={registerNew}>
                        <input type="text" placeholder='Nome'  value={name} onChange={e =>setName(e.target.value)} required  />
                        <input type="email" placeholder='E-mail' value={email} onChange={e =>setEmail(e.target.value)} required  />
                        <input type="password" placeholder='Senha' value={pwd} onChange={e =>setPwd(e.target.value)} required />
                        <input type="text" placeholder='Confirme a senha'  value = {pwd} onChange={e =>setPwdConfirm(e.target.value)} required  />
                        <button type='submit'> Cadastrar </button>
                    </form>
                </FormStyle>
            }
            <Link to={"/"} style={{ textDecoration: 'none' }}>
                <h2>
                    Já tem uma conta? Entre agora!
                </h2>
            </Link>
        </MainDiv>
    );
}