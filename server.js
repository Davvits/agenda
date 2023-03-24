require('dotenv').config();
//
const path = require('path')
const express = require('express');
const app = express();


//mongoose => serve pra formatar dados que vão para MongoDb
const mongoose =  require('mongoose')
mongoose.connect(process.env.CONECTIONSTRING)
    .then (() => {
        console.log('Mongoose conencted')
        app.emit('MongoStart')
    })
    .catch(e => console.log('erroConectingMoongose',e));


//Identificar o navegador do cliente/ clinte manda cookie e o DB reconhece o Browser

const session = require('express-session');

//MongoStore Serve pra Set as session no Banco de dados e não na memoria
const MongoStore = require('connect-mongo');

//mensagems destrutivas //salvas em sessões
const flash = require('connect-flash');
//segurança para eviitar injectar por terceiros
const helmet = require('helmet');
//cria tokens para formularios // Para que nenhum siite externo faça requisição
const csrf = require('csurf')

//routas da applicação / home/registro etc
const routes = require('./routes');

//middleWare são funções que no processo da Rota
const { middlewareGlobal,checkCsrfError,csrfMiddleware } = require('./src/middlewares/middleware')


app.use(helmet())

//Permitir postar formularios pra dentro da nossa aplicação
app.use(express.urlencoded({extended: true})); 
//Permitir Json
app.use(express.json()) 
//Arquivos que podem ser acessado diretamente "Diretorio Raiz"
//app.use(express.static(path.resolve(__dirname,'public')))
app.use(express.static("public"))



const sessionOptions = session({
    secret: 'udioiefhgvbfesarekwoamxhdftrhs()',
    store: new MongoStore({mongoUrl: process.env.CONECTIONSTRING}),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
})

app.use(sessionOptions)
app.use(flash())

//Configura diretorio de Views "Telas"
app.set('views', path.resolve(__dirname, 'src', 'views'))
//Configura o renderiador dos views
app.set('view engine', 'ejs')


app.use(csrf())

app.use(middlewareGlobal)
app.use(checkCsrfError)
app.use(csrfMiddleware)
app.use(routes)


app.on('MongoStart', ()=> { // espera o mongoose conectar
    app.listen(1830, () => {
        console.log('App Executexion')
    })
})


