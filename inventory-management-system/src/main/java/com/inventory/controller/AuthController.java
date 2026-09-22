package com.inventory.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.inventory.entity.User;
import com.inventory.service.UserService;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public Map<String,Object> register(
            @RequestBody User user){

        userService.register(user);

        Map<String,Object> response =
                new HashMap<>();

        response.put("success", true);

        return response;
    }

    @PostMapping("/login")
    public Map<String,Object> login(
            @RequestBody User request){

        User user = userService.login(
                request.getUsername(),
                request.getPassword());

        Map<String,Object> response =
                new HashMap<>();

        if(user!=null){

            response.put("success", true);
            response.put("username",
                    user.getUsername());
            response.put("role",
                    user.getRole());

        }else{

            response.put("success", false);
        }

        return response;
    }
}