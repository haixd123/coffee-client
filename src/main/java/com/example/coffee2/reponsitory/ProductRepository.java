package com.example.coffee2.reponsitory;

import com.example.coffee2.entity.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface ProductRepository extends JpaRepository<ProductEntity, Long> {
    @Query(
            value = "select e.* from product e where e.name = :name",
            nativeQuery = true
    )
    ProductEntity findByName(String name);

    @Query(
            value = "select e.sku from product e where e.sku = :sku",
            nativeQuery = true
    )
    List<String> findBySku(@RequestParam String sku);
}
