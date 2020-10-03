'use strict'

const fastify = require('fastify')({ logger: false, trustProxy: true })
const redis = require('redis').createClient({ host: 'localhost', port: 6379 })
const path = require('path')
require('dotenv').config()

fastify.register(require('fastify-static'), {
  root: path.join(__dirname, 'public'),
  prefix: '/public/',
})

fastify.get('/', async (request, reply) => {
  let { ip } = request
  let strTemplate = `New visitor ${ip}`
  redis.lpush("visitors", strTemplate)

  reply.sendFile('TeamBazinga.html')
})

// js and css files
fastify.get('/js/home', async function (request, reply) {
  reply.sendFile('bazinga.js')
})
fastify.get('/css/home', async function (request, reply) {
  reply.sendFile('bazinga.css')
})

// reveal Js -> https://revealjs.com/
fastify.get('/js/reveal', async function (request, reply) {
  reply.sendFile('/dist/reveal.js')
})
fastify.get('/css/revealReset', async function (request, reply) {
  reply.sendFile('/dist/reset.css')
})
fastify.get('/css/reveal', async function (request, reply) {
  reply.sendFile('/dist/reveal.css')
})
fastify.get('/css/revealDarkTheme', async function (request, reply) {
  reply.sendFile('/dist/theme/black.css')
})


const start = async () => {
  const { PORT } = process.env

  try {
    await fastify.listen(PORT)
    console.log(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()