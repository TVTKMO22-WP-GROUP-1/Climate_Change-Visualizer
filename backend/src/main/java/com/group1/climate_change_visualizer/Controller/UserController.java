package com.group1.climate_change_visualizer.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.group1.climate_change_visualizer.Data.User;
import com.group1.climate_change_visualizer.Repository.UserRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
public class UserController {

    //private UserService uService = new UserService();
    @Autowired
    private UserRepository repo;

    /*@Autowired
    public void UserController(UserService uService){
        this.uService = uService;
    }
    */
    @GetMapping("/users")
    public List<User> getUsers() {
        return repo.getRepoUsers(); 
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/addUser")
    public ResponseEntity<?> addUser (
        @RequestParam("inputUsername") String username,
        @RequestParam("inputPassword") String password) 
        {
            User user = new User();
            user.setUsername(username);
            user.setPassword(password);
            repo.save(user);
            return ResponseEntity.status(HttpStatus.OK).body(user);
            

        }
    /*
    @GetMapping("/user/{id}")
    public ResponseEntity<?> getUser(@PathVariable Long id){
        User user = uService.getUser(id);
        if (user != null){
            return ResponseEntity.status(HttpStatus.OK).body(user);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User id " + id + "was not found.");
    }

    @PostMapping("/user")
    public ResponseEntity<?> addUser(@RequestParam Long id, @RequestParam String username, @RequestParam String password) {
        User user = uService.getUser(id);
        
        if (user != null){
        return ResponseEntity.status(HttpStatus.CONFLICT).body("This user with id " + id + " is already in the database.");
    }

        uService.addUser(id, username, password);

        return ResponseEntity.status(HttpStatus.CREATED).body("A new user with id " + id + " has been created.");
    }

    @DeleteMapping("/user/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        User user = uService.getUser(id);
        
        if (user == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User id " + id + " was not found.");
        }
        uService.deleteUser(id);
        return ResponseEntity.status(HttpStatus.OK).body("User with id " + id + " was deleted from the database.");
    }
    */
    
}
