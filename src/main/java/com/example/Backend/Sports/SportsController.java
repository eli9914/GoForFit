package com.example.Backend.Sports;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("sports/")
@CrossOrigin
public class SportsController {
    
    @Autowired(required=false)
    private SportsRepository sportsRepository;

    @GetMapping("/getSports")
    public List<Sports> getSports() {return sportsRepository.findAll();}

    @GetMapping("/getSport/{name}")
    public Optional<Sports> getSportsByID(@PathVariable String name){
        return sportsRepository.findById(name);
    }

    @GetMapping("/updateSport/{name}/{description}/{coach}")
    public Optional<Sports> updateSportsByID(@PathVariable String name,@PathVariable String description,@PathVariable String coach)
    {
        Optional<Sports> sport = sportsRepository.findById(name);
        if (sport.isPresent())
        {
            sport.get().setDescription(description);
            sport.get().setCoach(coach);
            sportsRepository.save(sport.get());
        }
        return sport;
    }

    @PostMapping("/add")
    public Sports saveSport(@RequestBody Sports sport){
        sportsRepository.save(sport);
        return sport;
    }

    @DeleteMapping("deleteSport/{name}")
    public String deleteSport(@PathVariable String name) {
        sportsRepository.deleteById(name);
        return "Sport: " + name + " deleted";
    }
}
