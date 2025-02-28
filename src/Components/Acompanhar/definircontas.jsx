import { useState, useEffect } from "react";
import styled from "styled-components";
import check from '../Icons/check-mark.png';
import { v4 as uuidv4 } from 'uuid';

const TodoInicio = styled.div`
    position: fixed; 
    bottom: 35px; 
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
        font-size: 1.2rem;
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

    h5{
        padding: 25px;
        color: #e0cfcf;
        font-size: 1rem;
        margin-top: 8px;
    }

    @media (max-width: 768px){
        height: 600px;
        width: 390px;
        border-radius: 5px;
        top: 180px;
        bottom: 100px;
        p{
            font-size: 0.8rem;
        }

        button{
           width: 80px;
           font-size: 0.7rem;
        }

        h5{
            font-size: 0.8rem;
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
            font-size: 0.9rem;
            white-space: nowrap;
            margin-left: -20px;
        }

        input{
            width: 115px;
            margin-right: 20px;
        }

    }
`;

const Informativo = styled.div`
    display: flex;
    margin: auto;
    text-align: center;
    justify-content: center;
    max-width: 800px;
    background-color: #3f7e3f54;
    margin: 0 10px 10px 10px;

    p{
        font-size: 0.88rem;
        color: white;
    }

    @media (max-width: 768px){
        border-radius: 5px;
        p{
            font-size: 0.65rem;
        }
    }
`;

const InformacoesContas = styled.div`
    display: flex;
    margin: auto;
    text-align: center;
    justify-content: center;
    max-width: 450px;

    p {
        color: #d7dfc0;
    }

    img{
        width: 35px;
        height: 35px;
        margin-bottom: -7px;
        margin-left: 8px;
        cursor: pointer;
    }
`;

const Informacoes = styled.div`
    display: flex;
    margin: auto;
    text-align: center;
    justify-content: center;
    max-width: 500px;
    background-color: #00000022;
    margin-bottom: 10px;
    margin-top: 20px;

    p {
        color: #e6dddd;
        margin-top: 12px;
    }

    img{
        width: 25px;
        height: 25px;
        margin-left: 8px;
        cursor: pointer;
    }
`;

const Registros = styled.div`
    button{
            font-size: 0.80rem;
            height: 40px;
            margin-top: 33px;
    }

    @media (max-width: 768px){
        button{
            font-size: 0.6rem;
            width: 80px;
        }

        h3{
            font-size: 0.9rem;
        }
    }
`

const DefinirContas = ({ valuesContas, atualizarGastosTotaisContas }) => {
    const [gastosContas, setGastosContas] = useState("");
    const [gastosMotivo, setGastosMotivo] = useState("");
    const [dataLimiteConta, setDataLimiteConta] = useState("");
    const [registro, setRegistro] = useState(() => {
        const registroSalvo = localStorage.getItem("registroContas");
        return registroSalvo ? JSON.parse(registroSalvo) : [];
    });

    useEffect(() => {
        localStorage.setItem("registroContas", JSON.stringify(registro));
    }, [registro]);

    const [contaPaga, setContaPaga] = useState(() => {
        const contaSalvo = localStorage.getItem("contaPaga");
        return contaSalvo ? JSON.parse(contaSalvo) : [];
    });

    useEffect(() => {
        localStorage.setItem("contaPaga", JSON.stringify(contaPaga));
    }, [contaPaga]);

    const [mensagemAlerta, setMensagemAlerta] = useState("");

    const calcularGastosTotais = () => {
        return contaPaga.reduce((total, item) => total + parseFloat(item.valor || 0), 0);
    };

    const calcularContasTotais = () => {
        return registro.reduce((total, item) => total + parseFloat(item.valor || 0), 0);
    };

    useEffect(() => {
        const totalGastos = calcularGastosTotais();
        if(atualizarGastosTotaisContas) {
            atualizarGastosTotaisContas(totalGastos);
        }
    }, [registro]) // Atualiza o valor total no componente pai

    useEffect(() => {
        const totalGastos = calcularGastosTotais();
        const valorRestante = valuesContas.limiteConta - totalGastos;

        const valorAlerta = valuesContas.limiteConta * 0.2;

        if (valuesContas.limiteConta < totalGastos) {
            setMensagemAlerta("ATENÇÃO: VALOR LIMITE ULTRAPASSADO!!!");
        } else if (valorRestante <= valorAlerta) {
            setMensagemAlerta("Atenção valor se aproximando do limite!");
        } else {
            setMensagemAlerta("");
        }
    }, [registro, valuesContas]);

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
            { motivo: gastosMotivo, valor: gastosContas, data: dataFormatada, dataLimite: new Date(dataLimiteConta).toLocaleDateString("pt-BR"), id: uuidv4()},
        ]);

        setGastosContas("");
        setGastosMotivo("");
        setDataLimiteConta("");
    };

    const totalGastos = calcularGastosTotais();
    const valorRestante = valuesContas.limiteConta
        ? valuesContas.limiteConta - totalGastos
        : 0;

        const PagandoContas = (id) => {
            const itemIndex = registro.findIndex((registro) => registro.id === id);
        
            if (itemIndex !== -1) {
                const parcela = registro[itemIndex];
        
                setContaPaga((prevContaPaga) => [
                    ...prevContaPaga,
                    {
                        motivo: `Pagamento Conta: ${parcela.motivo}`,
                        valor: parcela.valor,
                        data: new Date().toLocaleDateString("pt-BR"),
                    },
                ]);
        
                setRegistro((prevRegistro) =>
                    prevRegistro.filter((registro) => registro.id !== id)
                );
            }
        };

        const totalContas = calcularContasTotais();

    return (
        
        <TodoInicio>
            <p>Não esqueça de registrar todas as contas!</p>

            <form onSubmit={PegandoInformacoes}>
                <Alinhar>
                    <h3>Quanto foi o gasto?</h3>
                    <input
                        type="number"
                        onChange={(e) => setGastosContas(e.target.value)}
                        value={gastosContas}
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

                <Alinhar>
                    <h3>Qual o prazo de pagamento?</h3>
                    <input
                        type="date"
                        onChange={(e) => setDataLimiteConta(e.target.value)}
                        value={dataLimiteConta}
                    />
                </Alinhar>

                <button>Confirmar</button>
            </form>

            <Registros>
                <div style={{ display: "flex", justifyContent: "space-around", marginTop: "30px" }}>
                    
                    <button
                        style={{
                            background: "#ea4444e9",
                        }}
                        onClick={() => { setRegistro([]);
                            localStorage.removeItem("registro");
                            }}
                    >
                        Apagar Contas Pendentes
                    </button>

                    <h3 style={{ marginTop: "40px", marginLeft: "10px" }}>
                        Registros de Contas:
                    </h3>

                    <button
                        style={{
                            background: "#ea4444e9",
                        }}
                        onClick={() => { setContaPaga([]);
                            localStorage.removeItem("contaPaga");
                            }}
                    >
                        Apagar Contas Pagas
                    </button>
                </div>
            </Registros>

            <h5 style={{margin: "0"}}>*Para registrar o pagamento clique no botão de confirmação*</h5>

            <Informativo>
                <p>
                    <strong>Valor Limite:</strong> R${valuesContas.limiteConta}
                </p>
                <p>
                    <strong>Valor gasto até o momento:</strong> R${totalGastos}
                </p>
                <p>
                    <strong>Total não pago:</strong> R${totalContas}
                </p>
                <p>
                    <strong>Restante:</strong> R${valorRestante}
                </p>
            </Informativo>

            {mensagemAlerta && <p style={{color: "#e9c6c6", marginBottom: "12px", fontSize: "1.1rem", font: "bolder", background: "#d02424", width: "80%", margin: "auto", padding: "2px", borderRadius: "5px"}}>{mensagemAlerta}</p>}

            <div>
                {registro.map((item, index) => (
                    <Informacoes key={`registro-${index}`}>
                        <p>
                            <strong>Motivo:</strong> {item.motivo} | <strong>Gasto:</strong> R${" "}
                            {item.valor} | <strong>Data de Registro:</strong> {item.data} | <strong>Data Limite Para Pagamento:</strong> {item.dataLimite}{" "}
                            <img src={check} alt="Ícone de check" onClick={() => PagandoContas(item.id)} />
                        </p>
                    </Informacoes>
                ))}
                {contaPaga.map((item, index) => (
                    <InformacoesContas key={`contaPaga-${index}`}>
                        <p>
                            <strong>Motivo:</strong> {item.motivo} | <strong>Gasto:</strong> R${" "}
                            {item.valor} | <strong>Data do Pagamento:</strong> {item.data}
                        </p>
                    </InformacoesContas>
                ))}
            </div>

        </TodoInicio>
    );
};

export default DefinirContas;
