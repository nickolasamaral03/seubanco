const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization")

    if(!token){
        return res.status(401).json({msg: "Acesso Negado! Token não forcecido"})
    }

    try{
        const decoded = jwt.verify(token, process.env.SECRET)
        req.user = decoded.user // Adiciona os dados do usuário ao request
        next()
    } catch(error){
        res.status(401).json({msg: "Token inválido ou expirado!"})
    }
}

module.exports = authMiddleware

