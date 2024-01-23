package com.example.coffee2.reponsitory.Customer;


import com.example.coffee2.request.CoffeeBeanRequest;
import com.example.coffee2.response.CoffeeBeanResponse;

import java.util.List;

public interface CoffeeBeanCustomer {
    List<CoffeeBeanResponse> getListCoffeeBean(CoffeeBeanRequest request);

    Long getCountListCoffeeBean(CoffeeBeanRequest request);
}
