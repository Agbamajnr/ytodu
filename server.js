//require
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const ejs = require('ejs');
const Todo = require('./models/todo');
const app = express();

//connect mongodb
const dbURI = 'mongodb+srv://agbamajnr:brainbox@learn-node.tv0ge.mongodb.net/test-node?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
   .then((result) => app.listen(process.env.PORT || 3000))
   .catch((err) => console.log(err));

//settings
app.set('view engine', 'ejs');

//middleware and static files
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true}));

app.get('/' , (req , res)=>{

   res.redirect('/todos');

})

app.get('/todos' , (req , res)=>{
    Todo.find().sort( {createdAt: -1} )
        .then(result => {
            res.render('index', { todos: result });
        }).catch(err => {
            console.log(err);
        });

});

app.post('/todos', (req, res) => {
    
    const todo = new Todo(req.body);

    todo.save()
        .then(result => {
            res.redirect('/todos');
        }).catch(err => {
            console.log(err);
        });
});

app.get('/todos/:id', (req, res) => {
    const id = req.params.id;
    
    res.redirect('/todos');
})

app.delete('/todos/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);

    Todo.findByIdAndDelete(id)
        .then(result => {
            res.json()
        }).catch(err => {
            console.log(err);
        })
})
//404 routing

app.use((req, res) => {
    res.send('<h1>Page does not exist</h1>');
})