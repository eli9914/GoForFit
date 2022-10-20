package com.example.Backend.Messages;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Messages {
    String from;
    String content;
    String to;

    public Messages (String from,String content,String to)
    {
        this.from = from;
        this.content = content;
        this.to = to;
    }

    public String getFrom() {
        return from;
    }

    public String getContent() {
        return content;
    }

    public String getTo() {
        return to;
    }
}
