package org.backend.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document
public class Classes {
    @Id
    private String class_id;
    private String name;
    
    private String description;
    
    private String teacher_id;
    
    private String teacher_name;
    private List<String> student_ids;
    private List<String> student_names;

    public List<String> getStudent_names() {
        return student_names;
    }

    public void setStudent_names(List<String> student_names) {
        this.student_names = student_names;
    }

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

    public String getTeacher_name() {
        return teacher_name;
    }

    public void setTeacher_name(String teacher_name) {
        this.teacher_name = teacher_name;
    }

    public List<String> getStudent_ids() {
        return student_ids;
    }

    public void setStudent_ids(List<String> student_ids) {
        this.student_ids = student_ids;
    }
    public void addStudent_id(String student_id) {
        if (this.student_ids == null) {
            this.student_ids = new ArrayList<>();
        }
        this.student_ids.add(student_id);
    }
    public void addStudent_name(String student_name) {
        if (this.student_names == null) {
            this.student_names = new ArrayList<>();
        }
        this.student_names.add(student_name);
    }
    public void removeStudent_id_and_Student_name(String student_id) {
        if (this.student_ids != null ) {
            int index = this.student_ids.indexOf(student_id);
            this.student_ids.remove(student_id);
            this.student_names.remove(index);
        }
    }


    @Override
    public String toString() {
        return "Classes{" +
                "class_id='" + class_id + '\'' +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", teacher_id='" + teacher_id + '\'' +
                ", teacher_name='" + teacher_name + '\'' +
                ", student_ids=" + student_ids +
                ", student_names=" + student_names +
                '}';
    }
}
