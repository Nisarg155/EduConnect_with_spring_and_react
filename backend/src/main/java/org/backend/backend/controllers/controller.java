package org.backend.backend.controllers;


import org.backend.backend.model.testing;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.backend.backend.repositories.Student_repo;

import java.util.List;

@RestController
@RequestMapping("/api")
public class controller {

    @Autowired
    Student_repo studentRepo;


    @PutMapping("/")
    public String save(@RequestBody testing s)
    {
        studentRepo.save(s);
        return "done";
     }

     @GetMapping("/get")
    public List<testing> get()
     {
         return studentRepo.findAll();
     }
}
