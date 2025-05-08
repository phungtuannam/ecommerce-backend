const app = require("./src/app");
const PORT = 3005

const server = app.listen(PORT, () => {
    console.log(`WSV is listening on ${PORT}`)
})

process.on('SIGINT', () => {
    server.close(() => {console.log(`Exit Server Express`)});
})