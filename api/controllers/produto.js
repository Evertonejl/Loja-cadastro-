import { request, response } from "express";
import { db } from "../db.js";

export const getProdutos = (_, res) => {
    const q = 'SELECT * FROM produtos';

    db.query(q, (err, data) => {

        if (err) {
            return res.json(err)
        }
        return res.status(200).json(data)
    })
}

export const addProdutos = (request, response) => {
    const q = "INSERT INTO produtos(`nome`, `preco`, `estoque`, `fone`) VALUE(?)";

    const values = [
        request.body.nome,
        request.body.preco,
        request.body.estoque,
        request.body.fone
    ];
    console.log(values)
    console.log(request.body)

    db.query(q, [values], (error) => {
        if (error) return request.json(error)

        return response.status(200).json('Produto cadastrado com sucesso')
    });
};
export const updateProdutos = (request, response) => {

    const q = "UPDATE produtos SET `nome` = ?, `preco` = ?, `estoque` = ?, `fone` = ? WHERE `id` = ?";

    const values = [
        request.body.nome,
        request.body.preco,
        request.body.estoque,
        request.body.fone
    ];
    db.query(q, [...values, request.params.id ], (error) => {
        if(error) return response.json(error)

        return response.status(200).json('Produto atualizado com sucesso')
    })
}

export const deleteProduto = (request, response) => {
    const q = "DELETE FROM produtos WHERE `id` = ?";

    db.query(q, [request.params.id], (error) =>{
        if(error) return response.json(error);
        return response.status(200).json('Produto deletado com sucesso')
    })
}