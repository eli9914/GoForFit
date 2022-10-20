package com.example.Backend.Unit;

import com.example.Backend.Sports.Sports;
import com.example.Backend.User.Admin;
import com.example.Backend.User.Coach;
import com.example.Backend.User.Sportsman;
import com.example.Backend.User.User;
import org.junit.Before;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;
import static org.junit.Assert.*;

@RunWith(MockitoJUnitRunner.class)

public class UserTest {
    @Mock
    Admin admin;
    Coach coach;
    Sportsman sportsman;


    @Before
    public void init() {
        MockitoAnnotations.openMocks(this);
    }


    @Test
    //@org.testng.annotations.Test
    public void testSettersAdmin() {
        //ADMIN
        admin = new Admin("tomerbe3", "tomerbe3@gmail.com", "tomer123", "Tomer", "Ben Shimol", 1996, 9, 19, 1.80F, 82F, "0524858601");
        admin.setUserName("matan15");
        assertTrue(admin.getUserName() == "matan15");
        admin.setPassword("12333");
        assertTrue(admin.getPassword() == "12333");
        admin.setEmail("matan123@gmail.com");
        assertTrue(admin.getEmail() == "matan123@gmail.com");
        admin.setFirstName("matan");
        assertTrue(admin.getFirstName() == "matan");
        admin.setLastName("Ben Ishay");
        assertTrue(admin.getLastName() == "Ben Ishay");
        admin.setPhoneNumber("0541111111");
        assertTrue(admin.getPhoneNumber() == "0541111111");
        admin.setUserName("matan15");
        assertFalse(admin.getUserName() == "tomerbe3");
        admin.setPassword("12333");
        assertFalse(admin.getPassword() == "tomer123");
        admin.setEmail("matan123@gmail.com");
        assertFalse(admin.getEmail() == "tomerbe3@gmail.com");
        admin.setFirstName("matan");
        assertFalse(admin.getFirstName() == "Tomer");
        admin.setLastName("Ben Ishay");
        assertFalse(admin.getLastName() == "Ben Shimol");
        admin.setPhoneNumber("0541111111");
        assertFalse(admin.getPhoneNumber() == "0524858601");
    }

    @Test
    public void testSettersSportsmen() {
        //SPORTSMAN
        sportsman = new Sportsman("david12", "david12@gmail.com", "david123", "David", "Davidov", 2001, 1, 1, 1.90F, 85F, "0501116677", "Semi-Pro", "Football");
        sportsman.setUserName("matan15");
        assertTrue(sportsman.getUserName() == "matan15");
        sportsman.setPassword("12333");
        assertTrue(sportsman.getPassword() == "12333");
        sportsman.setEmail("matan123@gmail.com");
        assertTrue(sportsman.getEmail() == "matan123@gmail.com");
        sportsman.setFirstName("matan");
        assertTrue(sportsman.getFirstName() == "matan");
        sportsman.setLastName("Ben Ishay");
        assertTrue(sportsman.getLastName() == "Ben Ishay");
        sportsman.setPhoneNumber("0541111111");
        assertTrue(sportsman.getPhoneNumber() == "0541111111");
        sportsman.setUserName("matan15");
        assertFalse(sportsman.getUserName() == "david12");
        sportsman.setPassword("12333");
        assertFalse(sportsman.getPassword() == "david123");
        sportsman.setEmail("matan123@gmail.com");
        assertFalse(sportsman.getEmail() == "david12@gmail.com");
        sportsman.setFirstName("matan");
        assertFalse(sportsman.getFirstName() == "David");
        sportsman.setLastName("Ben Ishay");
        assertFalse(sportsman.getLastName() == "Davidov");
        sportsman.setPhoneNumber("0541111111");
        assertFalse(sportsman.getPhoneNumber() == "0501116677");
    }

    @Test
    public void testSettersCoach() {
        //COACH
        coach = new Coach("matan12","matan12@gmail.com","matan123","Matan","Ben Ishay",1994,8,2,1.90F,85F,"0548162819","123456","1551","Football");
        coach.setUserName("Eli24");
        assertTrue(coach.getUserName()=="Eli24");
        coach.setPassword("123313");
        assertTrue(coach.getPassword()=="123313");
        coach.setEmail("Eli24@gmail.com");
        assertTrue(coach.getEmail()=="Eli24@gmail.com");
        coach.setFirstName("Eli");
        assertTrue(coach.getFirstName()=="Eli");
        coach.setLastName("Amuyev");
        assertTrue(coach.getLastName()=="Amuyev");
        coach.setPhoneNumber("0541111333");
        assertTrue(coach.getPhoneNumber()=="0541111333");
        coach.setUserName("Eli24");
        assertFalse(coach.getUserName()=="david12");
        coach.setPassword("123313");
        assertFalse(coach.getPassword()=="david123");
        coach.setEmail("Eli24@gmail.com");
        assertFalse(coach.getEmail()=="david12@gmail.com");
        coach.setFirstName("Eli");
        assertFalse(coach.getFirstName()=="David");
        coach.setLastName("Amuyev");
        assertFalse(coach.getLastName()=="Davidov");
        coach.setPhoneNumber("0541111333");
        assertFalse(coach.getPhoneNumber()=="0501116677");
        //Hackaton tests
        coach.setWeeklyMotivation("https://www.youtube.com/watch?v=Asmzihl4qww&t=4s");
        assertTrue(coach.getWeeklyMotivation()=="https://www.youtube.com/watch?v=Asmzihl4qww&t=4s");
        assertFalse(coach.getWeeklyMotivation()=="url?");

    }

    @Test
    //@org.testng.annotations.Test
    public void testGettersAdmin () {
        //ADMIN
        admin = new Admin("tomerbe3", "tomerbe3@gmail.com", "tomer123", "Tomer", "Ben Shimol", 1996, 9, 19, 1.80F, 82F, "0524858601");
        assertEquals("tomerbe3", admin.getUserName());
        assertEquals("tomer123", admin.getPassword());
        assertEquals("tomerbe3@gmail.com", admin.getEmail());
        assertEquals("Tomer", admin.getFirstName());
        assertEquals("Ben Shimol", admin.getLastName());
        assertEquals("1996", admin.getYearOfBirth().toString());
        assertEquals("9", admin.getMonthOfBirth().toString());
        assertEquals("19", admin.getDayOfBirth().toString());
        assertEquals("1.8", admin.getHeight().toString());
        assertEquals("19", admin.getDayOfBirth().toString());
        assertEquals("0524858601", admin.getPhoneNumber());
        assertNotEquals("Admin", admin.getUserName());
        assertNotEquals("admin123", admin.getPassword());
        assertNotEquals("admin@gmail.com", admin.getEmail());
        assertNotEquals("Matan", admin.getFirstName());
        assertNotEquals("Ben Ishay", admin.getLastName());
        assertNotEquals("1994", admin.getYearOfBirth().toString());
        assertNotEquals("8", admin.getMonthOfBirth().toString());
        assertNotEquals("2", admin.getDayOfBirth().toString());
        assertNotEquals("1.81", admin.getHeight().toString());
        assertNotEquals("0548162819", admin.getPhoneNumber());
    }

    @Test
    public void testGettersSportsmen () {
        //SPORTSMAN
        sportsman = new Sportsman("david12", "david12@gmail.com", "david123", "David", "Davidov", 2001, 1, 1, 1.90F, 85F, "0501116677", "Semi-Pro", "Football");
        assertEquals("david12", sportsman.getUserName());
        assertEquals("david123", sportsman.getPassword());
        assertEquals("david12@gmail.com", sportsman.getEmail());
        assertEquals("David", sportsman.getFirstName());
        assertEquals("Davidov", sportsman.getLastName());
        assertEquals("2001", sportsman.getYearOfBirth().toString());
        assertEquals("1", sportsman.getMonthOfBirth().toString());
        assertEquals("1", sportsman.getDayOfBirth().toString());
        assertEquals("0501116677", sportsman.getPhoneNumber());
        assertEquals("Football", sportsman.getSport());
        assertEquals("Semi-Pro", sportsman.getLevel());
        assertNotEquals("tomerbe3", sportsman.getUserName());
        assertNotEquals("tomer123", sportsman.getPassword());
        assertNotEquals("tomerbe3@gmail.com", sportsman.getEmail());
        assertNotEquals("Tomer", sportsman.getFirstName());
        assertNotEquals("Ben Shimol", sportsman.getLastName());
        assertNotEquals("1996", sportsman.getYearOfBirth().toString());
        assertNotEquals("9", sportsman.getMonthOfBirth().toString());
        assertNotEquals("19", sportsman.getDayOfBirth().toString());
        assertNotEquals("0524858601", sportsman.getPhoneNumber());
        assertNotEquals("Basketball", sportsman.getSport());
        assertNotEquals("Beginner", sportsman.getLevel());
    }

    @Test
    public void testGettersCoach () {
        //COACH
        coach = new Coach("matan12","matan12@gmail.com","matan123","Matan","Ben Ishay",1994,8,2,1.90F,85F,"0548162819","123456","1551","Football");
        assertEquals("matan12", coach.getUserName());
        assertEquals("matan123", coach.getPassword());
        assertEquals("matan12@gmail.com", coach.getEmail());
        assertEquals("Matan", coach.getFirstName());
        assertEquals("Ben Ishay", coach.getLastName());
        assertEquals("1994", coach.getYearOfBirth().toString());
        assertEquals("8", coach.getMonthOfBirth().toString());
        assertEquals("2", coach.getDayOfBirth().toString());
        assertEquals("0548162819", coach.getPhoneNumber());
        assertEquals("Football", coach.getSportKind());
        assertEquals("123456", coach.getLicenseNumber());
        assertEquals("1551", coach.getWorkPlaceId());
        assertNotEquals("tomerbe3", coach.getUserName());
        assertNotEquals("tomer123", coach.getPassword());
        assertNotEquals("tomerbe3@gmail.com", coach.getEmail());
        assertNotEquals("Tomer", coach.getFirstName());
        assertNotEquals("Ben Shimol", coach.getLastName());
        assertNotEquals("1996", coach.getYearOfBirth().toString());
        assertNotEquals("9", coach.getMonthOfBirth().toString());
        assertNotEquals("19", coach.getDayOfBirth().toString());
        assertNotEquals("0524858601", coach.getPhoneNumber());
        assertNotEquals("Basketball", coach.getSportKind());
        assertNotEquals("65432", coach.getLicenseNumber());
        assertNotEquals("1", coach.getWorkPlaceId());
        //Hackaton tests
        assertEquals("url?", coach.getWeeklyMotivation());
    }
}