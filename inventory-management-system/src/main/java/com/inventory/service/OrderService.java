package com.inventory.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.inventory.entity.Inventory;
import com.inventory.entity.Order;
import com.inventory.repository.InventoryRepository;
import com.inventory.repository.OrderRepository;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private InventoryRepository inventoryRepository;

    public Order createOrder(Order order) {

        Inventory inventory =
                inventoryRepository.findByProductId(order.getProductId())
                .orElseThrow(() ->
                        new RuntimeException("Product not found in inventory"));

        if(inventory.getQuantity() < order.getQuantity()) {
            throw new RuntimeException("Insufficient stock");
        }

        inventory.setQuantity(
                inventory.getQuantity() - order.getQuantity());

        inventoryRepository.save(inventory);

        return orderRepository.save(order);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
}