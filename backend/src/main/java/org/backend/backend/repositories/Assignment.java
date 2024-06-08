package org.backend.backend.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import java.util.List;

public interface Assignment extends MongoRepository<org.backend.backend.model.Assignment, String> {

    @Query("{ unique_code: ?0 }")
    org.backend.backend.model.Assignment findByUniqueCode(String uniqueCode);

    @Query("{ class_code: ?0 }")
    List<org.backend.backend.model.Assignment> findByClassCode(String classCode);
}
