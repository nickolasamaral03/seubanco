import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import logo from "../Icons/logonoback.png"

const LoginDiv = styled.div`
    margin: auto;
    text-align: center;
    justify-content: center;
    background: #61c5a619;
    max-width: 500px ;
    height: 640px ;
    padding: 15px;
    border-radius: 10px;
    padding-top : 180px;
    width: 100%;
    display: block;

    button{
        margin-top: 50px;
        padding: 7px;
        border-radius: 3px;
        border-color: white;
        width: 80px;
    }

    p{
        margin-left: 260px;
        padding: 20px;
        color: white;
        font-size: 0.89rem;
        margin-top: 30px;
        font-size: 0.76rem;

        @media (max-width: 768px){
            font-size: 0.60rem;
            white-space: nowrap;
            margin: 0 auto;
        }

    }

`
const LoginDentro = styled.div`
    margin-right: 120px;

    h2{
        margin-right: 250px;
        margin-bottom: 45px;
        color: white;
        font-size: 1.5rem;
        margin-top: 5px;
    }

    h3{
        margin-right: 150px;
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

    @media (max-width: 768px){
        margin-right: 20px;

        h2{
            font-size: 1.25rem;
        }

        h3{
            font-size: 1rem;
        }
    }
`

const TodoLogin = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 100vh;

    @media (max-width: 768px){
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        text-align: center;
        justify-content: center;
        overflow-x: hidden;
    }

    img{
        width: 400px;
        height: 450px;
        border-radius: 30px;
        margin-bottom: -140px;

        @media (max-width: 768px){
            width: 250px;
            height: 250px;
            margin-right: 150px;
        }
    }

    h5{
        color: white;
        margin-top: 50px;
    }
`
const ParteTexto = styled.div`
    @media (max-width: 768px){
        max-width: 345px;
        max-height: 450px;
        width: 85%;
        margin: auto;
        text-align: center;
        justify-content: center;
    
       
        h5{
            font-size: 0.9rem;
            width: 340px;
            margin-top: 70px;
        }
        
        p{
            font-size: 0.8rem;
            white-space: normal;
            word-wrap: break-word;
            overflow-wrap: break-word;
            width: 340px;
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

const Login = (props) => {
    const [usuario, setUsuario] = useState("")
    const [senha, setSenha] = useState("")
    const [mensagemSucesso, setMensagemSucesso] = useState("")
    const [mensagemErro, setMensagemErro] = useState("")


    const navigate = useNavigate();
 
    const PegandoLogin = async(evento) => {
        evento.preventDefault()

        try{
            const response = await axios.post('http://localhost:5000/auth/login', {
                usuario,
                senha
            })
            localStorage.setItem('token', response.data.token)
            setMensagemSucesso("Login realizado com sucesso!")

            setTimeout(() => {
                navigate('/inicio')
                setMensagemSucesso("")
            }, 3000)
        } catch(error){
            setMensagemErro("Erro ao fazer o login! Tente novamente!")
            console.log(error)
            setTimeout(() => {
                setMensagemErro("")
            }, 3000)
        }
    }

    return(
        <TodoLogin>
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
        <ParteTexto>
        <div style={{width: "500px", marginBottom: "100px"}}>
            <img src={logo} alt=""/>
            <h5>Veja para onde seu dinheiro está indo e tome o controle das suas finanças!</h5>
            <p style={{color: "white", marginTop: "30px",}}>Monitorar seus gastos vai muito além de apenas anotar números, é entender seus hábitos financeiros, identificar excessos e criar um planejamento mais inteligente para o seu dinheiro. Com o 'SeuBolso', você tem uma visão clara de onde, como e quanto está gastando, permitindo que tome decisões mais estratégicas e alcance seus objetivos financeiros com mais segurança. Controle suas finanças e transforme sua relação com o dinheiro!"</p>
        </div>
        </ParteTexto>
        <form onSubmit={PegandoLogin}>
        <LoginDiv>
            <LoginDentro>
                <h2>Login:</h2>
                <h3>Email:</h3>
                <input type="text" onChange={(e) => setUsuario(e.target.value)} value={usuario}/>
                <h3>Senha:</h3>
                <input type="password" onChange={(e) => setSenha(e.target.value)} value={senha}/>
            </LoginDentro>
                <button>Entrar</button>
                <p>Não possui cadastro? <Link to="/cadastro"  style={{ textDecoration: 'none', color: '#71f28d' }}>Cadastrar</Link></p>
        </LoginDiv>
        </form>
        </TodoLogin>
    )
}

export default Login