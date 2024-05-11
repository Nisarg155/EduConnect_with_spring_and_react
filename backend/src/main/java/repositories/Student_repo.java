package repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import model.students;

public interface Student_repo
        extends MongoRepository<students,String> {
}
