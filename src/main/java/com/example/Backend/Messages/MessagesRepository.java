package com.example.Backend.Messages;
import org.springframework.data.mongodb.repository.DeleteQuery;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface MessagesRepository extends MongoRepository<Messages,String> {

    @Query("{ 'from' : ?0 }")
    List<Messages> findBySender(String from);

    @Query("{ 'to' : ?0 }")
    List<Messages> findByReceiver(String to);

    @Query(value="{ 'to' : ?0 }", delete = true)
    void deleteMessage(String to);

}
