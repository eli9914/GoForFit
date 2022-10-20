package com.example.Backend.Integration;

import com.example.Backend.Sports.Sports;
import com.example.Backend.Sports.SportsController;
import com.example.Backend.Sports.SportsRepository;
import com.example.Backend.User.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import static org.hamcrest.Matchers.hasSize;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringRunner.class)
@WebMvcTest(SportsController.class)
@ComponentScan(basePackages = "com.example.Backend")
public class SportsControllerIntegrationTests {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private SportsRepository sportsRepository;

    Sports sport1 = new Sports("Football","Ball Game","Matan Ben Ishay");
    Sports sport2 = new Sports("CrossFit","Fitness","Tomer Ben Shimol");

    @Test
    void Test_getAllSports() throws Exception {
        ArrayList<Sports> sports = new ArrayList<Sports>();
        sports.add(sport1);
        sports.add(sport2);
        when(sportsRepository.findAll()).thenReturn(sports);
        mockMvc.perform(get("/sports/getSports"))
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].name").value(sport1.getName()))
                .andExpect(MockMvcResultMatchers.jsonPath("$[1].name").value(sport2.getName()))
                .andExpect(MockMvcResultMatchers.jsonPath("$[2]").doesNotExist());
    }

    @Test
    void Test_getByID_Sports() throws Exception {
        ArrayList<Sports> sports = new ArrayList<Sports>();
        sports.add(sport1);
        sports.add(sport2);
        when(sportsRepository.findById(sport2.getName())).thenReturn(Optional.of(sport2));
        mockMvc.perform(get("/sports/getSport/" + sport2.getName()))
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value(sport2.getName()));
    }

    @Test
    void Test_updateSport_Sports() throws Exception {
        when(sportsRepository.findById(sport2.getName())).thenReturn(Optional.of(sport2));
        mockMvc.perform(get("/sports/updateSport/" + sport2.getName() + "/" + "New_Description/Unknown"))
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.jsonPath("$.description").value("New_Description"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.coach").value("Unknown"));
    }

    @Test
    void Test_saveSport_Sports() throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();

        Map<String, Object> body = new HashMap<>();
        body.put("name", sport1.getName());
        body.put("description", sport1.getDescription());
        body.put("coach", sport1.getCoach());

        when(sportsRepository.save(sport1)).thenReturn(sport1);
        mockMvc.perform(post("/sports/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(body))
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value(sport1.getName()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.description").value(sport1.getDescription()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.coach").value(sport1.getCoach()));
    }

    @Test
    void Test_deleteSport() throws Exception {
        doNothing().when(sportsRepository).deleteById(sport2.getName());
        mockMvc.perform(delete("/sports/deleteSport/" + sport2.getName()))
                .andExpect(content().string("Sport: " + sport2.getName() + " deleted"))
                .andExpect(status().isOk());
    }
}
