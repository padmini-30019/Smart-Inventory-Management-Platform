package com.inventory.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.inventory.entity.Inventory;
import com.inventory.service.InventoryService;

@RestController
@RequestMapping("/inventory")
@CrossOrigin(origins = "http://localhost:5173")
public class InventoryController {

    @Autowired
    private InventoryService inventoryService;

    @PostMapping
    public Inventory addInventory(
            @RequestBody Inventory inventory) {

        return inventoryService.addInventory(
                inventory);
    }

    @GetMapping
    public List<Inventory> getAllInventory() {

        return inventoryService.getAllInventory();
    }

    @PutMapping("/{id}")
    public Inventory updateInventory(
            @PathVariable Long id,
            @RequestBody Inventory inventory) {

        return inventoryService.updateInventory(
                id,
                inventory);
    }

    @DeleteMapping("/{id}")
    public void deleteInventory(
            @PathVariable Long id) {

        inventoryService.deleteInventory(id);
    }
}