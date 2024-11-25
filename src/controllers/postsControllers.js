import { getTodosPosts, criarPost } from "../models/postsModel.js";
import fs from "fs";

export async function listarPosts(req, res) {
    const posts = await getTodosPosts();
    res.status(200).json(posts);

};

export async function postarNovoPost(req, res) {
    const novoPost = req.body;
    try {
        const postCriado = await criarPost(novoPost);
        res.status(200).json(postCriado);
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({"erro": "falha"})
    }
    
}


export async function uploadImg(req, res) {
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    };
    try {
        const postCriado = await criarPost(novoPost);
        const imgAtualizada = `uploads/${postCriado.insertedId}.png`
        fs.renameSync(req.file.path, imgAtualizada)
        res.status(200).json(postCriado);
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({"erro": "falha"})
    }
    
}