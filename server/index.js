const express = require('express');
const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')


const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'banco',
    port: 3306,
    socketPath: '/tmp/mysql.sock',
    insecureAuth: true,
  });

  app.use(express.json());
  app.use(cors());
  app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send('TripFriends');
    });

//Teste da conexão
db.getConnection((err) => {
    if (err) {
      console.error('Erro ao conectar ao banco de dados:', err.message);
      return;
    }
    console.log('Conexão bem-sucedida ao banco de dados MySQL!');
  });

  //Criar uma viagem
  app.post("/trips", (req, res) => {
    const data_inicio = req.body.data_inicio;
    const data_fim = req.body.data_fim;
    const criador = req.body.criador;
    const país = req.body.país;
    const cidade = req.body.cidade;
    const local_hospedagem = req.body.local_hospedagem;

    db.query("INSERT INTO trip (data_inicio, data_fim, criador, país, cidade, local_hospedagem) VALUES (?, ?, ?, ?, ?, ?)",[data_inicio, data_fim, criador, país, cidade, local_hospedagem],
    (err, result) => {
        if (err) {
          console.error('Erro ao inserir viagem: ' + err);
          res.status(500).json({ error: 'Erro interno do servidor' });
          return;
        } 
      });
  });

  //listar viagens
  app.get("/trips", (req, res) => {
    db.query("SELECT trip.*, users.nome as criador_nome FROM trip INNER JOIN users ON trip.criador = users.id ORDER BY trip.data_inicio", (err, result) => {
        if (err) {
            console.error('Erro ao buscar viagens:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
        } else {
            res.status(200).json(result);
        }
    });
});

//Obter lista de viajantes
app.get("/tripviajantes/:tripId", (req, res) => {
    const trip_id = req.params.tripId; // Obtenha o valor da viagem dos parâmetros da URL

    db.query('SELECT users.nome, users.idade, users.email FROM viajantes JOIN users ON viajantes.viajante_id = users.id WHERE viajantes.trip_id = ?',
        [trip_id],
        (err, result) => {
            if (err) {
                console.log('Erro ao buscar viajantes' + err);
                res.status(500).send('Erro ao buscar viajantes'); 
                return;
            }

            res.json(result);
        }
    );
});

//Localizar user por id
app.get("/viajante/id/:userId", (req, res) => {
    const user_id = req.params.userId; 

    db.query('SELECT nome, idade FROM users WHERE id = ?',
        [user_id],
        (err, result) => {
            if (err) {
                console.log('Erro ao buscar viajante' + err);
                res.status(500).send('Erro ao buscar viajante'); 
                return;
            }

            res.json(result);
        }
    );
});


//adicionar viajante a uma viagem
app.post("/trips/:tripId/join", (req, res) => {
    const trip_id = req.params.tripId;
    const viajante_id = req.body.viajante_id;

    db.query('INSERT INTO viajantes (trip_id, viajante_id) VALUES (?, ?)',
        [trip_id, viajante_id],
        (err, result) => {
            if (err) {
                // Verifica se o erro é devido à violação da chave primária (código de erro 1062 para MySQL)
                if (err.code === 'ER_DUP_ENTRY') {
                    console.log('Erro ao inserir viajantes: Violation of primary key constraint');
                    return res.status(409).json({ msg: 'Viagem já possui esse viajante.' });
                } else {
                    console.log('Erro ao inserir viajantes: ' + err);
                    return res.status(500).json({ msg: 'Erro interno no servidor.' });
                }
            } else {
                console.log('Inserido com sucesso!');
                return res.status(200).json({ msg: 'Viajante adicionado à viagem com sucesso!' });
            }
        }
    );
});


//Registrar usuário
app.post("/register", (req, res)=>{
    const nome = req.body.nome;
    const idade = req.body.idade;
    const sexo = req.body.sexo;
    const email = req.body.email;
    const password = req.body.password;
    const telefone = req.body.telefone;
    const country = req.body.country;
    const cidade = req.body.cidade;

    db.query("SELECT * from users WHERE email = ?", [email], 
    (err, resultado) => {
        if (err) {
            res.send(err);
        }
        if(resultado.length == 0){
            db.query("INSERT INTO users (nome, idade, sexo, email, password, telefone, country, cidade) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [nome, idade, sexo, email,password, telefone, country, cidade], (err, resultado)=>{
                if(err){
                    res.send(err);
                }
                res.send({msg: "Cadastrado com sucesso!"});
            }
            );
        }else{
            res.send({msg: "Usuario já cadastrado!"});
        }
    });
});

//Fazer login
app.post("/login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try{
        const results = await db.query('SELECT * from users WHERE email = ? and password = ?', [email,password]);
        console.log(results[0]);
        console.log(results.length);

    if (results.length > 0) {
        const userId = results[0].id;
        res.status(200).json({ msg: 'Usuário logado com sucesso!', userId: userId });
    }else{
        res.status(401).json({ msg: 'Usuário e/ou senha inválidos' });
    }

    }catch(err){
        console.error('Erro ao fazer login:', err);
        res.status(500).json({ msg: 'Erro interno no servidor' });
    }
 
});


app.listen(3001, () => {
    console.log("rodando na porta 3001");
});