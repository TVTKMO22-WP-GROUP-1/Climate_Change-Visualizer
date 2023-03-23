package com.group1.climate_change_visualizer.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.group1.climate_change_visualizer.Data.User;
import com.group1.climate_change_visualizer.Repository.UserRepository;

@RestController
public class UserController {
   
    private UserRepository userRepository;

    @GetMapping("/users")
    public List<User> getUsers() {
        System.out.println("HERE");
        return userRepository.findAll();
    }
    
}
