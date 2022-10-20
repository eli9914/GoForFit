package com.example.Backend.Integration;

import com.example.Backend.User.Sportsman;
import com.example.Backend.User.SportsmanController;
import com.example.Backend.User.SportsmanRepository;
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
@WebMvcTest(SportsmanController.class)
@ComponentScan(basePackages = "com.example.Backend")

class SportsmanControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private SportsmanRepository sportsmanRepository;

    Sportsman s1 = new Sportsman("Shlomo15", "Shlomo15@gmail.com", "shlomo123", "Shlomo", "Perry", 2001, 1, 1, 1.90F, 85F, "0501116677", "Professional", "Volleyball");
    Sportsman s2 = new Sportsman("Ariel16", "Ariel16@gmail.com", "ariel123", "Ariel", "Cohen", 2003, 1, 1, 1.80F, 80F, "0501116677", "Semi-Pro", "Football");
    Sportsman s3 = new Sportsman("Ron12", "Ron12@gmail.com", "ron123", "Ron", "Levi", 1999, 1, 1, 1.85F, 70F, "0501116677", "Beginner", "CrossFit");

    @Test
    void Test_getAllSportsman() throws Exception{

        ArrayList<Sportsman> sportsmen = new ArrayList<Sportsman>();
        sportsmen.add(s1);
        sportsmen.add(s2);
        sportsmen.add(s3);

        when(sportsmanRepository.findAll()).thenReturn(sportsmen);
        mockMvc.perform(get("/sportsman/getSportsman"))
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print())
                .andExpect(jsonPath("$", hasSize(3)))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].userName").value(s1.getUserName()))
                .andExpect(MockMvcResultMatchers.jsonPath("$[1].userName").value(s2.getUserName()))
                .andExpect(MockMvcResultMatchers.jsonPath("$[2].userName").value(s3.getUserName()));
    }

    @Test
    void Test_registration_THEN_authorization_Sportsman() throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();

        Map<String,Object> body = new HashMap<>();
        body.put("userName",s3.getUserName());
        body.put("email",s3.getEmail());
        body.put("password",s3.getPassword());
        body.put("firstName",s3.getFirstName());
        body.put("lastName",s3.getLastName());
        body.put("yearOfBirth",s3.getYearOfBirth());
        body.put("monthOfBirth",s3.getMonthOfBirth());
        body.put("dayOfBirth",s3.getDayOfBirth());
        body.put("height",s3.getHeight());
        body.put("weight",s3.getWeight());
        body.put("phoneNumber",s3.getPhoneNumber());
        body.put("level",s3.getLevel());
        body.put("sportName",s3.getSport());

        when(sportsmanRepository.save(s3)).thenReturn(s3);
        when(sportsmanRepository.findById(s3.getUserName())).thenReturn(Optional.of(s3));

        mockMvc.perform(post("/sportsman/sign_up")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(body))
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(status().isOk())
                .andDo(result -> mockMvc.perform(get("/sportsman/auth/" + result.getResponse().getContentAsString().
                                subSequence(result.getResponse().getContentAsString().lastIndexOf("userName") + 11,result.getResponse().getContentAsString().lastIndexOf("email") - 3)
                                + "/" + result.getResponse().getContentAsString().
                                subSequence(result.getResponse().getContentAsString().lastIndexOf("password") + 11,result.getResponse().getContentAsString().lastIndexOf("type") - 3)
                        ))
                        .andExpect(status().isOk())
                        .andDo(MockMvcResultHandlers.print()));
    }

    @Test
    void Test_updateWeight_Sportsman() throws Exception {
        when(sportsmanRepository.findById(s1.getUserName())).thenReturn(Optional.of(s1));
        mockMvc.perform(get("/sportsman/updateWeight/" + s1.getUserName() + "/" + 0))
                .andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.jsonPath("$.weight").value(0));
    }

    @Test
    void Test_updateSport_Sportsman() throws Exception {
        when(sportsmanRepository.findById(s1.getUserName())).thenReturn(Optional.of(s1));
        mockMvc.perform(get("/sportsman/updateSport/" + s1.getUserName() + "/" + "Unknown"))
                .andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.jsonPath("$.sport").value("Unknown"));
    }

    @Test
    void Test_updateLevel_Sportsman() throws Exception {
        when(sportsmanRepository.findById(s1.getUserName())).thenReturn(Optional.of(s1));
        mockMvc.perform(get("/sportsman/updateLevel/" + s1.getUserName() + "/" + "Level"))
                .andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.jsonPath("$.level").value("Level"));
    }

    @Test
    void Test_saveWorkout_Sportsman() throws Exception {
        when(sportsmanRepository.findById(s1.getUserName())).thenReturn(Optional.of(s1));
        mockMvc.perform(post("/sportsman/saveWorkout/" + s1.getUserName())
                .contentType(MediaType.APPLICATION_JSON)
                .content("www.test.com")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print())
                .andExpect(jsonPath("$.doneWorkouts", hasSize(1)))
                .andExpect(jsonPath("$.doneWorkouts[0]").value("www.test.com"));
        mockMvc.perform(post("/sportsman/saveWorkout/" + s1.getUserName())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("www.test.com")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print())
                .andExpect(jsonPath("$.doneWorkouts", hasSize(1)))
                .andExpect(jsonPath("$.doneWorkouts[0]").value("www.test.com"));
        mockMvc.perform(post("/sportsman/saveWorkout/" + s1.getUserName())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("www.test1.com")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print())
                .andExpect(jsonPath("$.doneWorkouts", hasSize(2)))
                .andExpect(jsonPath("$.doneWorkouts[1]").value("www.test1.com"));
    }

    @Test
    void Test_deleteSportsman() throws Exception {
        doNothing().when(sportsmanRepository).deleteById(s2.getUserName());
        mockMvc.perform(delete("/sportsman/deleteSportsman/" + s2.getUserName()))
                .andExpect(content().string("Sportsman " + s2.getUserName() + " deleted"))
                .andExpect(status().isOk());
    }

}