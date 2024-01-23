package com.example.coffee2.reponsitory;

import com.example.coffee2.entity.CoffeeBeanEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface CoffeeBeanRespository extends JpaRepository<CoffeeBeanEntity, Long> {
    @Query(
            value = "SELECT * FROM coffee_bean",
            nativeQuery = true
    )
    List<CoffeeBeanEntity> findAllCoffeeBean();


    @Query(
            value = "SELECT e.* FROM coffee_bean e where e.name = :name",
            nativeQuery = true
    )
    CoffeeBeanEntity findAllCoffeeBeanName(@RequestParam("name") String name);

//    List<String> findAllCoffeeBeanName(@RequestParam String name);

//    @Query(
//            value = "SELECT slug FROM coffee_bean",
//            nativeQuery = true
//    )
//    List<String> findAllidSlugCoffeeBean();




    //?????? Không dùng vẫn lỗi
//    CoffeeBeanEntity getCoffeeBeanEntityById(@RequestParam Long id);
}
