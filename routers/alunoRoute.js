import express from 'express'
import {listarAlunos, criarAluno} from '../controllers/alunoController.js'

const alunosRouter = express.Router()

alunosRouter.get('/alunos', async (req, res) => {
    try {
        const alunos = await listarAlunos()
        res.render('alunos', {alunos})
    }
    catch (err) {
        console.error(err)
        res.status(500).send('Erro ao listar lunos')
    }
})

alunosRouter.get('/alunos/novo', (req,res)=> {
    res.render('formulario-novo-aluno',{aluno: null, titulo: 'Novo aluno'})
})

alunosRouter.post('/alunos', async (req,res)=>{
    try{
        const resultado = await criarAluno(req,res)
        res.redirect('/alunos?sucesso=aluno criado com sucesso')
    }
    catch(err){
        console.error(err)
        res.status(500).render('formulario-novo-aluno',{
            aluno:req.body,
            titulo:'Novo aluno',
            erro: 'Erro ao criar aluno'+err.message
        })
    }
})


export default alunosRouter