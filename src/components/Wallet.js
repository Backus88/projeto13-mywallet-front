import { useContext, React, useState, useEffect } from 'react';
import { MainContext } from './App';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import exitImg from '../assets/exit.svg'

export default function Wallet(){

    const {name, token} = useContext(MainContext);
    const [walletController, setWalletController]= useState(false);
    const [total, setTotal] = useState("");
    const [list, setList]= useState([]);
    const[type, setType]= useState(false);
    const navigate = useNavigate();

    const config ={
        headers:{
            Authorization: `Bearer ${token}`
        }
    };
    function goTransaction (type){
        setType(type);
        navigate("/transaction",{state:{type}});
    }

    async function deleteUser (){
        try{
            await axios.delete("https://wallet-backend-driven.herokuapp.com/wallet",config);
            setList([...[]]);
            setTotal("");
            navigate("/");
        }catch(error){
            alert(error);
        }
    }

    useEffect(()=>{
        const going = async ()=>{
            try{
                const res = await axios.get("https://wallet-backend-driven.herokuapp.com/wallet",config);
                console.log(res);
                setList([...res.data.wallet]);
                setTotal(res.data.total);
            }catch(error){
                alert(error);
            }
        }
        going();
    },[walletController]);

    return(
        <WalletDiv>
            <RowDiv>
                <h1>Ola, {name}</h1>
                <ImgDiv onClick={()=>deleteUser()}>
                    <img src={exitImg} alt="dont have" />
                </ImgDiv>
            </RowDiv>
            <ListDiv>
                {(list)?
                    <MapRow>
                    {list.map((item, index)=>{
                        const {description, value, date} = item;
                        return(
                            <>
                            {(value > 0)?
                                        <ListRow enable ={true} key={index}>
                                            <ListDateDesc key={index}>
                                                <h4 >{date}</h4>
                                                <h6 >{description}</h6>
                                            </ListDateDesc>
                                            {(value > 0)?
                                            <h5>{value}</h5>
                                            :
                                            <h5>{value*(-1)}</h5>
                                            }
                                        </ListRow>
                                    :
                                        <ListRow enable ={false} key={index}>
                                            <ListDateDesc key ={index}>
                                                <h4 >{date}</h4>
                                                <h6 >{description}</h6>
                                            </ListDateDesc>
                                            {(value > 0)?
                                            <h5>{value}</h5>
                                            :
                                            <h5>{value*(-1)}</h5>
                                            }
                                        </ListRow>
                                }
                            </>
                        )
                    })}
                    </MapRow>
                :
                    <NoIens>
                        <h4>Não há registros de</h4>
                        <h4>entrada ou saída</h4>
                    </NoIens>
                }
                {(total > -1)?
                    <AbsoluteList enable={true}>
                        <h6>Saldo</h6>
                        <h5>{parseFloat(total).toFixed(2)}</h5>
                    </AbsoluteList>
                :
                    <AbsoluteList enable={false}>
                        <h6>Saldo</h6>
                        <h5>{parseFloat(total).toFixed(2)*-1}</h5>
                    </AbsoluteList>
                }
                
            </ListDiv>
            
            <RowDiv>
                <ButtonDiv onClick={()=>goTransaction(false)}>
                    <ion-icon name="add-circle-outline"></ion-icon>
                    <h3>Nova Entrada</h3>
                </ButtonDiv>
                <ButtonDiv onClick={()=>goTransaction(true)}>
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
    position: relative;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    width: 326px;
    height: 446px;
    background: #FFFFFF;
    border-radius: 5px;
    margin: 14px 0px;
    h4{
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 23px;
        text-align: center;
        color: #868686;
    }
`;

export const NoIens = styled.div `
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const ListRow = styled.div `
    box-sizing: border-box;
    padding: 0px 15px 0px 15px;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-between;
    width: 100%;
    max-width: 326px;
    margin-bottom: 15px;
    h5{
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        color: ${props =>props.enable? '#03AC00' : '#C70000' };
        margin-right: 5px;
    }
`;

export const ListDateDesc = styled.div `
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: auto;
    max-width: 250px;
    word-break: break-word;
    h4{
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        color: #C6C6C6;
        margin-right: 5px;
    }
    h6{
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 19px;
        color:  black ;
        margin-right: 5px;
    }
`;

export const AbsoluteList = styled.div `
    position: absolute;
    box-sizing: border-box ;
    display: flex;
    height: auto;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    bottom: 0;
    left: 0;
    height: auto;
    padding: 15px;
    max-width: 360px;
    h6{
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 18px;
        line-height: 20px;
        color: #000000;
    }
    h5{
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        color: ${props =>props.enable? '#03AC00' : '#C70000' };
        margin-right: 5px;
    }
`;

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

export const MapRow = styled.div `
    box-sizing: border-box;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 20px 0px;
    height: auto;
    max-height: 90%;
    overflow-y: scroll;
    ::-webkit-scrollbar{
        width: 0px;
    }
`;

export const ImgDiv = styled.div`
    width: auto;
    height: auto;
`;