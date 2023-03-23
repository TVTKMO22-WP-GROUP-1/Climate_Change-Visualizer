package com.group1.climate_change_visualizer.Data;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class UserService {
    private List<User> users;

    public UserService(){
        users = new ArrayList<>();
    }

    public User getUser(Long id){
        for (User user : users){
            if (user.getID() == id){
                return user;
            }
        }
        return null;
    }

    public List<User> getUsers(){
        return this.users;
    }

    public User addUser(Long id, String username, String password){
        User newUser = new User(id, username, password);
        users.add(newUser);
        return newUser;
    }

    public void deleteUser(Long id){
        for (User user : users) {
            if (user.getID() == id) {
                users.remove(user);
                break;
            }
        }
    }
}
