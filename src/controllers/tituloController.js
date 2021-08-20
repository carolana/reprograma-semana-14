const express = require("express")
const mongoose = require("mongoose")
const estudio = require("../models/estudio")
const Titulo = require("../models/titulo")


const todosTitulos = async (req, res) => {
    const titulos = await Titulo.find().populate('estudio')
    res.status(200).json(titulos)
}

const criarTitulo = async (req, res) => {
    const titulo = new Titulo ({
        _id: new mongoose.Types.ObjectId(),
        nome: req.body.nome,
        genero: req.body.genero,
        descricao: req.body.descricao,
        estudio: req.body.estudio,
        criadoEm: req.body.criadoEm
    })
    const tituloJaExiste = await Titulo.findOne({nome: req.body.nome})
    if(tituloJaExiste) {
        return res.status(409).json({error: 'Titulo já existe'})
    }
    try {
        const novoTitulo = await titulo.save()
        res.status(201).json(novoTitulo)

    } catch (err) {
        res.status(400).json({message: err.message})
    }
}

const getAllPixar = async (req, res) => {
    const titulos = await Titulo.find().populate('estudio')
    const tituloFiltrado = titulos.find(titulo => titulo.estudio.nome == "Pixar")
    res.json(tituloFiltrado)
}

const getAllMarvel = async (req, res) => {
    const titulos = await Titulo.find().populate('estudio')
    const tituloFiltrado = titulos.find(titulo => titulo.estudio.nome == "Marvel")
    res.status(200).json(tituloFiltrado)
}

const getAllGhibli = async (req, res) => {
    const titulos = await Titulo.find().populate('estudio')
    const tituloFiltrado = titulos.find(titulo => titulo.estudio.nome == "Ghibli")
    res.status(200).json(tituloFiltrado)
}

const updateTitle = async (req, res) => {
    try {
    const titulo = await Titulo.findById(req.params.id)
    if (titulo == null) {
        return res.status(400).json({message: 'titulo não encontrado'})
    }
    if (req.body.nome != null) {
        titulo.nome = req.body.nome
    }
    const tituloAtualizado = await titulo.save()
    res.status(200).json(tituloAtualizado)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

const deleteTitulo = async (req, res) => {
    const titulos = await Titulo.findById(req.params.id)
    if(titulos == null) {
        return res.status(400).json({message: 'titulo não encontrado'})
    }
    titulos.deleteOne(
        {id: req.params.id},
        function (err) {
            if (err) {
                res.status(500).json({message: err.message})
            } else {
                res.status(200).json({message: 'Titulo deletado com sucesso' })
            }
        }
    )
}

const updateAnything = async (req, res) => {
    const titulos = await Titulo.findById(req.params.id)
    titulos.findOne({id: titulos}, function (err, tituloFound) {
        if (err) {
            res.status(500).send({message: err.message})
        } else {
            if (tituloFound) {
                tituloFound.updateOne({id: titulos}, {$set: req.body}, function(err) {
                    if (err) {
                        res.status(500).send({message: err.message})
                    } else {
                        res.status(200).send({message: 'Registro alterado com sucesso'})
                    }
                })
            } else {
                res.status(404).send({message: 'Não há registros para serem atualizados com esse id'})
            }
        }
    })
}




module.exports = {
    todosTitulos,
    criarTitulo,
    getAllPixar,
    getAllMarvel,
    getAllGhibli,
    updateTitle,
    deleteTitulo,
    updateAnything
}