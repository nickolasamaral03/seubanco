
import { useEffect, useState } from "react";
import styled from "styled-components";

const TodaEducacao = styled.div`
    margin: auto;
    text-align: center;
    justify-content: center;
    background: #617E75;
    max-width: 800px;
    height: 400px;
    padding: 10px;

    h2 {
        color: white;
        font-size: 1.5rem;
        margin-top: 5px;
    }

    p {
        font-size: 0.8rem;
        color: white;
    }

    input {
        margin-right: 8px;
        text-decoration: none;
        outline: none;
        border-radius: 3px;
        height: 25px;
        border: none;
        margin-top: 12px;
    }

    button {
        background: #CDEFD0;
        border-color: #CDEFD0;
        border-radius: 5px;
        margin-left: 10px;
        margin-top: 55px;
        width: 100px;
        height: 30px;
    }

    @media (max-width: 768px){
        max-width: 420px;
        height: 60vh;

            button{
                font-size: 0.8rem;
                width: 80px;
            }
        }
`;

const DentroEducacao = styled.div`
    margin: auto;
    text-align: center;
    justify-content: center;

    @media (max-width: 768px){
            h2{
                font-size: 1.1rem;
            }
        }
`;

const Educacao = (props) => {
    const [educacao, setEducacao] = useState("");
    const [limiteEducacao, setLimiteEducacao] = useState("");
    const [mensagemSucesso, setMensagemSucesso] = useState("");

    const PegandoEducacao = (evento) => {
        evento.preventDefault();
        setTimeout(() => {
            setMensagemSucesso("");
        }, 3000);

        props.PegandoValoresEducacao({
            educacao: educacao,
            limiteEducacao: limiteEducacao
        });

        setEducacao("");
        setLimiteEducacao("");
        setMensagemSucesso("Registrado com sucesso!");
    };

    return (
        <>
            <form onSubmit={PegandoEducacao}>
                <TodaEducacao>
                    <DentroEducacao>
                    {mensagemSucesso && (
                        <div 
                            className="alert alert-success position-absolute top-0 start-50 translate-middle-x" 
                            role="alert"
                            style={{ zIndex: 10, width: "30%", marginTop: "3rem" }}
                        >
                            {mensagemSucesso}
                        </div>
                    )}
                        <h2>Quanto é o seu gasto com educação?</h2>
                        <p>Faculdade, Cursos, Materiais Didáticos ou Transporte Escolar</p>
                        <input
                            type="number"
                            onChange={(e) => setEducacao(e.target.value)}
                            value={educacao}
                            required
                        />

                        <h2 style={{ marginTop: "80px" }}>
                            Qual é o valor limite para ser gasto nessa categoria?
                        </h2>
                        <input
                            type="number"
                            onChange={(e) => setLimiteEducacao(e.target.value)}
                            value={limiteEducacao}
                            required
                        />
                    </DentroEducacao>
                    <button>Confirmar</button>
                </TodaEducacao>
            </form>
        </>
    );
};

export default Educacao;
