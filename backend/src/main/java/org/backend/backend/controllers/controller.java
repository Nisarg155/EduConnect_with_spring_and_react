package org.backend.backend.controllers;


import org.backend.backend.model.Student;
import org.backend.backend.model.Teacher;
import org.backend.backend.model.users;
import org.backend.backend.repositories.Teacher_repo;
import org.backend.backend.repositories.firebase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.backend.backend.repositories.Student_repo;

import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class controller {


    private final Teacher_repo teacher_repo;
    Student_repo studentRepo;
    firebase fbs;

    @Autowired
    controller(Student_repo studentRepo, firebase fbs, Teacher_repo teacher_repo)
    {
        this.studentRepo = studentRepo;
        this.fbs = fbs;
        this.teacher_repo = teacher_repo;
    }



    @PostMapping("/student/create")
    public boolean save(@RequestBody Student student)
    {
        studentRepo.save(student);
        return true;
     }

     @PostMapping("/teacher/create")
    public boolean save(@RequestBody Teacher teacher)
     {
         teacher_repo.save(teacher);
         return true;
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
