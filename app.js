const express = require('express')
const app = express()
const port = 3000

let listaProdutos = [
    {
        id: 1,
        nome: "Produto 1",
        preco: 10.50
    },
    {
        id: 2,
        nome: "Produto 2",
        preco: 20.75
    },
];

app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/produtos', (req, res) => {
    res.json(listaProdutos);
  })

app.get('/produtos/:id', (req, res) => {
    const id = +req.params.id;
    
    let produto = listaProdutos.find((produto) => {
        return produto.id === id;
    })

    if(produto) {
        res.json(produto);
    }
    else {
        res.status(404).json({erro:"Produto nao encontrado"});
    }
})

app.post("/produtos", (req, res) => {
    const produto = req.body;

    listaProdutos.push(produto);    

    res.status(201).json(produto);

})

app.put('/produtos/:id', (req, res) => {
    const produtoPayload = req.body;
    const id = +req.params.id;

    for(let produto of listaProdutos){
        if(produto.id === id){
            produto.nome = produtoPayload.nome;
            produto.preco = produtoPayload.preco;
            res.json(produto);
            return;
        }
    }
    res.status(404).json({erro:"Produto nao encontrado"});
})

app.delete('/produtos/:id', (req,res) => {
    const id = +req.params.id;

    let indice = listaProdutos.findIndex((produto) => {
        return produto.id === id;
    })

    if(indice >= 0){
        res.json(listaProdutos.splice(indice, 1));
    }
    else{
        res.status(404).json({erro:"Produto nao encontrado"});
    }
    
})
  

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})