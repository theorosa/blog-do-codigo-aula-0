const blacklist = require('./blacklist')

const { promisify } = require('util')
const existsAsync = promisify(blacklist.exists).bind(blacklist)
const setAsync = promisify(blacklist.set).bind(blacklist)

const jwt = require('jsonwebtoken')
const { createHash } = require('crypto')

function geraToakenHash(token) {
    return createHash('sha256')
    .update(token)
    .digest('hex')
}

module.exports = {
    adiciona: token => {
        const dataExpiracao = jwt.decode(token).exp
        const tokenHash = geraToakenHash(token)
        await blacklist.setAsync(tokenHash, '')
        blacklist.expireat(tokenHash, dataExpiracao)
    },
    contemToken: token => {
        const tokenHash = geraToakenHash(token)
        const resultado = await blacklist.existsAsync(tokenHash)
        return resultado === 1
    }
}