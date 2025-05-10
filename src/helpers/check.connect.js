const { default: mongoose } = require("mongoose");
const os = require('os')
const process = require('process')
const _SECOND = 5000

const countConnect = ()  =>{
    const numConnection = mongoose.connections.length
    console.log(`Number of connection :: ${numConnection}`)
}

//check over load
const checkOverLoad = () => {
   setInterval(() => {
     const numConnection = mongoose.connections.length
    const numCores = os.cpus().length
    const memoryUsage = process.memoryUsage().rss
    // 
    const maxConnection = numCores * 5
    console.log(`Active Connection:: ${numConnection}`)
    console.log(`Memory usage: ${memoryUsage / 1024 / 1024}`)
   },_SECOND)
}

module.exports = {
    countConnect,
    checkOverLoad
}