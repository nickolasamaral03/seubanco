import { Link } from "react-router-dom"
import styled from "styled-components"
import notepad from "../Icons/note.png"

const TodoInicio = styled.div`
    margin: auto;
    text-align: center;
    justify-content: center;
    background: #617E75;
    max-width: 800px ;
    height: 450px ;

    p{
        color: white;
        padding: 25px;
        font-size: 1.4rem;
        margin: 45px 10px 5px 10px;
    }

    img{
        height: 30px;
        width: 30px;
        margin-right: 590px;
        margin-top: 10px;

    }

    @media (max-width: 768px){
        height: 520px;
        width: 380px;
        p{
            font-size: 1rem;
        }

        img{
            margin-right: 260px;
        }
    }
`

const Categoria = styled.div`
    background-color: #D9D9D9;
    padding: 10px;
    text-align: center;
    justify-content: center;
    margin: 16px 8px 0 8px;
    border-radius: 3px;
    cursor: pointer;

    @media (max-width: 768px){
        font-size: 0.8rem;
    }
`

const DefinindoCategorias = styled.div`
    display: flex;
    flex-wrap: wrap;
    max-width: 700px;
    margin-left: 95px;
    margin-top: 10px;

    @media (max-width: 768px){
        width: 350px;
        margin-left: 60px;
    }
`

const AdicionarBorda = styled.div`
    border-bottom: 2px solid white; 
    margin-top: 10px;
`

const InicioAcompanhar = () => {
    return(
        <TodoInicio>
            <p>Monitoramento de gastos: Sempre que você gastar com algo, clique na categoria correspondente ao gasto e registre, assim juntos vamos administrando.</p>
            <AdicionarBorda/>
                <Link to="/anotacao"><img src={notepad} alt="notepad icon"/></Link>
            <DefinindoCategorias>
                <Link to="/definirtotal" style={{ textDecoration: 'none', color: 'green'}}><Categoria>Gasto Total</Categoria></Link>
                <Link to="/definirmoradia" style={{ textDecoration: 'none', color: 'black'}}><Categoria>Moradia</Categoria></Link>
                <Link to="/definiralimentacao" style={{ textDecoration: 'none', color: 'black'}}><Categoria>Alimentação</Categoria></Link>
                <Link to="/definirtransporte" style={{ textDecoration: 'none', color: 'black'}}><Categoria>Transporte</Categoria></Link>
                <Link to="/definirsaude" style={{ textDecoration: 'none', color: 'black'}}><Categoria>Saúde</Categoria></Link>
                <Link to="/definireducacao" style={{ textDecoration: 'none', color: 'black'}}><Categoria>Educação</Categoria></Link>
                <Link to="/definircontas" style={{ textDecoration: 'none', color: 'black'}}><Categoria>Contas e Serviços</Categoria></Link>
                <Link to="/definirlazer" style={{ textDecoration: 'none', color: 'black'}}><Categoria>Lazer e Entretenimento</Categoria></Link>
                <Link to="/definirdivida" style={{ textDecoration: 'none', color: 'black'}}><Categoria>Divídas e Empréstimos</Categoria></Link>
                <Link to="/definirvestuario" style={{ textDecoration: 'none', color: 'black'}}><Categoria>Vestuário</Categoria></Link>
                <Link to="/definiroutros" style={{ textDecoration: 'none', color: 'black'}}><Categoria>Categorias Definidas</Categoria></Link>
            </DefinindoCategorias>

        </TodoInicio>
    )
}

export default InicioAcompanhar