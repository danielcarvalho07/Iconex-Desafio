const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const http = require('http');
const SECRET = "iconex_desafio"

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "`pug!wh.;z!:6AN(",
  database: "iconex",
});

app.use(express.json());
app.use(cors());

app.post("/registerCompanhia", (req, res) => {
  const email = req.body.email;
  const senha = req.body.senha;
  const name = req.body.name;
  const cnpj = req.body.cnpj;
  const cep = req.body.cep;

  db.query("SELECT * FROM companhias WHERE cnpj = ?", [cnpj], (error, results) => {
    console.log(results)
    if (error) {
      res.send(error);
    }
    if (results.length == 0) {
      bcrypt.hash(senha, saltRounds, (error, hash) => {
        db.query(
          "INSERT INTO companhias (email, senha, name, cnpj, cep) VALUE ('?', '?', '?', '?', '?')",
          [email, hash, name, cnpj, cep],
          (error, res) => {
            if (error) {
              res.send(error);
            }
            res.send({ msg: "Usuário cadastrado com sucesso" });
          }
        );
      });
    } else {
      res.send({ msg: "Email já cadastrado" });
    }
  });
});


app.post("/registerMotorista", (req, res) => {
  const email = req.body.email;
  const senha = req.body.senha;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const cpf = req.body.cpf;
  const carro = req.body.carro;
  const cep = req.body.cep;

  db.query("SELECT * FROM motoristas WHERE cpf = ?", [cpf], (error, results) => {
    if (error != null) {
      res.send(error);
      console.log(error)
      return 
    }
    if (results.length == 0) {
      bcrypt.hash(senha, saltRounds, (error, hash) => {
        db.query(
          "INSERT INTO motoristas (email, senha, firstName, lastName, cpf, carro, cep) VALUE ('?', '?', '?', '?', '?', '?')",
          [email, hash, firstName, lastName, cpf, carro, cep],
          (error, res) => {
            if (error) {
              res.send(error);
            }
            res.send({ msg: "Usuário cadastrado com sucesso" });
          }
        );
      });
    } else {
      res.send({ msg: "Email já cadastrado" });
    }
  });
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const senha = req.body.senha;

  db.query("SELECT * FROM motoristas WHERE email = ?", [email], (error, results) => {
    if (error) {
      res.send(error);
    }
    if (results.length > 0) {
      bcrypt.compare(senha, results[0].senha, (erroror, response) => {
        if (erroror) {
          res.send(erroror);
        }
        if (response) {
          const webtoken = jwt.sign({userId: A}, SECRET, { expiresIn: 1200 })
          return res.json({ auth: true, webtoken})
        } else {
          res.send({ msg: "Senha incorreta" });
        }
      });
    } else {
      res.send({ msg: "Usuário não registrado!" });
    }
  });
});



app.listen(3001, () => {
  console.log("rodando na porta 3001");
});