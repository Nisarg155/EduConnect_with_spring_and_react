package org.backend.backend.controllers;


import org.backend.backend.model.Classes;
import org.backend.backend.model.Student;
import org.backend.backend.model.Teacher;
import org.backend.backend.repositories.Class_repo;
import org.backend.backend.repositories.Teacher_repo;
import org.backend.backend.repositories.firebase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.backend.backend.repositories.Student_repo;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class controller {


    private final Teacher_repo teacher_repo;
    private final  Student_repo studentRepo;
    private final Class_repo class_repo;
    firebase fbs;

    @Autowired
    controller(Student_repo studentRepo, firebase fbs, Teacher_repo teacher_repo, Class_repo classRepo)
    {
        this.studentRepo = studentRepo;
        this.fbs = fbs;
        this.teacher_repo = teacher_repo;
        class_repo = classRepo;
    }



    @PostMapping("/student/create")
    public String create_new_student(@RequestBody Student student)
    {
        return (studentRepo.save(student)).getStudent_id();
     }

     @PostMapping("/teacher/create")
    public String create_new_teacher(@RequestBody Teacher teacher)
     {
         return  (teacher_repo.save(teacher)).getTeacher_id();
     }


    @PostMapping("/classes/create/{uid}")
    public ResponseEntity<List<Classes>> create_new_class(@RequestBody Classes classes , @PathVariable String uid) throws NoSuchElementException
    {
        Teacher teacher = teacher_repo.findById(uid).get(); // finds the teacher based on uid
        classes.setTeacher(teacher);
        class_repo.save(classes);

        Query query = new Query();
        query.addCriteria(Criteria.where("teacher.$id").is(uid));
        List<Classes> classesList,list_with_id;
        classesList = class_repo.findAll();
        list_with_id = classesList.stream().filter(
                c -> c.getTeacher().getTeacher_id().equals(uid)
        ).toList();
        for(Classes c : list_with_id)
        {
            System.out.println(c.toString());
        }
        return ResponseEntity.ok(list_with_id);


    }
//     @PostMapping("teacher/create")
//     public
//
//     @PostMapping()
//
//     @PostMapping("/create")
//     public String create(@RequestBody users u) throws ExecutionException, InterruptedException {
//         return fbs.create(u);
//     }
}
