const express = require("express");
const app = express();
const cors = require("cors");
const port = 5000;
const conn = require("./bd/conn");

//json response
app.use(express.json());

//solve cors
app.use(cors({ credentials: true, origin: `http://localhost:${port}` }));

app.use(express.static("public"));

//Routes
const home = require("./Controllers/home");
const UserRooutes = require("./Routes/UserRoutes");
const CompanyRoutes = require("./Routes/CompanyRoutes");
const CostumerRoutes = require("./Routes/CostumerRoutes");
const StatusRoutes = require("./Routes/statusRoutes");

app.use('/', home);
app.use("/user", UserRooutes)
app.use("/company", CompanyRoutes)
app.use("/costumer", CostumerRoutes);
app.use("/status",StatusRoutes)

//listening
conn
.sync(/*{ force: true }*/)
    .then(() => {
        app.listen(port, () => {
            console.log(`Aplicação executando em http://localhost:${port}`);
        })
    })
    .catch(function (err) {
        console.log("Erro ao Iniciar Aplicação: ", err);
     })
