package org.backend.backend.repositories;

import org.backend.backend.model.submissions;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface Submission extends MongoRepository<submissions,String> {

}
