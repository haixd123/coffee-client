package com.example.coffee2.service.product;

import com.example.coffee2.request.ProductRequest;
import com.example.coffee2.response.ProductResponse;

import java.util.List;

public interface ProductService {
    List<ProductResponse> getListProduct(ProductRequest request);

    Long getCountListProduct(ProductRequest request);

    boolean create(ProductRequest request);

    boolean update(ProductRequest request);

    boolean delete(ProductRequest request);
}
