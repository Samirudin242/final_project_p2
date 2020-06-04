const express = require('express')
const router = express.Router()
var multer = require('multer');
var path = require('path');
const HomeController = require('../controller/HomeController')
const CourseController = require('../controller/CourseController')
const StudentController = require('../controller/StudentController')
const courseStudentController = require('../controller/courseStudentController')
// 
const { Student } = require('../models')

//MULTER START

const storage = multer.diskStorage({
    destination : path.join(__dirname + './../public/images/'),
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now() +
        path.extname(file.originalname));
    }
});

//init upload
const upload = multer({
    storage : storage
}).single('picture');

router.get('/addPhoto/:id?', (req, res) =>{
    res.render('upload', {data: req.params})
})

router.post('/addPhoto/:id?', function(req, res){
    upload(req, res, err => {
        // res.send(req.file.filename)
        Student.update({
            path_photos: req.file.filename
        },{
            where:{
                id: Number(req.params.id)
            }
        }).then(data =>{
            res.redirect('/student')
        }).catch( err =>{
            res.send(err)
        })
     });
 });


//MULTER FINISH

router.get('/', HomeController.home)
router.get('/login', StudentController.loginForm)
router.post('/login', StudentController.login)
router.get('/register', StudentController.registerForm)
router.post('/register', StudentController.register)

router.get('/student/:id?', (req, res, next) => {
    if(req.session.isLogin == true){
        next()
    } else{
        res.redirect('/login')
    }
}, StudentController.show)

router.get('/user/:id?/edit', (req, res, next) =>{
    if(req.session.isLogin == true){
        next()
    } else{
        res.redirect('/login')
    }
} , StudentController.editForm)
router.post('/user/:id?/edit', StudentController.edit)
router.get('/user/:id?/delete', StudentController.delete)
router.get('/logout', StudentController.logout)

// //course
router.get('/course', (req, res, next) =>{
    if(req.session.isLogin == true){
        next()
    } else{
        res.redirect('/login')
    }
} , CourseController.show)
router.get('/course/add', (req, res, next) =>{
    if(req.session.isLogin == true){
        next()
    } else{
        res.redirect('/login')
    }
} , CourseController.addForm)
router.post('/course/add', CourseController.add)
router.get('/course/:id?/delete', CourseController.delete)

router.get('/addcourse', (req, res, next) =>{
    if(req.session.isLogin == true){
        next()
    } else{
        res.redirect('/login')
    }
} , courseStudentController.addCourse)
router.post('/addcourse', courseStudentController.addCoursePost)




module.exports = router