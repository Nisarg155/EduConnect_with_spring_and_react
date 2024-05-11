package org.backend.backend.repositories;

import org.backend.backend.model.testing;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface Student_repo
        extends MongoRepository<testing,String> {
}
