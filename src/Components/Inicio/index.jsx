import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import info from "../Icons/information.png"


const TodoInicio = styled.div`
    margin: auto;
    text-align: center;
    justify-content: center;
    background: #617E75;
    max-width: 800px ;
    height: 500px ;

    @media (max-width: 768px){
        width: 390px;
        height: 550px;
        overflow: hidden;
    }
`

const InicioDentro = styled.div`
   margin-right: 280px;
   padding-top: 20px;

   h2{
    color: white;
    margin-left: 21px;
    font-size: 1.5rem;
    margin-top: 5px;
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
    background: #CDEFD0;
    border-color: #CDEFD0;
    border-radius: 5px;
    margin-left: 10px;
   }

   p{
    font-size: 0.95rem;
    color: white;
    margin-left: 45px;
    color: #aad0aa;
   }

   img{
    width: 30px;
    height: 30px;
    margin-left: 15px;
    margin-bottom: 8px;
    cursor: pointer;
   }

   @media (max-width: 768px){
    margin: 0;

    h2{
        font-size: 1.1rem;
        margin-left: 0;
        margin-right: 60px;
    }

    p{
        font-size: 0.70rem;
    }

    button{
        width: 72px;
        font-size: 0.7rem;
    }

    img{
        width: 20px;
        height: 20px;
        margin-top: 5px;
    }
   }
`

const DefinindoCategorias = styled.div`
    display: flex;
    flex-wrap: wrap;
    max-width: 700px;
    margin-left: 95px;

    @media (max-width: 768px){
        width: 350px;
        margin-left: 50px;
    }
`

const Categoria = styled.div`
    background-color: #D9D9D9;
    padding: 10px;
    text-align: center;
    justify-content: center;
    margin: 20px 10px 0 10px;
    border-radius: 3px;
    cursor: pointer;

    @media (max-width: 768px){
        font-size: 0.8rem;
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

const Inicio = (props) => {
    const [mensagemSucesso, setMensagemSucesso] = useState("")
    const [renda, setRenda] = useState("")
    const [ rendaConfirmada, setRendaConfirmada] = useState("")
    
    const PegandoRenda = (evento) => {
        evento.preventDefault()

        const rendaConvertida = Number(renda);
         setRendaConfirmada(rendaConvertida)
         console.log(rendaConvertida)
        
        setMensagemSucesso("Renda inserida com sucesso!")
        
        props.PegandoRendadoUsuario({
           rendaConfirmada
        })
        
        setTimeout(() => {
            setMensagemSucesso("")
        }, 3000)

        setRenda("")
    }

    const [showToolTip, setShowToolTip] = useState(false)

    return (
        <TodoInicio>
            <InicioDentro>
            {mensagemSucesso && (
                    <Alerta className="alert alert-success" role="alert">
                    {mensagemSucesso}
                    </Alerta>
                )}
            <form onClick={PegandoRenda}>
            <h2>Qual é a sua renda média mensal?</h2>
            <p>(Caso tenha uma renda extra pode adicionar aqui também)</p>
            <input type="number" onChange={(e) => setRenda(e.target.value)} value={renda}/>
            <button>Confirmar</button>
            </form>
            <img src={info} alt="" onMouseEnter={() => setShowToolTip(true)} onMouseLeave={() => setShowToolTip(false)} />
            {showToolTip && (
                <p style={{fontSize: "0.8rem", color: "white", background: "#65b75c7c", borderRadius: "5px"}}>"Se precisar atualizar algum valor, clique em definir gasto na categoria correspondente e atualize com o novo valor"</p>
            )}

            <h2 style={{marginTop: "100px", marginRight: "70px"}}>Quanto é seu gasto com:</h2>
            </InicioDentro>

            <DefinindoCategorias>
                <Link to="/moradia" style={{ textDecoration: 'none', color: 'black'}}><Categoria>Moradia</Categoria></Link>
                <Link to="/alimentacao" style={{ textDecoration: 'none', color: 'black'}}><Categoria>Alimentação</Categoria></Link>
                <Link to="/transporte" style={{ textDecoration: 'none', color: 'black'}}><Categoria>Transporte</Categoria></Link>
                <Link to="/saude" style={{ textDecoration: 'none', color: 'black'}}><Categoria>Saúde</Categoria></Link>
                <Link to="/educacao" style={{ textDecoration: 'none', color: 'black'}}><Categoria>Educação</Categoria></Link>
                <Link to="/contas" style={{ textDecoration: 'none', color: 'black'}}><Categoria>Contas e Serviços</Categoria></Link>
                <Link to="/lazer" style={{ textDecoration: 'none', color: 'black'}}><Categoria>Lazer e Entretenimento</Categoria></Link>
                <Link to="/vestuario" style={{ textDecoration: 'none', color: 'black'}}><Categoria>Vestuário</Categoria></Link>
                <Link to="/dividas" style={{ textDecoration: 'none', color: 'black'}}><Categoria>Dívidas e Empréstimos</Categoria></Link>
                <Link to="/outros" style={{ textDecoration: 'none', color: 'black'}}><Categoria>Definir Gasto</Categoria></Link>  
            </DefinindoCategorias>
        </TodoInicio>
    )
}

export default Inicio

// passar corretamente a renda mensal para gastos totais