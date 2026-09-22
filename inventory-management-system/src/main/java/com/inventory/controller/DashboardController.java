package com.inventory.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.inventory.entity.Inventory;
import com.inventory.entity.Order;
import com.inventory.repository.InventoryRepository;
import com.inventory.repository.OrderRepository;
import com.inventory.repository.ProductRepository;
import com.inventory.service.UserService;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "*")
public class DashboardController {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private InventoryRepository inventoryRepository;

    @Autowired
    private UserService userService;

    @GetMapping("/stats")
    public Map<String, Object> stats() {

        Map<String, Object> data = new HashMap<>();

        data.put("products", productRepository.count());
        data.put("orders", orderRepository.count());
        data.put("inventoryRecords", inventoryRepository.count());
        data.put("users", userService.getUserCount());
        data.put("status", "Online");

        return data;
    }

    @GetMapping("/recent-orders")
    public List<Order> recentOrders() {

        return orderRepository
                .findAllByOrderByIdAsc();
    }

    @GetMapping("/low-stock")
    public List<Inventory> lowStock() {

        return inventoryRepository
                .findAllByOrderByIdAsc()
                .stream()
                .filter(item -> item.getQuantity() <= 10)
                .collect(Collectors.toList());
    }
}