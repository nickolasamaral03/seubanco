import { useState } from "react";
import styled from "styled-components";

const TodaDivida = styled.div`
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

const DentroDivida = styled.div`
    margin: auto;
    text-align: center;
    justify-content: center;

    @media (max-width: 768px){
            h2{
                font-size: 1.1rem;
            }
        }
`;

const Alerta = styled.div`
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    /* margin-top: 3rem; */
    font-size: 1.2rem;
    text-align: center;
    width: 30%;

    @media (max-width: 1024px) {
        width: 50%; /* Maior em telas menores */
    }

    @media (max-width: 768px) {
        width: 35%; /* Ainda maior para melhor visibilidade */
        font-size: 0.6rem; /* Reduz fonte em telas menores */
    }

    @media (max-width: 480px) {
        width: 90%; /* Quase tela toda em celulares */
        font-size: 0.9rem;
    }
`

const Dividas = (props) => {
    const [divida, setDivida] = useState("");
    const [limiteDivida, setLimiteDivida] = useState("");
    const [mensagemSucesso, setMensagemSucesso] = useState("");

    const PegandoDividas = (evento) => {
        evento.preventDefault();
        setTimeout(() => {
            setMensagemSucesso("");
        }, 3000);

        props.PegandoValoresDividas({
            divida: divida,
            limiteDivida: limiteDivida
        });

        setDivida("");
        setLimiteDivida("");
        setMensagemSucesso("Registrado com sucesso!");
    };

    return (
        <>
            <form onSubmit={PegandoDividas}>
                <TodaDivida>
                    <DentroDivida>
                    {mensagemSucesso && (
                        <Alerta className="alert alert-success" role="alert">
                        {mensagemSucesso}
                        </Alerta>
                    )}
                        <h2>Quanto é o seu gasto com dívidas?</h2>
                        <p>Empréstimos, Financiamentos, Cartão de Crédito ou Parcelamentos</p>
                        <input
                            type="number"
                            onChange={(e) => setDivida(e.target.value)}
                            value={divida}
                            required
                        />

                        <h2 style={{ marginTop: "80px" }}>
                            Qual é o valor limite para ser gasto nessa categoria?
                        </h2>
                        <input
                            type="number"
                            onChange={(e) => setLimiteDivida(e.target.value)}
                            value={limiteDivida}
                            required
                        />
                    </DentroDivida>
                    <button>Confirmar</button>
                </TodaDivida>
            </form>
        </>
    );
};

export default Dividas;
