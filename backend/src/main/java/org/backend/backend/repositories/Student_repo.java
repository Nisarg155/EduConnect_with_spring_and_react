package org.backend.backend.repositories;

import org.backend.backend.model.Student;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface Student_repo
        extends MongoRepository<Student,String> {
}
