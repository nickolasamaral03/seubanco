import { useState } from "react";
import styled from "styled-components"
import { v4 as uuid } from "uuid"

const Outross = styled.div`
    margin: auto;
    text-align: center;
    justify-content: center;
`

const TodoOutros = styled.div`
    margin: auto;
    text-align: center;
    justify-content: center;
    background: #617E75;
    max-width: 800px ;
    height: 500px ;
    padding: 10px;

    h2{
        color: white;
        margin-top: 40px;
        font-size: 1.5rem;
    }

    p{
        font-size: 0.8rem;
        color: white;
    }

    input{
        margin-right: 8px;
        text-decoration: none;
        outline: none;
        border-radius: 3px;
        height: 25px;
        border: none;
        margin-top: 6px;
        margin-bottom: 10px;
    }

    button{
        background: #CDEFD0;
        border-color: #CDEFD0;
        border-radius: 5px;
        margin-left: 10px;
        margin-top: 55px;
        width: 100px;
        height: 30px;
    }

    @media (max-width: 768px){
       h2{
        font-size: 1rem;
       }

       button{
        width: 80px;
        font-size: 0.8rem;
       }
        }
`

const Outros = (props) => {
    const [nome, setNome] = useState("");
    const [valor, setValor] = useState("");
    const [limite, setLimite] = useState(""); 
    const [mensagemSucesso, setMensagemSucesso] = useState("");


    const PegandoValoresOutros = (evento) => {
        evento.preventDefault();

        setTimeout(() => {
            setMensagemSucesso("");
        }, 3000);

        props.PegandoValoresdoOutro({
            nome: nome,
            valor: valor,
            limite: limite,
            id: uuid()
        })

        setNome("");
        setValor("");
        setLimite("");
        setMensagemSucesso("Registrado com sucesso!");
        console.log(nome, valor, limite)
    }


    return (
        <form onSubmit={PegandoValoresOutros}>
            <TodoOutros>
                <Outross> 
                {mensagemSucesso && (
                        <div 
                            className="alert alert-success position-absolute top-0 start-50 translate-middle-x" 
                            role="alert"
                            style={{ zIndex: 10, width: "30%", marginTop: "3rem" }}
                        >
                            {mensagemSucesso}
                        </div>
                    )}
                        <h2 >Nome da Categoria:</h2>
                        <input type="text" onChange={(e) => setNome(e.target.value)} value={nome} required/>

                        <h2>Quanto é o seu gasto nessa categoria?</h2>
                        <input type="number" onChange={(e) => setValor(e.target.value)} value={valor} required/>
                    
                        <h2 >Qual é o valor limite para ser gasto nessa categoria?</h2>
                        <input type="number" onChange={(e) => setLimite(e.target.value)} value={limite} required/>
                </Outross> 
                        <button>Confirmar</button>
            </TodoOutros>
        </form>
    )
}

export default Outros