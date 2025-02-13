const mongoose = require('mongoose');

const UserAuth = mongoose.model('UserAuth', {
    nome: String,
    usuario: String,
    senha: String
})

module.exports = UserAuth;