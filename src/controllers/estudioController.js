const express = require("express")
const Estudio = require('../models/estudio')
const mongoose = require("mongoose")


const getAll = async (req, res) => {
    const estudios = await Estudio.find()
    res.json(estudios)
  }


const newStudio = async (req, res) => {
    const estudio = new Estudio({
     _id: new mongoose.Types.ObjectId(),
     nome: req.body.nome,
     criadoEm: req.body.criadoEm,
   })
   const estudioJaExiste = await Estudio.findOne({nome: req.body.nome})
   if (estudioJaExiste) {
     return res.status(409).json({error: 'Estudio ja cadastrado.'})
   }
   try{
     const novoEstudio = await estudio.save()
     res.status(201).json(novoEstudio)
   } catch(err) {
     res.status(400).json({ message: err.message})
   }
 }

 const updateOne = async (req, res) => {
   try {
     //tenta encontrar um estudio pelo id (vai buscar no banco de dados)
    const estudio = await Estudio.findById(req.params.id)
    //Se você não encontrar, me retorne o erro
    if (estudio == null) {
      return res.status(400).json({message: 'estudio não encontrado'})
    }
    //no corpo da requisição tem algo digitado, considere o que tiver digitado como minha alteração
    if (req.body.nome != null) {
      estudio.nome = req.body.nome
    }
    //já salvou?
    const estudioAtualizado = await estudio.save()
    //retornando o documento atualizado com o código de sucesso
    res.status(200).json(estudioAtualizado)
   } catch (err) {
     //se houve qualquer erro acima, mostre qual erro foi esse
     res.status(500).json({message: err.message})
   }
 }

 const deleteStudio = async (req, res) => {
  const estudio = await Estudio.findById(req.params.id)
  if(estudio == null) {
      return res.status(400).json({message: 'estudio não encontrado'})
  }
  estudio.deleteOne(
      {id: req.params.id},
      function (err) {
          if (err) {
              res.status(500).json({message: err.message})
          } else {
              res.status(200).json({message: 'Estudio deletado com sucesso' })
          }
      }
  )
}


module.exports = {
    getAll,
    newStudio,
    updateOne,
    deleteStudio
}