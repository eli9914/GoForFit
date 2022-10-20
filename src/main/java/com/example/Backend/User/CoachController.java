package com.example.Backend.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;


import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("coach/")
@CrossOrigin
public class CoachController {

    @Autowired(required=false)
    private CoachRepository coachRepository;

    @GetMapping("/getCoach")
    public List<Coach> getCoach() {return coachRepository.findAll();}

    @GetMapping(value="/auth/{userName}/{password}")
    public Optional<Coach> CoachAuth(@PathVariable String userName,@PathVariable String password){
        Optional<Coach> coach = coachRepository.findById(userName);
        if (coach.isPresent())
        {
            if (Objects.equals(coach.get().getPassword(), password))
            {
                return coach;
            }
        }
        return Optional.empty();
    }

    @GetMapping("/addCommonInjury/{userName}/{name}/{causedBy}/{treatment}/{row}")
    public Optional<Coach> saveInjury(@PathVariable String userName,@PathVariable String name,@PathVariable String causedBy,@PathVariable String treatment,@PathVariable int row)
    {
        Optional<Coach> coach = coachRepository.findById(userName);
        if (coach.isPresent())
        {
            coach.get().setCommonInjury(name,causedBy,treatment,row);
            coachRepository.save(coach.get());
        }
        return coach;
    }

    @PostMapping("/uploadBeginnerWeeklySessions/{userName}/{description}")
    public Optional<Coach> saveBeginnerWeeklySession(@RequestBody String url,@PathVariable String userName,@PathVariable String description) throws UnsupportedEncodingException
    {
        String urlAfterDecoding = java.net.URLDecoder.decode(url, StandardCharsets.UTF_8.name());
        Optional<Coach> coach = coachRepository.findById(userName);
        if (coach.isPresent())
        {
            coach.get().setBeginnerWeeklySession(urlAfterDecoding,description);
            coachRepository.save(coach.get());
        }
        return coach;
    }

    @PostMapping("/uploadSemiProWeeklySessions/{userName}/{description}")
    public Optional<Coach> saveSemiProWeeklySession(@RequestBody String url,@PathVariable String userName,@PathVariable String description) throws UnsupportedEncodingException
    {
        String urlAfterDecoding = java.net.URLDecoder.decode(url, StandardCharsets.UTF_8.name());
        Optional<Coach> coach = coachRepository.findById(userName);
        if (coach.isPresent())
        {
            coach.get().setSemiproWeeklySession(urlAfterDecoding,description);
            coachRepository.save(coach.get());
        }
        return coach;
    }

    @PostMapping("/uploadProfessionalWeeklySessions/{userName}/{description}")
    public Optional<Coach> saveProfessionalWeeklySession(@RequestBody String url,@PathVariable String userName,@PathVariable String description) throws UnsupportedEncodingException
    {
        String urlAfterDecoding = java.net.URLDecoder.decode(url, StandardCharsets.UTF_8.name());
        Optional<Coach> coach = coachRepository.findById(userName);
        if (coach.isPresent())
        {
            coach.get().setProfessionalWeeklySession(urlAfterDecoding,description);
            coachRepository.save(coach.get());
        }
        return coach;
    }

    @PostMapping("/uploadWeeklyMotivation/{userName}")
    public Optional<Coach> saveWeeklyMotivation(@RequestBody String url,@PathVariable String userName) throws UnsupportedEncodingException
    {
        String urlAfterDecoding = java.net.URLDecoder.decode(url, StandardCharsets.UTF_8.name());
        Optional<Coach> coach = coachRepository.findById(userName);
        if (coach.isPresent())
        {
            coach.get().setWeeklyMotivation(urlAfterDecoding);
            coachRepository.save(coach.get());
        }
        return coach;
    }

    @GetMapping("/updateRating/{rating}/{userName}")
    public Optional<Coach> UpdateRating(@PathVariable int rating,@PathVariable String userName){
        Optional<Coach> coach = coachRepository.findById(userName);
        if (coach.isPresent())
        {
            coach.get().setRating(rating);
            coachRepository.save(coach.get());
        }
        return coach;
    }

    @PostMapping("/sign_up")
    public Coach saveCoach(@RequestBody Coach coach)
    {
        if(coach.check_licenseNumber_API() && coach.check_workPlaceId_API()) {
            coachRepository.save(coach);
            return coach;
        }
        else
            return null;
    }

    @DeleteMapping("deleteCoach/{userName}")
    public String deleteCoach(@PathVariable String userName){
        coachRepository.deleteById(userName);
        return "Coach " + userName + " deleted";
    }
}

