package controllers;


import model.students;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import repositories.Student_repo;

import java.util.List;

@RestController
public class controller {

    @Autowired
    Student_repo studentRepo;


    @GetMapping("/")
    public List<students> getAllStudents()
    {
        return studentRepo.findAll();
     }
}
