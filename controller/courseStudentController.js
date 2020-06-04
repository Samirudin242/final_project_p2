const {Student, Course, StudentCourse} = require('../models')

class StudentCourseController {
    static addCourse(req, res){
        Student.findAll({include: Course})
        .then(student =>{
            Course.findAll()
            .then(course => {
                // res.send(list)
                // res.send(data, list)
                res.render('addYourCourse', {student, course})
            })
            // res.send(data)
        }).catch(err => {
            // console.log(err)
            res.send(err);
        });
        // res.render('bookinformation')
    }

    static addCoursePost(req, res){
        StudentCourse.create({
            StudentId: Number(req.body.studentId),
            CourseId: Number(req.body.courseId),
        }).then(data =>{
            res.redirect('/course')
        })
    }
}

module.exports = StudentCourseController

