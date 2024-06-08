package org.backend.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document
public class Materials {
    @Id
    private String id;

    private String title;

    private String description;

    private List<String> urls;

    private List<String> file_names;

    private String class_id;

    private String code;


    public Materials(String title, String description, List<String> urls, List<String> fileNames, String class_id, String code) {
        this.title = title;
        this.description = description;
        this.urls = urls;
        file_names = fileNames;
        this.class_id = class_id;
        this.code = code;
    }

    public Materials() {
    }

    @Override
    public String toString() {
        return "Materials{" +
                "id='" + id + '\'' +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", urls=" + urls +
                ", file_names=" + file_names +
                ", class_id='" + class_id + '\'' +
                ", code='" + code + '\'' +
                '}';
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getClass_id() {
        return class_id;
    }

    public void setClass_id(String class_id) {
        this.class_id = class_id;
    }

    public Materials(String code) {
        this.code = code;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<String> getUrls() {
        return urls;
    }

    public void setUrls(List<String> urls) {
        this.urls = urls;
    }

    public List<String> getFile_names() {
        return file_names;
    }

    public void setFile_names(List<String> file_names) {
        this.file_names = file_names;
    }


}
