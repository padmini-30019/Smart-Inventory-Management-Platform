package com.inventory.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.inventory.entity.User;
import com.inventory.service.UserService;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public List<User> getUsers(){

        return userService.getAllUsers();
    }

    @PutMapping("/role/{id}")
    public User changeRole(
            @PathVariable Long id,
            @RequestParam String role){

        return userService.changeRole(id, role);
    }
}