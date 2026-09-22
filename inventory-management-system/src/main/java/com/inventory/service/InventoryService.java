package com.inventory.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.inventory.entity.Inventory;
import com.inventory.repository.InventoryRepository;

@Service
public class InventoryService {

    @Autowired
    private InventoryRepository inventoryRepository;

    public Inventory addInventory(
            Inventory inventory) {

        return inventoryRepository.save(inventory);
    }

    public List<Inventory> getAllInventory() {

        return inventoryRepository
                .findAllByOrderByIdAsc();
    }

    public Inventory updateInventory(
            Long id,
            Inventory inventory) {

        Inventory existing =
                inventoryRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Inventory Not Found"));

        existing.setProductId(
                inventory.getProductId());

        existing.setQuantity(
                inventory.getQuantity());

        existing.setWarehouseLocation(
                inventory.getWarehouseLocation());

        return inventoryRepository.save(existing);
    }

    public void deleteInventory(Long id) {

        inventoryRepository.deleteById(id);
    }
}