
package com.example.Backend.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SportsmanRepository extends MongoRepository<Sportsman,String> {
}
