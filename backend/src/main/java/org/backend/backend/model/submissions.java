package org.backend.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Document
public class submissions {
    @Id
    private  String id;
    private String class_code;
    private String assignment_id;
    private List<String> file_names;
    private List<String> urls;
    private Date sub_date;

    public submissions(String id, String class_code, String assignment_id, List<String> file_names, List<String> urls, Date sub_date) {
        this.id = id;
        this.class_code = class_code;
        this.assignment_id = assignment_id;
        this.file_names = file_names;
        this.urls = urls;
        this.sub_date = sub_date;
    }

    public submissions() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getClass_code() {
        return class_code;
    }

    public void setClass_code(String class_code) {
        this.class_code = class_code;
    }

    public String getAssignment_id() {
        return assignment_id;
    }

    public void setAssignment_id(String assignment_id) {
        this.assignment_id = assignment_id;
    }

    public List<String> getFile_names() {
        return file_names;
    }

    public void setFile_names(List<String> file_names) {
        this.file_names = file_names;
    }

    public List<String> getUrls() {
        return urls;
    }

    public void setUrls(List<String> urls) {
        this.urls = urls;
    }

    public Date getSub_date() {
        return sub_date;
    }

    public void setSub_date(Date sub_date) {
        this.sub_date = sub_date;
    }

    @Override
    public String toString() {
        return "submissions{" +
                "id='" + id + '\'' +
                ", class_code='" + class_code + '\'' +
                ", assignment_id='" + assignment_id + '\'' +
                ", file_names=" + file_names +
                ", urls=" + urls +
                ", sub_date=" + sub_date +
                '}';
    }
}
