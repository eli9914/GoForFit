package com.example.Backend.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CoachRepository extends MongoRepository<Coach,String> {
}
