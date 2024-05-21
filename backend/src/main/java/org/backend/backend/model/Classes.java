package org.backend.backend.model;

import com.google.j2objc.annotations.Property;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Classes {
    @Id
    private String class_id;
    @Property("name")
    private String name;
    @Property
    private String description;
    @Property
    private String teacher_id;
    @Property
    private String teacher_name;

    public Classes() {

    }

    public String getClass_id() {
        return class_id;
    }

    public Classes(String String) {
        this.teacher_id = String;
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

    public String getTeacher_id() {
        return teacher_id;
    }

    public void setTeacher_id(String teacher_id) {
        this.teacher_id = teacher_id;
    }

    @Override
    public String toString() {
        return "Classes{" +
                "id='" + class_id + '\'' +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", teacher_id=" + teacher_id + '\'' +
                ", teacher_name" + teacher_name +
                '}';
    }

    public String getTeacher_name() {
        return teacher_name;
    }

    public void setTeacher_name(String teacher_name) {
        this.teacher_name = teacher_name;
    }
}
