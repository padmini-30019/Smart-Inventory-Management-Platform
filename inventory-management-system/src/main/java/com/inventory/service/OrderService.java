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
                inventoryRepository
                .findByProductId(order.getProductId())
                .orElseThrow(() ->
                        new RuntimeException(
                                "Product Not Found"));

        if (inventory.getQuantity()
                < order.getQuantity()) {

            throw new RuntimeException(
                    "Insufficient Stock");
        }

        inventory.setQuantity(
                inventory.getQuantity()
                - order.getQuantity());

        inventoryRepository.save(inventory);

        if(order.getStatus() == null ||
        		   order.getStatus().isEmpty()) {

        		    order.setStatus("PLACED");
        		}

        return orderRepository.save(order);
    }

    public List<Order> getAllOrders() {

        List<Order> orders =
                orderRepository.findAll();

        orders.sort(
                (o1, o2) ->
                        o1.getId().compareTo(
                                o2.getId()));

        return orders;
    }

    public Order getOrderById(Long id) {

        return orderRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Order Not Found"));
    }

    public Order updateOrder(
            Long id,
            Order order) {

        Order existing =
                orderRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Order Not Found"));

        existing.setProductId(
                order.getProductId());

        existing.setQuantity(
                order.getQuantity());

        existing.setStatus(
                order.getStatus());

        return orderRepository.save(existing);
    }

    public void deleteOrder(Long id) {

        orderRepository.deleteById(id);
    }
}