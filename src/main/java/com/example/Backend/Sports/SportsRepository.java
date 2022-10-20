package com.example.Backend.Sports;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SportsRepository extends MongoRepository<Sports,String> {
}
