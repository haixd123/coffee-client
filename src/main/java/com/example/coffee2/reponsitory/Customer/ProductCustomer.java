package com.example.coffee2.reponsitory.Customer;


import com.example.coffee2.request.CoffeeBeanRequest;
import com.example.coffee2.request.ProductRequest;
import com.example.coffee2.response.CoffeeBeanResponse;
import com.example.coffee2.response.ProductResponse;

import java.util.List;

public interface ProductCustomer {
    List<ProductResponse> getListProduct(ProductRequest request);

    Long getCountListProduct(ProductRequest request);
}
