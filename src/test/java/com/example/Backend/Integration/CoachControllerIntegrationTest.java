package com.example.Backend.Integration;

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
@WebMvcTest(CoachController.class)
@ComponentScan(basePackages = "com.example.Backend")
class CoachControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CoachRepository coachRepository;

    Coach c1 = new Coach("tomerbe3", "tomerbe3@gmail.com", "1234", "Tomer", "Ben Shimol", 1996, 9, 19, 1.8F, 82F, "0524858601","10-102303","154B3108644","CrossFit");
    Coach c2 = new Coach("matanbe6", "matanbe6@gmail.com", "1234", "Matan", "Ben Ishay", 1995, 8, 2, 1.75F, 75F, "0524696874","10-104677","138K1108532","Football");

    @Test
    void Test_getAllCoaches() throws Exception{

        ArrayList<Coach> coaches = new ArrayList<Coach>();
        coaches.add(c1);
        coaches.add(c2);

        when(coachRepository.findAll()).thenReturn(coaches);
        mockMvc.perform(get("/coach/getCoach"))
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].userName").value(c1.getUserName()))
                .andExpect(MockMvcResultMatchers.jsonPath("$[1].userName").value(c2.getUserName()));
    }

    @Test
    void Test_registration_THEN_authorization_Coach() throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();

        Map<String,Object> body = new HashMap<>();
        body.put("userName",c1.getUserName());
        body.put("email",c1.getEmail());
        body.put("password",c1.getPassword());
        body.put("firstName",c1.getFirstName());
        body.put("lastName",c1.getLastName());
        body.put("yearOfBirth",c1.getYearOfBirth());
        body.put("monthOfBirth",c1.getMonthOfBirth());
        body.put("dayOfBirth",c1.getDayOfBirth());
        body.put("height",c1.getHeight());
        body.put("weight",c1.getWeight());
        body.put("phoneNumber",c1.getPhoneNumber());
        body.put("licenseNumber",c1.getLicenseNumber());
        body.put("workPlaceId",c1.getWorkPlaceId());
        body.put("sportKind",c1.getSportKind());

        when(coachRepository.save(c1)).thenReturn(c1);
        when(coachRepository.findById(c1.getUserName())).thenReturn(Optional.of(c1));

        mockMvc.perform(post("/coach/sign_up")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(body))
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(status().isOk())
                .andDo(result -> mockMvc.perform(get("/coach/auth/" + result.getResponse().getContentAsString().
                                subSequence(result.getResponse().getContentAsString().lastIndexOf("userName") + 11,result.getResponse().getContentAsString().lastIndexOf("email") - 3)
                                + "/" + result.getResponse().getContentAsString().
                                subSequence(result.getResponse().getContentAsString().lastIndexOf("password") + 11,result.getResponse().getContentAsString().lastIndexOf("type") - 3)
                        ))
                        .andExpect(status().isOk())
                        .andDo(MockMvcResultHandlers.print()));
    }

    @Test
    void Test_saveInjury_Coach() throws Exception {
        when(coachRepository.findById(c2.getUserName())).thenReturn(Optional.of(c2));
        mockMvc.perform(get("/coach/addCommonInjury/" + c2.getUserName() + "/" + "Injury0" + "/" + "Injury1" + "/" + "Injury2" + "/" + 2))
                .andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.jsonPath("$.commonInjuries[2][0]").value("Injury0"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.commonInjuries[2][1]").value("Injury1"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.commonInjuries[2][2]").value("Injury2"));
    }

    @Test
    void Test_saveBeginnerWeeklySession_Coach() throws Exception {
        when(coachRepository.findById(c2.getUserName())).thenReturn(Optional.of(c2));
        mockMvc.perform(post("/coach/uploadBeginnerWeeklySessions/" + c2.getUserName() +"/" + "description_to_Beginner")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("www.BeginnerSession1.com")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print())
                .andExpect(jsonPath("$.beginnerWeeklySession", hasSize(2)))
                .andExpect(jsonPath("$.beginnerWeeklySession[0]").value("www.BeginnerSession1.com"))
                .andExpect(jsonPath("$.beginnerWeeklySession[1]").value("description_to_Beginner"));
    }

    @Test
    void Test_saveSemiProWeeklySession_Coach() throws Exception {
        when(coachRepository.findById(c2.getUserName())).thenReturn(Optional.of(c2));
        mockMvc.perform(post("/coach/uploadSemiProWeeklySessions/" + c2.getUserName() +"/" + "description_to_SemiPro")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("www.Semi-ProSession1.com")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print())
                .andExpect(jsonPath("$.semiproWeeklySession", hasSize(2)))
                .andExpect(jsonPath("$.semiproWeeklySession[0]").value("www.Semi-ProSession1.com"))
                .andExpect(jsonPath("$.semiproWeeklySession[1]").value("description_to_SemiPro"));
    }

    @Test
    void Test_saveProfessionalWeeklySession_Coach() throws Exception {
        when(coachRepository.findById(c2.getUserName())).thenReturn(Optional.of(c2));
        mockMvc.perform(post("/coach/uploadProfessionalWeeklySessions/" + c2.getUserName() +"/" + "description_to_Professional")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("www.ProfessionalSession1.com")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print())
                .andExpect(jsonPath("$.professionalWeeklySession", hasSize(2)))
                .andExpect(jsonPath("$.professionalWeeklySession[0]").value("www.ProfessionalSession1.com"))
                .andExpect(jsonPath("$.professionalWeeklySession[1]").value("description_to_Professional"));
    }

    @Test
    void Test_WeeklyMotivationSession_Coach() throws Exception {
        when(coachRepository.findById(c2.getUserName())).thenReturn(Optional.of(c2));
        mockMvc.perform(post("/coach/uploadWeeklyMotivation/" + c2.getUserName())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("www.MOTIVATION.com")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print())
                .andExpect(jsonPath("$.weeklyMotivation").value("www.MOTIVATION.com"));
    }

    @Test
    void Test_updateRating_Coach() throws Exception {
        when(coachRepository.findById(c2.getUserName())).thenReturn(Optional.of(c2));
        mockMvc.perform(get("/coach/updateRating/" + 3 + "/" + c2.getUserName()))
                .andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print())
                .andExpect(jsonPath("$.rating").value(3));
        mockMvc.perform(get("/coach/updateRating/" + 5 + "/" + c2.getUserName()))
                .andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print())
                .andExpect(jsonPath("$.rating").value(4));
    }

    @Test
    void Test_deleteCoach() throws Exception {
        doNothing().when(coachRepository).deleteById(c2.getUserName());
        mockMvc.perform(delete("/coach/deleteCoach/" + c2.getUserName()))
                .andExpect(content().string("Coach " + c2.getUserName() + " deleted"))
                .andExpect(status().isOk());
    }
}