package org.backend.backend.repositories;

import org.backend.backend.model.Teacher;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface Teacher_repo extends MongoRepository<Teacher,String> {
}
