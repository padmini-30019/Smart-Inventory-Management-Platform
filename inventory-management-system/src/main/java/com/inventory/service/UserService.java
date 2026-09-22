package com.inventory.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.inventory.entity.User;
import com.inventory.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User register(User user) {

        if(userRepository.count()==0){
            user.setRole("ADMIN");
        }

        return userRepository.save(user);
    }

    public User login(String username,String password){

        User user = userRepository
                .findByUsername(username)
                .orElse(null);

        if(user!=null &&
           user.getPassword().equals(password)){
            return user;
        }

        return null;
    }

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public User changeRole(Long id,String role){

        User user = userRepository
                .findById(id)
                .orElseThrow();

        user.setRole(role);

        return userRepository.save(user);
    }

    public long getUserCount(){
        return userRepository.count();
    }
}