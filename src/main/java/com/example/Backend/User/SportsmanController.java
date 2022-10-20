package com.example.Backend.User;

import org.omg.CORBA.PUBLIC_MEMBER;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("sportsman/")
@CrossOrigin
public class SportsmanController {

    @Autowired(required=false)
    private SportsmanRepository sportsmanRepository;

    @GetMapping("/getSportsman")
    public List<Sportsman> getSportsman() {return sportsmanRepository.findAll();}

    @GetMapping(value="/auth/{userName}/{password}")
    public Optional<Sportsman> SportsmanAuth(@PathVariable String userName,@PathVariable String password){
        Optional<Sportsman> sportsman = sportsmanRepository.findById(userName);
        if (sportsman.isPresent())
        {
            if (Objects.equals(sportsman.get().getPassword(), password))
            {
                return sportsman;
            }
        }
        return Optional.empty();
    }

    @GetMapping("/updateWeight/{userName}/{weight}")
    public Optional<Sportsman> changeWeight(@PathVariable String userName,@PathVariable float weight)
    {
        Optional<Sportsman> sportsman = sportsmanRepository.findById(userName);
        if (sportsman.isPresent())
        {
            sportsman.get().setWeight(weight);
            sportsmanRepository.save(sportsman.get());
        }
        return sportsman;
    }

    @GetMapping("/updateSport/{userName}/{sportName}")
    public Optional<Sportsman> changeSport(@PathVariable String userName,@PathVariable String sportName)
    {
        Optional<Sportsman> sportsman = sportsmanRepository.findById(userName);
        if (sportsman.isPresent())
        {
            sportsman.get().setSport(sportName);
            sportsmanRepository.save(sportsman.get());
        }
        return sportsman;
    }

    @GetMapping("/updateLevel/{userName}/{level}")
    public Optional<Sportsman> updateLevel(@PathVariable String userName,@PathVariable String level)
    {
        Optional<Sportsman> sportsman = sportsmanRepository.findById(userName);
        if (sportsman.isPresent())
        {
            sportsman.get().setLevel(level);
            sportsmanRepository.save(sportsman.get());
        }
        return sportsman;
    }

    @PostMapping("/saveWorkout/{userName}")
    public Optional<Sportsman> saveWorkout(@RequestBody String url,@PathVariable String userName) throws UnsupportedEncodingException
    {
        int flag = 0;
        String urlAfterDecoding = java.net.URLDecoder.decode(url, StandardCharsets.UTF_8.name());
        Optional<Sportsman> sportsman = sportsmanRepository.findById(userName);
        if (sportsman.isPresent())
        {
            for (int i = 0;i<sportsman.get().getDoneWorkouts().size();i++)
            {
                if(sportsman.get().getDoneWorkouts().get(i).contentEquals(urlAfterDecoding))
                    flag = 1;
            }
            if(flag == 0)
            {
                sportsman.get().setDoneWorkout(urlAfterDecoding);
                sportsmanRepository.save(sportsman.get());
            }
        }
        return sportsman;
    }

    @PostMapping("/sign_up")
    public Sportsman saveSportsman(@RequestBody Sportsman sportsman){
        sportsmanRepository.save(sportsman);
        return sportsman;
    }

    @DeleteMapping("deleteSportsman/{userName}")
    public String deleteSportsman(@PathVariable String userName){
        sportsmanRepository.deleteById(userName);
        return "Sportsman " + userName + " deleted";
    }
}
