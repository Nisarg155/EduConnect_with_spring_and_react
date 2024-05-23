package org.backend.backend.controllers;


import org.backend.backend.model.Classes;
import org.backend.backend.model.Student;
import org.backend.backend.model.Teacher;
import org.backend.backend.repositories.Class_repo;
import org.backend.backend.repositories.Teacher_repo;
import org.backend.backend.repositories.Student_repo;
import org.backend.backend.repositories.firebase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Random;

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

    public String generateRandomCode() {
        int leftLimit = 48; // '0'
        int rightLimit = 122; // 'z'

        // Exclude characters that are not alphanumeric
        int excludedCharCount = rightLimit - 57 + 1; // Range of non-alphanumeric characters (from ':' to '[')
        rightLimit -= excludedCharCount;

        int length = 8;
        Random random = new Random();
        StringBuilder builder = new StringBuilder(length);

        while (builder.length() < length) {
            int randomLimitedInt = leftLimit + (int) (random.nextDouble() * (rightLimit - leftLimit + 1));
            char c = (char) randomLimitedInt;

            // Ensure character is alphanumeric before appending
            if (Character.isLetterOrDigit(c)) {
                builder.append(c);
            }
        }

        return builder.toString();
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


     @DeleteMapping("/classes/delete/{code}/{uid}")
     public ResponseEntity<List<Classes>> delete_class(@PathVariable String code , @PathVariable String uid)
     {
         class_repo.deleteById(code);
         return ResponseEntity.ok(class_repo.findClassesByTeacher_id(uid));
     }

    @PostMapping("/classes/create/{uid}/{name}")
    public ResponseEntity<List<Classes>> create_new_class(@RequestBody Classes classes , @PathVariable String uid , @PathVariable String name) throws NoSuchElementException
    {
         // finds the teacher based on uid
        classes.setTeacher_id(uid);
        classes.setTeacher_name(name);
        String code = generateRandomCode();
        while(class_repo.findById(code).isPresent())
        {
            code = generateRandomCode();
        }
        classes.setClass_id(code);
        class_repo.save(classes);


        List<Classes> classesLis ;
        classesLis = class_repo.findClassesByTeacher_id(uid);
        return ResponseEntity.ok(classesLis);
    }



    @GetMapping("/classes/get_all/{uid}/{role}")
    public ResponseEntity<List<Classes>> get_all_classes(@PathVariable String uid, @PathVariable String role)
    {
        List<Classes> classesList  ;
        if(role.equals("Teacher"))
        {
            classesList = class_repo.findClassesByTeacher_id(uid);
            return ResponseEntity.ok(classesList);
        }
        classesList = class_repo.findAll();
        return ResponseEntity.ok(classesList);
    }

    @PutMapping("/classes/edit")
    public ResponseEntity<List<Classes>> edit_class(@RequestBody Classes classes)
    {
        List<Classes> classesList;
        class_repo.save(classes);
        classesList = class_repo.findClassesByTeacher_id(classes.getTeacher_id());

        return ResponseEntity.ok(classesList);

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
