package com.example.coffee2.service.product.impl;

import com.example.coffee2.entity.ProductEntity;
import com.example.coffee2.reponsitory.Customer.ProductCustomer;
import com.example.coffee2.reponsitory.ProductRepository;
import com.example.coffee2.request.ProductRequest;
import com.example.coffee2.response.ProductResponse;
import com.example.coffee2.service.product.ProductService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Objects;

@Service
@Log4j2
public class ProductImpl implements ProductService {
    @Autowired
    private ProductCustomer productCustomer;

    @Autowired
    private ProductRepository repository;

    @Override
    public List<ProductResponse> getListProduct(ProductRequest request) {
        return productCustomer.getListProduct(request);
    }

    @Override
    public Long getCountListProduct(ProductRequest request) {
        return productCustomer.getCountListProduct(request);
    }

    @Override
    public boolean create(ProductRequest request) {
        Date now = new Date();
        try {
            ProductEntity checkNameExist = repository.findByName(request.getName());
            List<String> checkSkuExist = repository.findBySku(request.getName());

            if (checkNameExist != null || checkSkuExist.contains(request.getSku())) {
                log.error("create | Tên sản phẩm hoặc phân loại sản phẩm đã tồn tại");
                return false;
            }
            ProductEntity obj = new ProductEntity();
            obj.setName(request.getName());
            obj.setDescription(request.getDescription());
            obj.setSku(request.getSku());
            obj.setPrice(request.getPrice());
            obj.setCategory(request.getCategory());
            obj.setDiscount(request.getDiscount());
            obj.setRemaining(request.getRemaining());
            obj.setImage(request.getImage());
            obj.setStatus(1L);
            obj.setDetail(request.getDetail());
            repository.save(obj);
            return true;
        } catch (Exception e) {
            log.info("not success: " + e.getMessage());
            return false;
        }
    }

    @Override
    public boolean update(ProductRequest request) {
        Date now = new Date();
        try {
            ProductEntity checkNameExist = repository.findByName(request.getName());

            ProductEntity obj = repository.findById(request.getId()).orElse(null);
            if (checkNameExist != null && !Objects.equals(checkNameExist.getId(), request.getId())) {
                log.error("update | không tìm thấy bản ghi");
                return false;
            }
            obj.setName(request.getName());
            obj.setDescription(request.getDescription());
            obj.setSku(request.getSku());
            obj.setPrice(request.getPrice());
            obj.setCategory(request.getCategory());
            obj.setDiscount(request.getDiscount());
            obj.setRemaining(request.getRemaining());
            obj.setImage(request.getImage());
            obj.setStatus(1L);
            obj.setDetail(request.getDetail());
            repository.save(obj);
            return true;
        } catch (Exception e) {
            log.info("not success: " + e.getMessage());
            return false;
        }
    }

    @Override
    public boolean delete(ProductRequest request) {
        try {
            ProductEntity obj = repository.findById(request.getId()).orElse(null);
//            PostsEntity obj = repository.getPostsEntityByID(request.getId());
            if (obj == null) {
                log.error("delete | không tìm thấy bản ghi");
                return false;
            }
            obj.setStatus(-1L);
            repository.save(obj);
            return true;
        } catch (Exception e) {
            log.info("not success: " + e.getMessage());
            return false;
        }
    }
}
