package com.example.coffee2.service.coffeeBean;

import com.example.coffee2.request.CoffeeBeanRequest;
import com.example.coffee2.response.CoffeeBeanResponse;

import java.util.List;

public interface CoffeeBeanService {
    List<CoffeeBeanResponse> getListCoffeeBean(CoffeeBeanRequest request);

    Long getCountListCoffeeBean(CoffeeBeanRequest request);

    boolean create(CoffeeBeanRequest request);

    boolean update(CoffeeBeanRequest request);

    boolean delete(CoffeeBeanRequest request);
}
