import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import logo from "../Icons/logonoback.png"

const TodoCadastro = styled.div`
    margin: auto;
    text-align: center;
    justify-content: center;
    background: #61c5a619;
    max-width: 500px;
    height: 640px ;
    padding: 15px;
    border-radius: 10px;
    padding-top : 120px;
    padding-left: 100px;
    margin-left: -550px;

    button{
        margin-top: 60px;
        margin-right: 100px;
        padding-bottom: 7px;
        padding: 7px;
        border-radius: 3px;
        border-color: white;
    }

    @media (max-width: 768px){
        text-align: center;
        margin: auto;
        justify-content: center;  
        width: 350px;

    }
    
`

const CadastroDentro = styled.div`
     margin-right: 120px;

    h2{
        margin-right: 250px;
        margin-bottom: 45px;
        color: white;
        font-size: 1.4rem;

    }

    h3{
        margin-right: 170px;
        color: white;
        margin-top: 28px;
        font-size: 1.3rem;

    }

    input{
        border-radius: 6px;
        text-decoration: none;
        outline: none;
        padding: 4px;
    }

    p{
        color: #bce5bc;
        margin-top: 10px;
        font-size: 0.75rem;
    }

    @media (max-width: 765px){
        margin: auto;
        text-align: center;
        justify-content: center;
        margin-left: -82px;
        
        p{
            font-size: 0.69rem;
        }

        h2, h3{
            font-size: 1.1rem;
        }
    }
    
`

const TodoCadastroLogo = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 100vh;

    img{
        width: 400px;
        height: 500px;
        border-radius: 30px;
    }

    @media (max-width: 768px){
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        text-align: center;
        justify-content: center;
        overflow-x: hidden;

        img{
            width: 300px;
            height: 350px;
        }
    }
`

const Alerta = styled.div`
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    margin-top: 3rem;
    font-size: 1.2rem;
    text-align: center;
    width: 30%;

    @media (max-width: 1024px) {
        width: 50%; /* Maior em telas menores */
    }

    @media (max-width: 768px) {
        width: 40%; /* Ainda maior para melhor visibilidade */
        font-size: 1rem; /* Reduz fonte em telas menores */
    }

    @media (max-width: 480px) {
        width: 90%; /* Quase tela toda em celulares */
        font-size: 0.9rem;
    }
`;

const Cadastro = (props) => {
    const [nome, setNome] = useState("");
    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");
    const [mensagemSucesso, setMensagemSucesso] = useState("")
    const [mensagemErro, setMensagemErro] = useState("")

    const navigate = useNavigate();

    const API_URL = process.env.REACT_APP_API_URL   

    const PegandoValoresCadastrados = async (evento) => {
        evento.preventDefault();

        try{
            const response = await axios.post(`${API_URL}/auth/register`, {
                nome, 
                usuario,
                senha
            })

            setMensagemSucesso("Cadastro realizado com sucesso!")

            setTimeout(() => {
                navigate('/')
                setMensagemSucesso("")
            }, 3000)
        } catch(error){
            setMensagemErro("Erro ao fazer o cadastro! Tente novamente!")
            console.log(error)
            setTimeout(() => {
                setMensagemErro("")
            }, 3000)
        }
    }

    // Axios é uma biblioteca JavaScript que permite fazer requisições HTTP no navegador ou no servidor Node.

    return(
        <TodoCadastroLogo>  
        {mensagemSucesso && (
                    <Alerta className="alert alert-success" role="alert">
                    {mensagemSucesso}
                    </Alerta>
                )}
            {mensagemErro && (
                <Alerta className="alert alert-danger" role="alert">
                {mensagemErro}
                </Alerta>
            )}
        <img src={logo} alt="" />
        <form onSubmit={PegandoValoresCadastrados}>
        <TodoCadastro>
            <CadastroDentro>
            <h2>Cadastro:</h2>
            <h3>Nome:</h3>
            <input type="text" onChange={(e) => setNome(e.target.value)} value={nome}/>
            <h3 style={{marginLeft:'12px'}}>Email:</h3>
            <input type="text" onChange={(e) => setUsuario(e.target.value)} value={usuario}/>
            <h3>Senha:</h3>
            <input type="password" onChange={(e) => setSenha(e.target.value)} value={senha}/>
            <p>*A senha deve ter letras e números</p>
            </CadastroDentro>
            <button>Cadastrar</button>
        </TodoCadastro>
        </form>
        </TodoCadastroLogo>
    )
}

export default Cadastro
