package com.example.Backend.User;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;

@Document
public class Coach extends User{
    private String licenseNumber;
    private String workPlaceId;
    private String sportKind;
    private String[] beginnerWeeklySession;
    private String[] semiproWeeklySession;
    private String[] professionalWeeklySession;
    private String weeklyMotivation;
    private String[][] commonInjuries;
    private ArrayList<Integer> ratings;
    private int rating;

    public Coach(String userName,
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
                 String licenseNumber,
                 String workPlaceId,
                 String sportKind) {
        super(userName, email, password, firstName, lastName, yearOfBirth, monthOfBirth, dayOfBirth, height, weight, phoneNumber);
        super.setCoach();
        this.licenseNumber = licenseNumber;
        this.workPlaceId = workPlaceId;
        this.sportKind = sportKind;
        this.commonInjuries = new String[4][3];
        this.commonInjuries[0][0] = "Name";
        this.commonInjuries[0][1] = "Caused by";
        this.commonInjuries[0][2] = "Treatment";
        for (int i = 1;i<4;i++){
            for (int j=0;j<3;j++){
                this.commonInjuries[i][j] = "Coming Soon...";
            }
        }
        this.beginnerWeeklySession = new String[2];
        this.beginnerWeeklySession[0] = "url?";
        this.beginnerWeeklySession[1] = "description?";
        this.semiproWeeklySession = new String[2];
        this.semiproWeeklySession[0] = "url?";
        this.semiproWeeklySession[1] = "description?";
        this.professionalWeeklySession = new String[2];
        this.professionalWeeklySession[0] = "url?";
        this.professionalWeeklySession[1] = "description?";
        this.weeklyMotivation = "url?";
        ratings = new ArrayList<Integer>();
        rating = 0;
    }

    public String getLicenseNumber() {
        return licenseNumber;
    }

    public boolean check_licenseNumber_API()
    {
        String url = "https://practitionersapi.health.gov.il/Practitioners/api/Practitioners/GetLicenses?licenseNum=&maxResults=1000&professionId=10&practitionerName=&certificate=";
        RestTemplate restTemplate = new RestTemplate();
        String Licenses = restTemplate.getForObject(url,String.class);
        if(Licenses.contains(this.getLicenseNumber()))
            return true;
        else
            return false;
    }

    public void setLicenseNumber(String licenseNumber) {
        this.licenseNumber = licenseNumber;
    }

    public String getWorkPlaceId() {
        return workPlaceId;
    }

    public boolean check_workPlaceId_API()
    {
        String url = "https://data.gov.il/api/3/action/datastore_search?resource_id=2304b5de-c720-4b5c-bbc7-4cbab85e0ae8";
        RestTemplate restTemplate = new RestTemplate();
        String Facilities = restTemplate.getForObject(url,String.class);
        if(Facilities.contains(this.getWorkPlaceId()))
            return true;
        else
            return false;
    }

    public void setWorkPlaceId(String workPlaceId) {
        this.workPlaceId = workPlaceId;
    }

    public String getSportKind() {
        return sportKind;
    }

    public void setSportKind(String sportKind) {
        this.sportKind = sportKind;
    }

    public String[][] getCommonInjuries() {
        return commonInjuries;
    }

    public void setCommonInjury(String name,String causedBy,String treatment,int row) {
        if(row > 0 && row < 4) {
            this.commonInjuries[row][0] = name;
            this.commonInjuries[row][1] = causedBy;
            this.commonInjuries[row][2] = treatment;
        }
    }

    public String[] getBeginnerWeeklySession() {
        return beginnerWeeklySession;
    }

    public void setBeginnerWeeklySession(String url,String description) {
        this.beginnerWeeklySession[0] = url;
        this.beginnerWeeklySession[1] = description;
    }

    public String[] getSemiproWeeklySession() {
        return semiproWeeklySession;
    }

    public void setSemiproWeeklySession(String url,String description) {
        this.semiproWeeklySession[0] = url;
        this.semiproWeeklySession[1] = description;
    }

    public String[] getProfessionalWeeklySession() {
        return professionalWeeklySession;
    }

    public void setProfessionalWeeklySession(String url,String description) {
        this.professionalWeeklySession[0] = url;
        this.professionalWeeklySession[1] = description;
    }

    public String getWeeklyMotivation() {
        return weeklyMotivation;
    }

    public void setWeeklyMotivation(String url) {
        this.weeklyMotivation = url;
    }

    public int getRating() {
        return this.rating;
    }

    public void setRating(int rating) {
        this.ratings.add(rating);
        int sum = 0;
        for (int i = 0;i<ratings.size();i++)
        {
            sum += ratings.get(i);
        }
        this.rating = sum/ratings.size();
    }

}
