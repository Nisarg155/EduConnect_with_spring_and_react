package org.backend.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Assignment {
    @Id
    private String id;
    
    private String title;
    
    private String description;
    
    private String lastdate;
    
    private boolean latesubmisssion;
    
    private String unique_code;
    
    private String class_code;

    public Assignment( String title, String description, String lastdate, boolean latesubmisssion, String uniqueCode, String code) {
        this.title = title;
        this.description = description;
        this.lastdate = lastdate;
        this.latesubmisssion = latesubmisssion;
        unique_code = uniqueCode;
        class_code = code;
    }

    public Assignment() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public String getLastdate() {
        return lastdate;
    }

    public void setLastdate(String lastdate) {
        this.lastdate = lastdate;
    }

    public boolean isLatesubmisssion() {
        return latesubmisssion;
    }

    public void setLatesubmisssion(boolean latesubmisssion) {
        this.latesubmisssion = latesubmisssion;
    }

    public String getUnique_code() {
        return unique_code;
    }

    public void setUnique_code(String unique_code) {
        this.unique_code = unique_code;
    }

    public String getClass_code() {
        return class_code;
    }

    public void setClass_code(String class_code) {
        this.class_code = class_code;
    }

    @Override
    public String toString() {
        return "Assignment{" +
                "id='" + id + '\'' +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", lastdate=" + lastdate +
                ", latesubmisssion=" + latesubmisssion +
                ", unique_code='" + unique_code + '\'' +
                ", class_code='" + class_code + '\'' +
                '}';
    }
}
