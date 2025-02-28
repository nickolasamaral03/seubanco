import { useState, useEffect } from "react";
import styled from "styled-components";
import check from '../Icons/check-mark.png';
import { v4 as uuidv4 } from 'uuid';

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

    h5{
        padding: 20px;
        color: #e0cfcf;
        font-size: 1rem;
        padding-bottom: 35px;
    }

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

        form{
            h3{
                font-size: 0.85rem;
            }
        }

        h5{
            font-size: 0.9rem;
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
            font-size: 0.7rem;
        }

        input{
            width: 150px;
        }
    }
`;

const Lidando = styled.div`
@media (max-width: 768px){
    h3{
        margin-right: 2px;
    }
    input{
        margin-left: -24px ;
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

    p {
        color: #d8eab0;
    }
`;

const InformacoesParcelas = styled.div`
    display: flex;
    margin: auto;
    text-align: center;
    justify-content: center;
    max-width: 500px;
    background-color: #00000022;
    margin-bottom: 10px;


    p {
        color: #e6dbdb;
    }

    img{
        width: 25px;
        height: 25px;
        margin-left: 8px;
        cursor: pointer;
    }
`;

const AdicionarBorda = styled.div`
    border-bottom: 2px solid white; 
    margin-top: 30px;
    margin-bottom: 30px;
`

const LidandoButton = styled.div`
    button{
            background: #ea4444e9;
            height: 35px;
            font-size: 0.80rem;
            margin-top: 33px;
    }
    @media (max-width: 768px){
        margin-left: 10px;
        button{
            font-size: 0.6rem;
        }

        h3{
            font-size: 0.8rem;
        }
    }
`

const DefinirDividas = ({ valuesDividas, atualizarGastosTotaisDivida }) => {
    const [gastosDividas, setGastosDividas] = useState("");
    const [gastosMotivo, setGastosMotivo] = useState("");
    const [registro, setRegistro] = useState(() => {
        const registroSalvo = localStorage.getItem("registroDividas");
        return registroSalvo ? JSON.parse(registroSalvo) : [];
    });

    const [valorParcelas, setValorParcelas] = useState("");
    const [dataParcelas, setDataParcelas] = useState("");
    const [quantidadeParcelas, setQuantidadeParcelas] = useState("");
    const [motivoParcelas, setMotivoParcelas] = useState("");

    const [registroParcelas, setRegistroParcelas] = useState(() => {
        const registroSalvoParcelas = localStorage.getItem("registroParcelas");
        return registroSalvoParcelas ? JSON.parse(registroSalvoParcelas) : [];
    })

    useEffect(() => {
        localStorage.setItem("registroParcelas", JSON.stringify(registroParcelas));
    }, [registroParcelas]);

    useEffect(() => {
        localStorage.setItem("registroDividas", JSON.stringify(registro));
    }, [registro]);

    const [mensagemAlerta, setMensagemAlerta] = useState("");

    const calcularGastosTotais = () => {
        return registro.reduce((total, item) => total + parseFloat(item.valor || 0), 0);
    };

    useEffect(() => {
        const totalGastos = calcularGastosTotais();
        if(atualizarGastosTotaisDivida) {
            atualizarGastosTotaisDivida(totalGastos);
        }
    }, [registro]) // Atualiza o valor total no componente pai


    useEffect(() => {
        const totalGastos = calcularGastosTotais();
        const valorRestante = valuesDividas.limiteDivida - totalGastos;

        const valorAlerta = valuesDividas.limiteDivida * 0.2;

        if (valuesDividas.limiteDivida < totalGastos) {
            setMensagemAlerta("ATENÇÃO: VALOR LIMITE ULTRAPASSADO!!!");
        } else if (valorRestante <= valorAlerta) {
            setMensagemAlerta("Atenção valor se aproximando do limite!");
        } else {
            setMensagemAlerta("");
        }
    }, [registro, valuesDividas]);

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
            { motivo: gastosMotivo, valor: gastosDividas, data: dataFormatada },
        ]);

        setGastosDividas("");
        setGastosMotivo("");
    };

    const PegandoInformacoesDasParcelas = (evento) => {
        evento.preventDefault();

        const dataFormatada = new Date(dataParcelas).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });

        setRegistroParcelas((prevRegistroParcelas) => [
            ...prevRegistroParcelas,
            { valorParcelas, dataFormatada, quantidadeParcelas, motivoParcelas, id: uuidv4() },
        ]);

        setValorParcelas("");
        setDataParcelas("");
        setQuantidadeParcelas("");
        setMotivoParcelas("");
    }

    

    const PagandoParcelas = (id) => { 
        console.log("Pagando parcelas");

        const parcelaIndex = registroParcelas.findIndex((parcela) => parcela.id === id);
        
        if(parcelaIndex !== -1) {
            const parcela = registroParcelas[parcelaIndex]

            setRegistro((prevRegistro) => [
                ...prevRegistro,
                { motivo: `Pagamento parcela: ${parcela.motivoParcelas}`, valor: parcela.valorParcelas, data: new Date().toLocaleDateString("pt-BR") },
            ]);

            const parcelasAtualizadas = [...registroParcelas];
            parcelasAtualizadas[parcelaIndex].quantidadeParcelas -= 1; // decrementa a quantidade de parcelas

            if(parcelasAtualizadas[parcelaIndex].quantidadeParcelas === 0) {
                parcelasAtualizadas.splice(parcelaIndex, 1); // remove a parcela da lista
            }

            setRegistroParcelas(parcelasAtualizadas);

        }
    }

    const totalGastos = calcularGastosTotais();
    const valorRestante = valuesDividas.limiteDivida
        ? valuesDividas.limiteDivida - totalGastos
        : 0;

    return (
        <TodoInicio>
            <p>Não esqueça de registrar todas as dívidas!</p>

            <form onSubmit={PegandoInformacoes}>
                <Alinhar>
                    <h3>Quanto foi o gasto? (valor total)</h3>
                    <input
                        type="number"
                        onChange={(e) => setGastosDividas(e.target.value)}
                        value={gastosDividas}
                    />
                </Alinhar>

                <Alinhar>
                    <h3>Com o que foi?</h3>
                    <input
                        type="text"
                        onChange={(e) => setGastosMotivo(e.target.value)}
                        value={gastosMotivo}
                    />
                </Alinhar>
                <button>Confirmar</button>
            </form>

            <AdicionarBorda/>

            <form onSubmit={PegandoInformacoesDasParcelas}>
                <h3>Se a dívida houve parcelamento do valor total registre aqui:</h3>
                <Alinhar style={{marginTop: "50px"}}>
                    <h3 style={{fontSize: "1rem"}}>Com o que foi gasto?</h3>
                    <input type="text" onChange={(e) => setMotivoParcelas(e.target.value)} value={motivoParcelas}/>
                </Alinhar>

                <Alinhar>
                    <h3 style={{fontSize: "1rem"}}>Qual é o valor da parcela?</h3>
                    <input type="number" onChange={(e) => setValorParcelas(e.target.value)} value={valorParcelas}/>
                </Alinhar>

        <Lidando>
                <Alinhar>
                    <h3 style={{fontSize: "0.85rem"}}>Até que dia é o vencimento da parcela?(Coloque até que dia, mês e ano foi feito a parcela )</h3>
                    <input type="date" onChange={(e) => setDataParcelas(e.target.value)} value={dataParcelas}/>
                </Alinhar>

                <Alinhar>
                    <h3 style={{fontSize: "1rem"}}>Em quantas parcelas foi feita?</h3>
                    <input type="number" onChange={(e) => setQuantidadeParcelas(e.target.value)} value={quantidadeParcelas}/>
                </Alinhar>
        </Lidando>

                <button>Confirmar</button>
            </form>

        <LidandoButton>
            <div style={{ display: "flex", justifyContent: "space-around", marginTop: "20px" }}>
                <button
                    onClick={() => { setRegistro([]);
                        localStorage.removeItem("registro");
                        }}
                >
                    Apagar Dívidas
                </button>

                <h3 style={{ marginTop: "40px" }}>
                    Registros de Dívidas:
                </h3>

                <button
                    onClick={() => {setRegistroParcelas([])
                        localStorage.removeItem("registroParcelas")
                    }}
                >
                    Apagar Parcelas Pagas
                </button>
            </div>
            </LidandoButton>

            <Informativo>
                <p>
                    <strong>Valor Limite:</strong> R${valuesDividas.limiteDivida}
                </p>
                <p>
                    <strong>Valor gasto até o momento:</strong> R${totalGastos}
                </p>
                <p>
                    <strong>Restante:</strong> R${valorRestante}
                </p>
            </Informativo>

            <h5 style={{margin: "0"}}>*Para registrar o pagamento clique no botão de confirmação*</h5>

            {mensagemAlerta && <p style={{color: "#e9c6c6", marginBottom: "30px", fontSize: "1.1rem", font: "bolder", background: "#d02424", width: "80%", margin: "auto", padding: "2px", borderRadius: "5px"}}>{mensagemAlerta}</p>}

            <div>
            {registroParcelas.map((registroParcelas, index) => (
                <InformacoesParcelas key={index}>
                        <p>
                            <strong>Motivo: {registroParcelas.motivoParcelas}</strong> | <strong>Valor da parcela:</strong> R$ {registroParcelas.valorParcelas} | <strong>Data do vencimento:</strong> {registroParcelas.dataFormatada} | <strong>Quantidade de parcelas:</strong> {registroParcelas.quantidadeParcelas} <img src={check} alt="" onClick={() => PagandoParcelas(registroParcelas.id)}/>
                        </p>
                    </InformacoesParcelas>
                ))}

                {registro.map((registro, index) => (
                    <Informacoes key={index}>
                        <p>
                            <strong>Motivo: {registro.motivo}</strong> | <strong>Gasto: R${" "}
                            {registro.valor}</strong> | <strong>Data: {registro.data}</strong>
                        </p>
                    </Informacoes>
                ))}
            </div>
        </TodoInicio>
    );
};

export default DefinirDividas;



