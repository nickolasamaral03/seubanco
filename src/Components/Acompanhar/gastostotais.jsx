import styled from "styled-components"
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';

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

    p{
        color: white;
        margin: 25px;
        font-weight: 600;
        font-size: 1.05rem;
    }

    h3{
        color: white;
        margin: 25px;
        font-weight: 600;
        font-size: 1.4rem;
    }

    h4{
        color: #a0fa18;
        font-size: 1.18rem;
    }

    h2{
        color: white;
        margin-top: 90px;
        font-size: 1.6rem;
    }

    @media (max-width: 768px){
        background: #36602d5e;
        h3, h2{
            font-size: 1.1rem;
        }

        h4{
            font-size: 1rem;
        }

        p{
            font-size: 0.9rem;
        }
    }
`
const GastoTotal = ({valuesMoradia, valuesEducacao,valuesSaude, valuesLazer, valuesOutros, valuesTransportes, valuesDividas, valuesVestuario, valuesAlimentacao, valuesContas, valuesTotalSaude, valuesTotalEducacao, valuesTotalMoradia, valuesTotalLazer, valuesTotalTransporte, valeusTotalDivida, valuesTotalVestuario, valuesTotalAlimentacao, valuesTotalContas, valuesTotalOutros }) => {
    const TodosValues = [valuesMoradia.limiteMoradia, valuesEducacao.limiteEducacao,valuesSaude.limiteSaude, valuesLazer.limiteLazer, valuesTransportes.limiteTransporte, valuesDividas.limiteDivida, valuesVestuario.limiteVestuario, valuesAlimentacao.limiteAlimentacao, valuesContas.limiteConta, valuesOutros]
    const TodosGastos = [valuesTotalSaude, valuesTotalEducacao, valuesTotalMoradia, valuesTotalLazer, valuesTotalTransporte, valeusTotalDivida, valuesTotalVestuario, valuesTotalAlimentacao, valuesTotalContas, valuesTotalOutros]

    const calcularLimitesTotais = () => {
        return TodosValues.reduce((total, valor) => total + (parseFloat(valor) || 0), 0);
    };

    const calcularGastosTotais = () => {
        return TodosGastos.reduce((total, valor) => total + (parseFloat(valor) || 0), 0);
    }
    
    const valuesTotal = calcularGastosTotais();
    const totalLimites = calcularLimitesTotais();

    const data01 = [
        { name: 'Saúde', value: valuesTotalSaude },
        { name: 'Educação', value: valuesTotalEducacao },
        { name: 'Moradia', value: valuesTotalMoradia },
        { name: 'Lazer', value: valuesTotalLazer },
        { name: 'Transporte', value: valuesTotalTransporte },
        { name: 'Dívida', value: valeusTotalDivida },
        { name: 'Vestuário', value: valuesTotalVestuario },
        { name: 'Alimentação', value: valuesTotalAlimentacao },
        { name: 'Contas', value: valuesTotalContas },
        { name: 'Outras Categorias', value: valuesTotalOutros },
      ];

    return(
        <TodoInicio>
            {/* Se der ajustar mais a estilização */}
            <h3>Todos os gastos registrados:</h3>
            <h4>Limite Total: R${totalLimites} - Gasto Total: R${valuesTotal}</h4>
            <p>Educação: Gasto Total: R${valuesTotalEducacao} | Limite: R${valuesEducacao.limiteEducacao}</p>
            <p>Moradia: Gasto Total: R${valuesTotalMoradia} | Limite: R${valuesMoradia.limiteMoradia}</p>
            <p>Saúde: Gasto Total: R${valuesTotalSaude} | Limite: R${valuesSaude.limiteSaude}</p>
            <p>Lazer: Gasto Total: R${valuesTotalLazer}| Limite: R${valuesLazer.limiteLazer}</p>
            <p>Transporte: Gasto Total: R${valuesTotalTransporte} | Limite: R${valuesTransportes.limiteTransporte}</p>
            <p>Divida: Gasto Total: R${valeusTotalDivida} | Limite: R${valuesDividas.limiteDivida}</p>
            <p>Vestuario: Gasto Total: R${valuesTotalVestuario} | Limite: R${valuesVestuario.limiteVestuario}</p>
            <p>Alimentação: Gasto Total: R${valuesTotalAlimentacao} | Limite: R${valuesAlimentacao.limiteAlimentacao}</p>
            <p>Contas: Gasto Total: R${valuesTotalContas} | Limite: R${valuesContas.limiteConta}</p>
            <p>Outras Categorias: Gasto Total: R${valuesTotalOutros}</p>

            <h2>Gráfico com os gastos das categorias:</h2>
            <ResponsiveContainer width="100%" height="50%">
                <PieChart width={400} height={400}>
                <Pie
                    dataKey="value"
                    isAnimationActive={false}
                    data={data01}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#84d8b1"
                    label
                />
                <Tooltip />
                </PieChart>
        </ResponsiveContainer>
        </TodoInicio>

    )
}

export default GastoTotal