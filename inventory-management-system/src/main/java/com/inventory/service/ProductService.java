package com.inventory.service;

import java.util.Comparator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.inventory.entity.Product;
import com.inventory.repository.ProductRepository;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public Product addProduct(Product product) {

        return productRepository.save(product);
    }

    public List<Product> getAllProducts() {

        List<Product> products =
                productRepository.findAll();

        products.sort(
                Comparator.comparing(
                        Product::getId));

        return products;
    }

    public Product getProductById(Long id) {

        return productRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Product Not Found"));
    }

    public Product updateProduct(
            Long id,
            Product updatedProduct) {

        Product product =
                productRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Product Not Found"));

        product.setName(
                updatedProduct.getName());

        product.setCategory(
                updatedProduct.getCategory());

        product.setPrice(
                updatedProduct.getPrice());

        return productRepository.save(product);
    }

    public void deleteProduct(Long id) {

        productRepository.deleteById(id);
    }
}