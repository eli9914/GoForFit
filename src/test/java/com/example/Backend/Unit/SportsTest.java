package com.example.Backend.Unit;

import com.example.Backend.Sports.Sports;
import org.junit.Before;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;
import static org.junit.Assert.*;

@RunWith(MockitoJUnitRunner.class)

public class SportsTest {
    @Mock
    static
    Sports sports,sports1;

    @Before
    public void init() {
        MockitoAnnotations.openMocks(this);
    }
    @BeforeAll
    public static void setup() {
        sports = new Sports("Soccer", "des", "Tomer");
        sports1=new Sports("name","des","coach");
    }

    @Test
    public void testGetName () {
        assertEquals("Soccer", sports.getName());
    }

    @Test
    public void testGetDescription () {

        assertEquals("des", sports.getDescription());
    }

    @Test
    public void testGetCoach () {
        assertEquals("Tomer", sports.getCoach());
    }

    @Test
    public void testCheckWrongName () {
        assertNotEquals("football", sports.getName());
    }

    @Test
    public void testCheckWrongDescription () {
        assertNotEquals("Notgood", sports.getDescription());
    }

    @Test
    public void testCheckWrongCoach () {
        assertNotEquals("Eli",sports.getCoach());

    }

    @Test
    public void testSetDescription() {
        sports1.setDescription("good");
        assertTrue(sports1.getDescription() == "good");
    }

    @Test
    public void testSetCoach() {
        sports1.setCoach("matan");
        assertTrue(sports1.getCoach() == "matan");
    }

    @Test
    public void testSetWrongName() {
        sports1.setName("football");
        assertFalse(sports1.getName() == "tennis");
    }

    @Test
    public void testSetWrongDescription() {
        sports1.setDescription("good");
        assertFalse(sports1.getDescription() == "bad");
    }

    @Test
    public void testSetWrongCoach() {
        sports1.setCoach("matan");
        assertFalse(sports1.getCoach() == "tony");
    }
}

