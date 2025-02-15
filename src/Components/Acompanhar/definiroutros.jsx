import { useEffect, useState } from "react";
import styled from "styled-components"
import { v4 as uuid } from "uuid"

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
        padding: 20px;
        color: #75c866;
    }

    h3{
        color: white;
        font-size: 1.3rem;
        margin-top: 8px;
    }

    input{
    margin-right: 8px;
    text-decoration: none;
    outline: none;
    border-radius: 3px;
    height: 25px;
    border: none;
   }

   button{
    margin-top: 30px;
    padding: 8px;
    border-radius: 5px;
    background: #46ca4687;
    color: white;
    border: none;
    cursor: pointer;
   }

   li{
    margin-top: 20px;
    font-size: 1.05rem;
   }

   @media (max-width: 768px){
    p{
        font-size: 0.8rem;
    }

    button{
        font-size: 0.8rem;
    }
   }
`

const Alinhar = styled.div`
    display: flex;
    align-items: center; 
    gap: 30px; 
    margin-left: 30px;
    margin-top: 10px;

    @media (max-width: 768px){
        h3{
            font-size: 1rem;
        }

        input{
            width: 150px;
        }
    }
`

const Apagamento = styled.div`
display: flex;
margin: auto;
text-align: center;
justify-content: space-around;
margin-bottom: 10px;
margin-top: 25px;

button{
    background: #ea4444e9;
    height: 38px;
    margin-top: 33px;
    font-size: 0.80rem;

}

@media (max-width: 768px){
    justify-content: space-around;

    h3{
        font-size: 1rem;
    }

    button{
        font-size: 0.6rem;
    }
}
`

const Itens = styled.div`
    padding: 20px;
    color: #d8eab0;

    @media (max-width: 768px){
    font-size: 0.8rem;
}

`

const CadaCategoria = styled.div`
    background: #dfdcdc;
    margin-bottom: 30px;
    width: 500px;
    margin: auto;
    border-radius: 5px;
    margin-top: 8px;

    li{
        font-size: 1.02rem;
        padding: 6px 10px 6px 10px;
    }

    @media (max-width: 768px){
        width: 350px;
    li{
        font-size: 0.8rem;
    }
}
`

const DefinirOutros= ({ valuesOutros, atualizarGastosTotaisOutros, atualizarLimitesTotaisOutros }) => {
    const [valorConta, setValorConta] = useState("");
    const [motivoConta, setMotivoConta] = useState("");
    const [registroConta, setRegistroConta] = useState(() => {
        const localData = localStorage.getItem("dadosOutros");
        return localData ? JSON.parse(localData) : valuesOutros
    });

    const [registroContasDefinidas, setRegistroContasDefinidas] = useState(() => {
        const localData = localStorage.getItem("registroContasDefinidas");
        return localData ? JSON.parse(localData) : [];       
});

console.log(registroConta)

useEffect(() => {
    localStorage.setItem("dadosOutros", JSON.stringify(registroConta));
}, [registroConta]);

useEffect(() => {
    localStorage.setItem("registroContasDefinidas", JSON.stringify(registroContasDefinidas));
}, [registroContasDefinidas]);

    const [selectedItem, setSelectedItem] = useState(null);

    const handleItemClick = (item) => {
        setSelectedItem(item);
    }

    const PegandoContas = (evento) => {
        evento.preventDefault();

        setRegistroConta((prev) => 
        prev.map((item) =>
            item.id === selectedItem.id
            ? { ...item, valor: item.valor - Number(valorConta) } : item
            )
         );

         if(selectedItem){
          setRegistroContasDefinidas((prev) => [
              ...prev,
              { categoria: selectedItem.nome, nome: motivoConta, valor: valorConta, id: uuid() },
          ])}

          
        setValorConta("");
        setMotivoConta("");
        setSelectedItem(null);
    }

    

    const CalculasGastosTotaisOutros = () => {
        return registroContasDefinidas.reduce((total, item) => total + parseFloat(item.valor || 0), 0 )
    }

    const CalcularLimitesSalvos = () => {
        return registroConta.reduce((total, item) => total + parseFloat(item.valor || 0), 0 )
    }


    useEffect(() => {
        const gastosTotais = CalculasGastosTotaisOutros()
        if(atualizarGastosTotaisOutros){
            atualizarGastosTotaisOutros(gastosTotais)
        }
    }, [registroContasDefinidas])

    useEffect(() => {
        const limitesTotais = CalcularLimitesSalvos()
        if(atualizarLimitesTotaisOutros){
            atualizarLimitesTotaisOutros(limitesTotais)
        }
    }, [registroConta])

    return(
        <TodoInicio>
        
            <form onSubmit={PegandoContas}>
            <p>Não esqueça de registrar todas as contas!</p>
    
    <Alinhar>
            <h3>Quanto foi o gasto?</h3>
            <input type="text" onChange={(e) => setValorConta(e.target.value)} value={valorConta} required/>
    </Alinhar>

    <Alinhar>
            <h3>Com o que foi?</h3>
            <input type="text" onChange={(e) => setMotivoConta(e.target.value)} value={motivoConta} required/>
    </Alinhar>

        <button>Confirmar</button>
        </form>

<Apagamento>
                <button
                    onClick={() => {
                        setRegistroConta(() => {
                            localStorage.setItem("dadosOutros", JSON.stringify([]));
                            return [];
                        });
                    }}
                >
                    Apagar Categorias
                </button>
        
        <h3 style={{marginTop: "40px"}}>Registros:</h3>

                <button
                    onClick={() => { setRegistroContasDefinidas([]);
                    localStorage.removeItem("registroContasDefinidas");
                    }}
                >
                    Apagar Registros
                </button>
            </Apagamento>

        <p style={{margin: "0", padding: "0", marginBottom:"30px"}}>*Clique na categoria para definir o gasto*</p>

        <ul>
        {registroConta.map((item) => (
            <CadaCategoria>
          <li
          
          key={item.id}
          onClick={() => handleItemClick(item)}
          style={{ cursor: "pointer", color: selectedItem?.id === item.id ? "#aaba34df" : "#090b07e2" }}
          >
            <strong>Categoria:</strong> {item.nome} | <strong>Valor Restante:</strong> {item.valor},00 |{" "}
            <strong>Limite:</strong> {item.limite || "N/A"},00
          </li>
              </CadaCategoria>
        ))}
        </ul>

        {registroContasDefinidas.map((item) => (
          <div key={item.id}>
            <Itens>
            <strong>Categoria:</strong> {item.categoria} | <strong>Motivo:</strong> {item.nome} | <strong>Valor:</strong> R$ {item.valor},00
            </Itens>
          </div>
        ))}
        </TodoInicio>

    )
}

export default DefinirOutros
