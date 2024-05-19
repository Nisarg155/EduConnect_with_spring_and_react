package org.backend.backend.repositories;

import org.backend.backend.model.Classes;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface Class_repo extends MongoRepository<Classes , String> {
}
