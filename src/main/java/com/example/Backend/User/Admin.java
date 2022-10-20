package com.example.Backend.User;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Admin extends User {
    public Admin(String userName, String email, String password, String firstName, String lastName, Integer yearOfBirth, Integer monthOfBirth, Integer dayOfBirth, Float height, Float weight, String phoneNumber) {
        super(userName, email, password, firstName, lastName, yearOfBirth, monthOfBirth, dayOfBirth, height, weight, phoneNumber);
        super.setAdmin();
    }
}
