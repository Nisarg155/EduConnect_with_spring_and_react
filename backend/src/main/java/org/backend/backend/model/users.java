package org.backend.backend.model;

public class users {
    private String uid;
    private String name;
    private String Role;

    public users() {
    }

    public String getRole() {
        return Role;
    }

    public void setRole(String role) {
        Role = role;
    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }



    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return Role;
    }

    public void setEmail(String Role) {
        this.Role = Role;
    }

    @Override
    public String toString() {
        return "users{" +
                "uid='" + uid + '\'' +
                ", name='" + name + '\'' +
                ", Role='" + Role + '\'' +
                '}';
    }
}
