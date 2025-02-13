import { useState, useEffect } from "react";
import styled from "styled-components";

const TodoInicio = styled.div`
   position: fixed; 
    bottom: 20px; 
    left: 0; 
    right: 0;
    top: 120px;
    margin: auto;
    text-align: center;
    justify-content: center;
    background: #617E75;
    max-width: 800px ;
    overflow-y: auto; 
    max-height: 750px;

    p {
        padding: 20px;
        color: #BFE8B8;
    }

    h3 {
        color: white;
        font-size: 1.3rem;
        margin-top: 8px;
    }

    input {
        margin-right: 8px;
        text-decoration: none;
        outline: none;
        border-radius: 3px;
        height: 25px;
        border: none;
    }

    button {
        margin-top: 30px;
        padding: 8px;
        border-radius: 5px;
        background: #46ca4687;
        color: white;
        border: none;
        cursor: pointer;
    }

    @media (max-width: 768px){
    p{
        font-size: 0.8rem;
    }

    button{
        font-size: 0.8rem;
    }

    h3{
        font-size: 0.9rem;
        white-space: nowrap;
    }
   }
`;

const Alinhar = styled.div`
    display: flex;
    align-items: center;
    gap: 30px;
    margin-left: 30px;
    margin-top: 10px;

    @media (max-width: 768px){
        h3{
            font-size: 0.8rem;
        }
    }
`;

const Registros = styled.div`
    @media (max-width: 768px){
        width: 200px;

        button{
            font-size: 0.65rem;
            width: 80px;
        }
    }
`

const Informativo = styled.div`
    display: flex;
    margin: auto;
    text-align: center;
    justify-content: center;

    p{
        color: #d6e812f2;
        font-size: 1.035rem;
   }

   @media (max-width: 768px){
    p{
        font-size: 0.7rem;
    }
   }
`;

const Informacoes = styled.div`
    display: flex;
    margin: auto;
    text-align: center;
    justify-content: center;
    margin: 10px;
    background-color: gray;
    border-radius: 10px;

    p {
        color: #f0e7e7;
        margin-top: 6px;
        font-size: 1.033rem;
    }

    @media (max-width: 768px){
        p{
            font-size: 0.85rem;
        }
    }
`;

const MensagemAlerta = styled.p`
    color: #e9c6c6;
    margin-bottom: 12px;
    font-size: 1.1rem;
    font-weight: bolder;
    background: #d02424da;
    width: 80%;
    margin: auto;
    padding: 8px;
    border-radius: 5px;
    text-align: center;

    @media (max-width: 768px) {
        font-size: 0.9rem;
        width: 90%;
        padding: 6px;
    }

    @media (max-width: 480px) {
        font-size: 0.8rem;
        width: 95%;
        padding: 4px;
    }
`;

const DefinirSaude = ({ valuesSaude, atualizarGastosTotais }) => {
    const [gastosSaude, setGastosSaude] = useState("");
    const [gastosMotivo, setGastosMotivo] = useState("");
    const [registro, setRegistro] = useState(() => {
        const registroSalvo = localStorage.getItem("registroSaude");
        return registroSalvo ? JSON.parse(registroSalvo) : [];
    });

    useEffect(() => {
        localStorage.setItem("registroSaude", JSON.stringify(registro));
    });

    const [mensagemAlerta, setMensagemAlerta] = useState("");

    const calcularGastosTotais = () => {
        return registro.reduce((total, item) => total + parseFloat(item.valor || 0), 0);
    };

    useEffect(() => {
        const totalGastos = calcularGastosTotais();
        if(atualizarGastosTotais) {
            atualizarGastosTotais(totalGastos);
        }
    }, [registro]) // Atualiza o valor total no componente pai

    useEffect(() => {
        const totalGastos = calcularGastosTotais();
        const valorRestante = valuesSaude.limiteSaude - totalGastos;

        const valorAlerta = valuesSaude.limiteSaude * 0.2;

        if (valuesSaude.limiteSaude < totalGastos) {
            setMensagemAlerta("ATENÇÃO: VALOR LIMITE ULTRAPASSADO!!!");
        } else if (valorRestante <= valorAlerta) {
            setMensagemAlerta("Atenção valor se aproximando do limite!");
        } else {
            setMensagemAlerta("");
        }
    }, [registro, valuesSaude]);

    const PegandoInformacoes = (evento) => {
        evento.preventDefault();

        const dataAtual = new Date();
        const dataFormatada = dataAtual.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });

        setRegistro((prevRegistro) => [
            ...prevRegistro,
            { motivo: gastosMotivo, valor: gastosSaude, data: dataFormatada },
        ]);

        setGastosSaude("");
        setGastosMotivo("");
    };

    const totalGastos = calcularGastosTotais();
    const valorRestante = valuesSaude.limiteSaude
        ? valuesSaude.limiteSaude - totalGastos
        : 0;

    return (
        <TodoInicio>
            <p>Não esqueça de registrar todos os gastos com saúde!</p>

            <form onSubmit={PegandoInformacoes}>
                <Alinhar>
                    <h3>Quanto foi o gasto?</h3>
                    <input
                        type="number"
                        onChange={(e) => setGastosSaude(e.target.value)}
                        value={gastosSaude}
                        required
                    />
                </Alinhar>

                <Alinhar>
                    <h3>Com o que foi?</h3>
                    <input
                        type="text"
                        onChange={(e) => setGastosMotivo(e.target.value)}
                        value={gastosMotivo}
                        required
                    />
                </Alinhar>

                <button>Confirmar</button>
            </form>

        <Registros>
            <div style={{ display: "flex", justifyContent: "center",  marginTop: "20px" }}>
                <h3 style={{ marginTop: "40px", marginLeft: "220px" }}>
                    Registros de Saúde:
                </h3>
                <button
                    style={{
                        background: "#ea4444e9",
                        height: "35px",
                        marginLeft: "100px",
                        marginTop: "33px",
                    }}
                    onClick={() => { setRegistro([]);
                        localStorage.removeItem("registro");
                        }}
                >
                    Apagar Registros
                </button>
            </div>
            </Registros>

            <Informativo>
                <p>
                    <strong>Valor Limite:</strong> R$ {valuesSaude.limiteSaude}
                </p>
                <p>
                    <strong>Valor gasto até o momento:</strong> R$ {totalGastos}
                </p>
                <p>
                    <strong>Restante:</strong> R$ {valorRestante}
                </p>
            </Informativo>

            {mensagemAlerta && <MensagemAlerta>{mensagemAlerta}</MensagemAlerta>}

            <div>
                {registro.map((registro, index) => (
                    <Informacoes key={index}>
                        <p>
                            <strong>Motivo: {registro.motivo} </strong> | <strong>Gasto: R${" "}
                            {registro.valor} </strong> | <strong>Data: {registro.data} </strong>
                        </p>
                    </Informacoes>
                ))}
            </div>
        </TodoInicio>
    );
};

export default DefinirSaude;
