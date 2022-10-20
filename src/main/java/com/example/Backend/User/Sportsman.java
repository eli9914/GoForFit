package com.example.Backend.User;
import com.example.Backend.Sports.Sports;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@Document
public class Sportsman extends User {
    private String level;
    private String sportName;
    private ArrayList<String> doneWorkouts;
    private int numOfdoneWorkouts;

    public Sportsman(String userName,
                     String email,
                     String password,
                     String firstName,
                     String lastName,
                     Integer yearOfBirth,
                     Integer monthOfBirth,
                     Integer dayOfBirth,
                     Float height,
                     Float weight,
                     String phoneNumber,
                     String level,
                     String sportName) {
        super(userName, email, password, firstName, lastName, yearOfBirth, monthOfBirth, dayOfBirth, height, weight, phoneNumber);
        super.setSportsman();
        this.level = level;
        this.sportName = sportName;
        doneWorkouts = new ArrayList<String>();
        numOfdoneWorkouts = 0;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public String getSport() {
        return sportName;
    }

    public void setSport(String sportName) {
        this.sportName = sportName;
    }

    public void setDoneWorkout(String url)
    {
        this.numOfdoneWorkouts++;
        this.doneWorkouts.add(url);
    }

    public  ArrayList<String> getDoneWorkouts() { return this.doneWorkouts; }
}
