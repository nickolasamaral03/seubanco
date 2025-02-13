import styled from 'styled-components';
import { Link } from "react-router-dom"

const Titulo = styled.h1`
font-size: 2.34rem;
margin: 0;
padding: 25px;
color: #a0fa18;
cursor: pointer;

@media (max-width: 768px){
    font-size: 1.2rem;
    margin-top: 4px;
}
`
const TodoHeader = styled.div`
    display: flex;
    justify-content: space-around;
    background: #76b76f1c;
    margin-bottom: 10px;

    h2{
        color: white;
        margin-top: 34px;
        cursor: pointer;
        font-size: 1.3rem;
    }

    h2:hover{
        transition: 0.5s ease;
        color: #6ab770;
    }

    @media (max-width: 768px){
        h2{
            font-size: 0.8rem;
        }
    }
`



const Header = () => {
    return(
        <TodoHeader>
            
            <Link to="/inicio" style={{ textDecoration: 'none', color: 'black'}}><Titulo>SeuBolso</Titulo></Link>
            <Link to="/inicio" style={{ textDecoration: 'none', color: 'black'}}><h2>Definir Gastos</h2></Link>
            <Link to="/acompanhar" style={{ textDecoration: 'none', color: 'black'}}><h2>Monitorar Gastos</h2></Link>
        </TodoHeader>
    )
}

export default Header