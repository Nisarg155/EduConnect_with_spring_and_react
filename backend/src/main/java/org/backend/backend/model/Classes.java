package org.backend.backend.model;

import com.google.j2objc.annotations.Property;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Optional;

@Document
public class Classes {
    @Id
    private String class_id;
    @Property("name")
    private String name;
    @Property
    private String description;
    @DBRef
    private Teacher teacher;

    public Classes() {

    }

    public String getClass_id() {
        return class_id;
    }

    public Classes(Teacher teacher) {
        this.teacher = teacher;
    }

    public void setClass_id(String class_id) {
        this.class_id = class_id;
    }



    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Teacher getTeacher() {
        return teacher;
    }

    public void setTeacher(Teacher teacher) {
        this.teacher = teacher;
    }

    @Override
    public String toString() {
        return "Classes{" +
                "id='" + class_id + '\'' +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", teacher=" + teacher +
                '}';
    }
}
