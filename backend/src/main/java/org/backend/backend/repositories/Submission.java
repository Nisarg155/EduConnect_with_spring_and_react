package org.backend.backend.repositories;

import org.backend.backend.model.submissions;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface Submission extends MongoRepository<submissions,String> {

    @Query("{ assignment_id: ?0 }")
    List<submissions> findByAssignmentId(String assignmentId);

    @Query("{ class_code: ?0 , student_id: ?1  }")
    List<submissions> findByClassCode(String classCode, String studentId);

    @Query("{student_id : ?0 , assignment_id :  ?1}")
    List<submissions> findByStudentId(String studentId, String assignmentId);

}
