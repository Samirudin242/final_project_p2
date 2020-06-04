const {Student, Course, CourseUser} = require('../models')

class CourseController{
    static show(req, res){
        Course.findAll({
            include:[Student]
        })
        .then(data =>{
            // res.send(data)
            res.render('Course', {data})
        }).catch(err =>{
            res.send(err)
        })
    }

    static addForm(req, res){
        res.render('addCourseform')
    }

    static add(req, res){
        // res.send(req.body)
        Course.create({
            name: req.body.name,
            location: req.body.location,
        }).then(data =>{
            res.redirect('/course')
        }).catch(err =>{
            res.send(err)
        })
    }

    static delete(req, res){
        Course.destroy({
            where:{
                id:req.params.id
            }
        }).then(data =>{
            res.redirect('/Course')
        }).catch(err =>{
            res.send(err)
        })
    }

}

module.exports = CourseController