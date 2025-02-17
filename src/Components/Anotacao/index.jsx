import { useEffect, useState } from "react";
import styled from "styled-components";

const TodoInicio = styled.div`
    margin: auto;
    text-align: center;
    justify-content: center;
    background: #617E75;
    max-width: 800px;
    height: 500px;
    overflow-y: auto;
    max-height: 550px;

    h4{
        color: white;
        font-size: 1.2rem;
        margin-top: 25px;
        margin-bottom: 20px;
    }

    h3{
        color: #a0fa18;
        font-size: 1.4rem;
    }

    p{
        color: #ffffff;
        font-size: 1.1rem;
        margin-top: 15px;
    }

    input{
        margin-right: 8px;
        text-decoration: none;
        outline: none;
        border-radius: 3px;
        height: 25px;
        border: none;
        margin-bottom: 32px;
    }

    button{
        padding: 8px;
        border-radius: 5px;
        background: #46ca4687;
        color: white;
        border: none;
        cursor: pointer;
    }

    @media (max-width: 768px){
        max-width: 420px;
        padding: 5px;

       h4, h3{
        font-size: 0.85rem;
        margin-top: 8px;
       }

       button{
        font-size: 0.65rem;
       }

       p{
        font-size: 0.9rem;
       }
    }
`

const Anotacao = () => {
    const [anotacao, setAnotacao] = useState("");
    const [registroAnotacao, setRegistroAnotacao] = useState(() => {
        const anotacaoSalva = localStorage.getItem("registroAnotacao");
        return anotacaoSalva ? JSON.parse(anotacaoSalva) : [];
    });

    useEffect(() => {
        localStorage.setItem("registroAnotacao", JSON.stringify(registroAnotacao));
    })

    const PegandoAnotacao = (evento) => {
        evento.preventDefault();

        setRegistroAnotacao((prevRegistro) => [
            ...prevRegistro,
            anotacao
        ])

        setAnotacao("");
        
    }

    return(
        <TodoInicio>
            <form onSubmit={PegandoAnotacao}>
            <h4>Aqui servirá como um bloco de anotações, caso queira lembrar de algo:</h4>
            <input type="text" placeholder="Digite aqui..." onChange={(e) => setAnotacao(e.target.value)} value={anotacao}/>
            <button>Adicionar</button>
            <button style={{marginLeft: '20px', backgroundColor: "#df3535"}} onClick={() => {setRegistroAnotacao([])
                localStorage.removeItem("registroAnotacao")
            }}>Apagar Notas</button>
            </form>

            <h3>Notas:</h3>
            
                {registroAnotacao.map((item, index) => (
                    <p key={index}> {item}</p>
                ))}
        

        </TodoInicio>
    )
}

export default Anotacao;