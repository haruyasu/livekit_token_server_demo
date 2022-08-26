const express = require('express')
const cors = require('cors')
const livekitApi = require('livekit-server-sdk')
const bodyParser = require('body-parser')

const AccessToken = livekitApi.AccessToken

const app = express()
const port = 5000
const LIVEKIT_SERVER_KEY = 'xxxx'
const LIVEKIT_SERVER_SECRET = 'xxxx'

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Express Server')
})

app.post('/token', (req, res) => {
  const roomName = req.body.roomName
  const participantName = req.body.userName

  console.log(roomName, participantName)

  const at = new AccessToken(LIVEKIT_SERVER_KEY, LIVEKIT_SERVER_SECRET, {
    identity: participantName,
  })

  at.addGrant({
    roomJoin: true,
    room: roomName,
    canPublish: true,
    canPublishData: true,
    canSubscribe: true,
  })

  const token = at.toJwt()
  res.json(token)
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
