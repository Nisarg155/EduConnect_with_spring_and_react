package org.backend.backend.controllers;


import org.backend.backend.model.testing;
import org.backend.backend.model.users;
import org.backend.backend.repositories.firebase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.backend.backend.repositories.Student_repo;

import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api")
public class controller {

    @Autowired
    Student_repo studentRepo;
    @Autowired
    firebase fbs;



    @PostMapping("/")
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

     @PostMapping("/create")
     public String create(@RequestBody users u) throws ExecutionException, InterruptedException {
         return fbs.create(u);
     }
}
