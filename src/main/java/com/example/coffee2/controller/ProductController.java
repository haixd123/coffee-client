package com.example.coffee2.controller;

import com.example.coffee2.reponsitory.CoffeeBeanRespository;
import com.example.coffee2.reponsitory.ProductRepository;
import com.example.coffee2.request.CoffeeBeanRequest;
import com.example.coffee2.request.ProductRequest;
import com.example.coffee2.response.CoffeeBeanResponse;
import com.example.coffee2.response.ProductResponse;
import com.example.coffee2.response.base.ApiBaseResponse;
import com.example.coffee2.service.coffeeBean.CoffeeBeanService;
import com.example.coffee2.service.product.ProductService;
import com.example.coffee2.utils.Constants;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Log4j2
@RequestMapping(path = "api")
public class ProductController {
    @Autowired
    private ProductRepository repository;

    @Autowired
    private ProductService productService;

    @PostMapping("/authors/product/search")
    public ApiBaseResponse getListCoffeeBean(@RequestBody ProductRequest request) {
        List<ProductResponse> listResult = productService.getListProduct(request);
        Long count = productService.getCountListProduct(request);
        ApiBaseResponse apiBaseResponse = new ApiBaseResponse();
        apiBaseResponse.setData(listResult);
        apiBaseResponse.setOptional(count);
        return apiBaseResponse;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/product/create")
//    @PreAuthorize("hasRole()")
    public ApiBaseResponse create(@RequestBody ProductRequest request) {
        ApiBaseResponse apiBaseResponse = new ApiBaseResponse();
        boolean rs = productService.create(request);
        if(!rs) {
            apiBaseResponse.setErrorCode(Constants.CALL_API_CODE_FAIL);
            apiBaseResponse.setErrorDescription("Sản phẩm đã tồn tại");
            apiBaseResponse.setData(request);
            apiBaseResponse.setOptional(1L);
            return apiBaseResponse;
        }
        apiBaseResponse.setErrorCode(Constants.CALL_API_CODE_SUCCESS);
        apiBaseResponse.setErrorDescription("Thêm sản phẩm mới thành công");
        apiBaseResponse.setData(request);
        apiBaseResponse.setOptional(1L);
        return apiBaseResponse;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/product/update")
    public ApiBaseResponse update(@RequestBody ProductRequest request) {
        ApiBaseResponse apiBaseResponse = new ApiBaseResponse();
        boolean rs = productService.update(request);
        if(!rs) {
            apiBaseResponse.setErrorCode(Constants.CALL_API_CODE_FAIL);
            apiBaseResponse.setErrorDescription("Sản phẩm đã tồn tại");
            apiBaseResponse.setData(request);
            apiBaseResponse.setOptional(1L);
            return apiBaseResponse;
        }
        apiBaseResponse.setErrorCode(Constants.CALL_API_CODE_SUCCESS);
        apiBaseResponse.setErrorDescription("Cập nhật phẩm mới thành công");
        apiBaseResponse.setData(request);
        apiBaseResponse.setOptional(1L);
        return apiBaseResponse;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/product/delete")
    public ApiBaseResponse delete(@RequestBody ProductRequest request) {
        ApiBaseResponse apiBaseResponse = new ApiBaseResponse();
        boolean rs = productService.delete(request);
        if(!rs) {
            apiBaseResponse.setErrorCode(Constants.CALL_API_CODE_FAIL);
            apiBaseResponse.setErrorDescription("Xóa không thành công");
            apiBaseResponse.setData(request);
            apiBaseResponse.setOptional(1L);
            return apiBaseResponse;
        }
        apiBaseResponse.setErrorCode(Constants.CALL_API_CODE_SUCCESS);
        apiBaseResponse.setErrorDescription("Xoá thành công");
        apiBaseResponse.setData(request);
        apiBaseResponse.setOptional(1L);
        return apiBaseResponse;
    }
}
