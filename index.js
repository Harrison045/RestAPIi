const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
let {createBankDetails,retrieveBankDetails,updateBankDetails,deleteBankDetails, createAccountDetails, listAccountDetails} = require("./controllers")

server = express();

server.use(bodyParser.json());

server.get('/banks/:id?',retrieveBankDetails)
server.post('/banks',createBankDetails)
server.put('/banks',updateBankDetails)
server.delete('/banks',deleteBankDetails)
//Account route and method
server.post('/account',createAccountDetails)
server.get('/account',listAccountDetails)

mongoose
  .connect(
    "mongodb+srv://odameharrison13:odorgonno2703@gen28.imehc.mongodb.net/?retryWrites=true&w=majority&appName=Gen28"
  )
  .then((result) => {
    server.listen(5000, "localhost", () =>
      console.log("server is live on port 5000")
    );
  })
  .catch((err) => err);
