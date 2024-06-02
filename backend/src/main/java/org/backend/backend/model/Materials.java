package org.backend.backend.model;

import com.google.j2objc.annotations.Property;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document
public class Materials {

    @Property
    private String title;
    @Property
    private String description;
    @Property
    private List<String> urls;
    @Property
    private String class_id;


    public Materials(String title, String description, List<String> urls, String class_id) {
        this.title = title;
        this.description = description;
        this.urls = urls;
        this.class_id = class_id;
    }

    @Override
    public String toString() {
        return "Materials{" +
                "title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", urls=" + urls +
                ", class_id='" + class_id + '\'' +
                '}';
    }

    public String getClass_id() {
        return class_id;
    }

    public void setClass_id(String class_id) {
        this.class_id = class_id;
    }

    public Materials() {
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


}
