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
        const salt = await bcrypt.genSalt(10)
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

