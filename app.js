import express from "express";

const app = express();
app.use(express.json());

const produto = [
    {
        id: 1,
        nome: "Caneta",
        descricao: "caneta para escrever com cores variadas",
        preco: 7.99,
        custo: 3.99
    },
    {
        id: 2,
        nome: "Caderno",
        descricao: "usado para expressar ideias, pensamento e conhecimentos",
        preco: 10.99,
        custo: 6.99
    },
    {
        id: 3,
        nome: "Borracha",
        descricao: "Apagar o que foi escrito errado ou refazer algo",
        preco: 1.99,
        custo: 0.99
    },
]

function buscarProduto(id) {
    return produto.findIndex(produto => {
        return produto.id === Number(id);
    })
}

app.route("/produto")
.get((req, res) => {
    res.status(200).json(produto);
    })
.post((req,res) =>{
    produto.push(req.body);
    res.status(201).send("Produto cadastrado com sucesso");
});
app.route("/produto/:id")
.get((req, res) => {
    const id = buscarProduto(req.params.id);
    res.status(200).json(produto[id]);
})
.put((req, res) => {
    const id = buscarProduto(req.params.id);
    produto[id].nome = req.body.nome;
    produto[id].descricao = req.body.descricao;
    produto[id].preco = req.body.preco;
    produto[id].custo = req.body.custo;
    res.status(200).json("Produto atualizado com sucesso");
})
.delete((req, res) => {
    const id = buscarProduto(req.params.id);
    if (produto[id]) {
        produto.splice(id, 1);
        res.status(200).send("Produto deletado com sucesso");
    } else {
        res.status(404).send("Produto não encontrado");
        
    }    
});


export default app;