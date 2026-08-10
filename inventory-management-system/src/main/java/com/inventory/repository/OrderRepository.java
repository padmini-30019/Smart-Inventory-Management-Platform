package com.inventory.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.inventory.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {

}