const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/UserM.js')
const authMiddleware = require('../middlewares/authMiddleware.js')

require('dotenv').config();

const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).json({msg: "Rota de autenticação"})
})

router.get('/inicio', authMiddleware, (req, res) => {
    console.log(req.user)
})

// Register User
router.post('/register', async(req, res) => {
    const { nome, usuario, senha} = req.body

    if(!nome || !usuario || !senha){
        return res.status(400).json({msg: "Todos os campos são obrigatórios"})
    }
    // só será enviada quando receber esses três campos

    const userExist = await User.findOne({usuario})

    if(userExist){
        return res.status(422).json({msg: "Email já cadastrado!"})
    }

    try{
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(senha, salt)

        const newUser = new User({
            nome, 
            usuario, 
            senha: passwordHash
        })

        await newUser.save()
        res.status(201).json({msg: "Usuário cadastrado com sucesso!"})

    } catch(err){
        res.status(500).json({msg: "Aconteceu um erro ao salvar o usuário"})
    }
})

// Login User
router.post('/login', async(req, res) => {
    const {usuario, senha} = req.body

    if(!usuario || !senha){
        return res.status(400).json({ msg: "Todos os campos são obrigatórios" })
    }

    try{
        const user = await User.findOne({usuario})

        if(!user){
            return res.status(404).json({msg: "Usuário não encontrado"})
        }

        const passwordValid = await bcrypt.compare(senha, user.senha)

        if(!passwordValid){
            return res.status(401).json({msg: "Senha Inválida"})
        }

        const token = jwt.sign({id: user._id}, process.env.SECRET, {
            expiresIn: "2h"
        }) //JWT.sign é uma forma de assinar um JSON Web Token (JWT). A assinatura é um item fundamental para a autenticidade do token

        res.status(200).json({
            msg: "Login bem sucedido", token
        })

    } catch (err) {
        res.status(500).json({ msg: "Erro no servidor!", error: err.message });
      }
})

module.exports = router

// ERRO AO CADASTRAR? (BUG) - VERIFICAR
//  Problema era que: O .env estava de alguma forma invalidando nossa string de conexão, quando coloquei as credenciais direto na string funcionou.
// Possivelmente não tem problema de rotas no projeto, mas o server.js tem que tá rodando junto com o front para ter acesso ao banco de dados e assim não ter problema com o axios.
// Bug Atual: As informações estão indo para o banco de dados, tudo certo. Porém quando tento logar o usuario cadastrado, dar uma mensagem de "erro no servidor"
// Verificar Bug
// Parabéns pela evolução, Nickolas!

// O .env não estava instalado apropriadamente e estava dando problema, agora está tudo certo.
// Agora é lidar com o erro WebSocket e verificar como podemos dar o acesso ao usuario somente quando ele estiver logado.

// Conseguimos deixar aparecer o header quando usuario está logado, utilizando o layout que possue somente as rotas diferentes de "/" e "/cadastro", as outras rotas aparece normalmente o header.
// Precisaremos estilizar o login e cadastro ( devidamente estilizado e com logo e texto de apresentação)
// Parabéns pela evolução, Nickolas!


// Verificar pq os icones não estão aparecendo - URGENTE (agora estamos lidando com os arquivos do react no node e lidando com as rotas desconhecidas que carreguem no index.html e as rotas são diferentes 3000 e 5000)
// Colocar mensagens bonitas e tirar os alerts
// informar que as senhas devem ter nome e número


// Tentar ver depois questão do websocket as vezes dá erro no console e as vezes não, verificar o que está acontecendo.
// dar acesso somente com o login, sem outra manipulação (o acesso será somente tiver o token, quando o usuario não tiver não poderá manipular e ficará na parte de login)

//

// Organizar a tela para celulares

//


// Verificar também se está tudo certo segundo nosso Readme.md

