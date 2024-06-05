package org.backend.backend.repositories;

import org.backend.backend.model.Materials;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface Materials_repo extends MongoRepository<Materials, String> {

    @Query("{class_id: ?0}")
    List<Materials> findByClass_id(String class_id);

    @Query("{code: ?0 }")
    Materials findByCode(String code);


}
