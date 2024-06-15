package org.backend.backend.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface StudentClass  extends MongoRepository<org.backend.backend.model.Student_Class,String> {


}
