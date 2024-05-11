package org.backend.backend.model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class testing
{
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    String id;
    private String name;

    @Override
    public String toString() {
        return "testing{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                '}';
    }

    public testing() {
    }
}
