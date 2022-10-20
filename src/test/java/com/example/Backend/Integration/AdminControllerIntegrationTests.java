package com.example.Backend.Integration;

import com.example.Backend.User.Admin;
import com.example.Backend.User.AdminController;
import com.example.Backend.User.AdminRepository;
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
import java.util.*;
import static org.hamcrest.Matchers.hasSize;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringRunner.class)
@WebMvcTest(AdminController.class)
@ComponentScan(basePackages = "com.example.Backend")
public class AdminControllerIntegrationTests {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AdminRepository adminRepository;

    Admin a1 = new Admin("eli9914", "eli9914@gmail.com", "1234", "Eli", "Amuyev", 1997, 4, 7, 1.65F, 65F, "0524696874");
    Admin a2 = new Admin("matanbe6", "matanbe6@gmail.com", "1234", "Matan", "Ben Ishay", 1995, 8, 2, 1.75F, 75F, "0524696874");


    @Test
    void Test_getAllAdmins() throws Exception {
        ArrayList<Admin> admins = new ArrayList<Admin>();
        admins.add(a1);
        admins.add(a2);
        when(adminRepository.findAll()).thenReturn(admins);
        mockMvc.perform(get("/admin/getAdmin"))
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].userName").value(a1.getUserName()))
                .andExpect(MockMvcResultMatchers.jsonPath("$[1].userName").value(a2.getUserName()))
                .andExpect(MockMvcResultMatchers.jsonPath("$[2]").doesNotExist());
    }

    @Test
    void Test_authorization_Admin() throws Exception {
        when(adminRepository.findById(a1.getUserName())).thenReturn(Optional.of(a1));
        mockMvc.perform(get("/admin/auth/" + a1.getUserName() + "/" + a1.getPassword()))
                .andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.jsonPath("$.userName").value(a1.getUserName()));
    }

    @Test
    void Test_saveAdmin() throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();

        when(adminRepository.save(a2)).thenReturn(a2);

        Map<String,Object> body = new HashMap<>();
        body.put("userName",a2.getUserName());
        body.put("email",a2.getEmail());
        body.put("password",a2.getPassword());
        body.put("firstName",a2.getFirstName());
        body.put("lastName",a2.getLastName());
        body.put("yearOfBirth",a2.getYearOfBirth());
        body.put("monthOfBirth",a2.getMonthOfBirth());
        body.put("dayOfBirth",a2.getDayOfBirth());
        body.put("height",a2.getHeight());
        body.put("weight",a2.getWeight());
        body.put("phoneNumber",a2.getPhoneNumber());

        mockMvc.perform(post("/admin/")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(body))
                .accept(MediaType.APPLICATION_JSON))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(status().isOk());
    }

    @Test
    void Test_deleteAdmin() throws Exception {
        doNothing().when(adminRepository).deleteById(a2.getUserName());
        mockMvc.perform(delete("/admin/" + a2.getUserName()))
                .andExpect(content().string("User " + a2.getUserName() + " deleted"))
                .andExpect(status().isOk());
    }

}