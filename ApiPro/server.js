const express = require('express')
const mongoose = require('mongoose')
// const dontenv = require('dotenv')
const cors = require('cors')
const authRoute = require('./routes/auth.js')
const path = require('path');

require('dotenv').config();

const app = express()

const _dirname = path.resolve()
app.use(express.static(path.join(_dirname, 'build')))

app.get('*', (req, res) => {
  res.sendFile(path.join(_dirname, 'build', "index.html"))
})

//middlewares
app.use(cors()) // Isso permite que aplicativos web clientes interajam com recursos de outros domínios
app.use(express.json())

const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASSWORD

mongoose
  .connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.xhgh1sg.mongodb.net/meubanco?retryWrites=true&w=majority&appName=Cluster0`)
  .then(() => {
    app.listen(5000, () => {
      console.log('Conectou com o banco de dados e o servidor está rodando na porta 5000');
    });
  })
  .catch((err) => {
    console.error('Erro ao conectar com o banco de dados:', err);
  });

  app.use("/auth", authRoute)

  // Falha de autenticação com o banco de dados MongoDB

  







