const {Student, Room} = require('../models')
const {compare} = require('../helper/bcrypt')

class StudentController {
    static registerForm(req, res){
        res.render('registerform')
    }

    static register(req, res){
        if(req.body.password == req.body.passwordConfirm){
            Student.create({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                password: req.body.password,
                gender: req.body.gender,
                phone_number: req.body.phone_number
            }).then(data =>{
                res.redirect('login')
            })
        } else{
            res.send('Password Tidak Sama')
        }
        
    }

    static loginForm(req, res){
        res.render('loginForm')
    }
    
    static login(req, res){
        Student.findOne({where:{first_name:req.body.first_name}})
        .then(data => {
            if(compare(req.body.password,data.password)){
                req.session.isLogin = true
                res.redirect(`/student/${data.id}`)
            } else{
                res.send('password salah')
            }
        }).catch(err =>{
            res.send('Username salah')
        })
    }


    static logout(req, res) {
        req.session.destroy(function(err){
            if(err) {
                res.send(err)
            } else {
                res.redirect('/')
            }
        })
    }


    static show(req, res){
        Student.findAll()
        .then(data =>{
            res.render('Student', {data})
        }).catch(err => {
            res.send('anda belum login')
        })
    }

    static delete(req, res){
        Student.destroy({where: {id:req.params.id}})
        .then(data =>{
            res.redirect('/student')
        }).catch(err => {
            res.send(err)
        })
    }

    static editForm(req, res){
        Student.findByPk(req.params.id)
            .then(data =>{
                res.render('editStudentform', {data})
            }).catch(err => {
                res.send(err)
            })
    }

    static edit(req, res){
        // res.send(req.body)
        Student.update({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            phone_number: req.body.phone_number,
            gender: req.body.gender
        },{where:{
            id:req.params.id
        }}).then(data =>{
            res.redirect('/student')
        }).catch(err => {
            res.send(err)
        })
    }
}

module.exports = StudentController