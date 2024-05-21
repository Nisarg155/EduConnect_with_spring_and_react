package org.backend.backend.repositories;

import org.backend.backend.model.Classes;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface Class_repo extends MongoRepository<Classes , String> {

    @Query("{teacher_id: ?0}")
    List<Classes> findClassesByTeacher_id(String teacher_id);
}
