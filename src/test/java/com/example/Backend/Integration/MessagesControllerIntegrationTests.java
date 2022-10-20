package com.example.Backend.Integration;

import com.example.Backend.Messages.Messages;
import com.example.Backend.Messages.MessagesController;
import com.example.Backend.Messages.MessagesRepository;
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
@WebMvcTest(MessagesController.class)
@ComponentScan(basePackages = "com.example.Backend")
public class MessagesControllerIntegrationTests {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private MessagesRepository messagesRepository;

    Messages m1 = new Messages("tomerb3", "Hello1", "matanbe6");
    Messages m2 = new Messages("matanbe6", "Hello2", "tomerb3");

    @Test
    void Test_getSender_Messages() throws Exception {
        ArrayList<Messages> messages = new ArrayList<Messages>();
        messages.add(m2);
        when(messagesRepository.findBySender(m1.getFrom())).thenReturn(messages);
        mockMvc.perform(get("/messages/getSender/" + m1.getFrom()))
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].content").value(m2.getContent()))
                .andExpect(MockMvcResultMatchers.jsonPath("$[1]").doesNotExist());
    }

    @Test
    void Test_getReceiver_Messages() throws Exception {
        ArrayList<Messages> messages = new ArrayList<Messages>();
        messages.add(m1);
        when(messagesRepository.findByReceiver(m2.getTo())).thenReturn(messages);
        mockMvc.perform(get("/messages/getReceiver/" + m2.getTo()))
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].content").value(m1.getContent()))
                .andExpect(MockMvcResultMatchers.jsonPath("$[1]").doesNotExist());
    }

    @Test
    void Test_saveMessage_Messages() throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();

        Map<String, Object> body = new HashMap<>();
        body.put("from", m1.getFrom());
        body.put("content", m1.getContent());
        body.put("to", m1.getTo());

        when(messagesRepository.save(m1)).thenReturn(m1);
        mockMvc.perform(post("/messages/saveMessage")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(body))
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.from").value(m1.getFrom()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.content").value(m1.getContent()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.to").value(m1.getTo()));
    }

    @Test
    void Test_deleteMessage() throws Exception {
        doNothing().when(messagesRepository).deleteMessage(m1.getTo());
        mockMvc.perform(delete("/messages/deleteMessage/" + m1.getTo()))
                .andExpect(content().string("Messages to " + m1.getTo() + " deleted"))
                .andExpect(status().isOk());
    }
}