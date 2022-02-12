
const portAdress =  process.env.PORT || 3000

const express = require("express")
const app = express();
const cors = require('cors')
const appRoute = require("./appRoutes");



app.use(cors())
app.use(express.json({ extended: false, limit: '500mb' }))
app.use(express.urlencoded({ limit: '500mb', extended: false, parameterLimit: 500000 }))


app.use("/api", appRoute);

module.exports = app;


app.get("/", (req, res) => {
   return res.json({
       "Server Setup": "Node is connected",
       "baseURL" : "http://localhost:"+portAdress+"/"
   })
})

app.listen(portAdress, () => {
    console.log("Server Connected for "+portAdress);
})


