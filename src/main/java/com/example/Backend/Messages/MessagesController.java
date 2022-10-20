package com.example.Backend.Messages;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("messages/")
@CrossOrigin
public class MessagesController {

    @Autowired(required=false)
    private MessagesRepository messagesRepository;

    @GetMapping("/getSender/{userName}")
    public List<Messages> getSender(@PathVariable String userName) {return messagesRepository.findBySender(userName);}

    @GetMapping("/getReceiver/{userName}")
    public List<Messages> getReceiver(@PathVariable String userName) {return messagesRepository.findByReceiver(userName);}

    @PostMapping("/saveMessage")
    public Messages saveMessage(@RequestBody Messages message) {
        messagesRepository.save(message);
        return message;
    }

    @DeleteMapping("/deleteMessage/{userName}")
    public String deleteMessage(@PathVariable String userName) {
        messagesRepository.deleteMessage(userName);
        return "Messages to " + userName + " deleted";
    }
}
