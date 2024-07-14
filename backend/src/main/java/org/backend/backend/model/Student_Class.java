package org.backend.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document
public class Student_Class {
    @Id
    private String id;
    private List<String> codes;



    public Student_Class() {
    }

    public Student_Class(String id, List<String> codes) {
        this.id = id;
        this.codes = codes;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public List<String> getCodes() {
        return codes;
    }

    public void setCodes(List<String> codes) {
        this.codes = codes;
    }

    public void addCode(String code) {
        if(this.codes == null) {
            this.codes = new ArrayList<>();
        }
        this.codes.add(code);
    }

    public void removeCode(String code) {
        if(this.codes != null) {
            this.codes.remove(code);
        }
    }

    @Override
    public String toString() {
        return "Student_Class{" +
                "id='" + id + '\'' +
                ", codes=" + codes +
                '}';
    }
}
