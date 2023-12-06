package com.example.coffee2.controller;

import com.example.coffee2.entity.CoffeeBeanEntity;
import com.example.coffee2.entity.ResponseObject;
import com.example.coffee2.reponsitory.CoffeeBeanRespository;
import com.example.coffee2.request.CoffeeBeanRequest;
import com.example.coffee2.request.PostsRequest;
import com.example.coffee2.response.CoffeeBeanResponse;
import com.example.coffee2.response.PostsResponse;
import com.example.coffee2.response.base.ApiBaseResponse;
import com.example.coffee2.service.coffeeBean.CoffeeBeanService;
import com.example.coffee2.utils.Constants;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Log4j2
//@CrossOrigin(origins = "*")
@RequestMapping(path = "api")
public class CoffeeBeanController {
    @Autowired
    private CoffeeBeanRespository repository;

    @Autowired
    private CoffeeBeanService coffeeBeanService;

    @GetMapping("/authors")
    ResponseEntity<ResponseObject> findAllCoffeeBean() {
        List<CoffeeBeanEntity> foundProduct = repository.findAllCoffeeBean();
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("ok", "get full product successfully", foundProduct)
        );
    }

    @PostMapping("/authors/coffee/search")
    public ApiBaseResponse getListCoffeeBean(@RequestBody CoffeeBeanRequest request) {
        List<CoffeeBeanResponse> listResult = coffeeBeanService.getListCoffeeBean(request);
        Long count = coffeeBeanService.getCountListCoffeeBean(request);
        ApiBaseResponse apiBaseResponse = new ApiBaseResponse();
        apiBaseResponse.setData(listResult);
        apiBaseResponse.setOptional(count);
        return apiBaseResponse;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/coffee/create")
//    @PreAuthorize("hasRole()")
    public ApiBaseResponse create(@RequestBody CoffeeBeanRequest request) {
        ApiBaseResponse apiBaseResponse = new ApiBaseResponse();
        boolean rs = coffeeBeanService.create(request);
        if(!rs) {
            apiBaseResponse.setErrorCode(Constants.CALL_API_CODE_FAIL);
            apiBaseResponse.setErrorDescription("Loại cafe đã tồn tại");
            apiBaseResponse.setData(request);
            apiBaseResponse.setOptional(1L);
            return apiBaseResponse;
        }
        apiBaseResponse.setErrorCode(Constants.CALL_API_CODE_SUCCESS);
        apiBaseResponse.setErrorDescription("Đã thêm loại cafe mới");
        apiBaseResponse.setData(request);
        apiBaseResponse.setOptional(1L);
        return apiBaseResponse;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/coffee/update")
    public ApiBaseResponse update(@RequestBody CoffeeBeanRequest request) {
        ApiBaseResponse apiBaseResponse = new ApiBaseResponse();
        boolean rs = coffeeBeanService.update(request);
        if(!rs) {
            apiBaseResponse.setErrorCode(Constants.CALL_API_CODE_FAIL);
            apiBaseResponse.setErrorDescription("Loại cafe đã tồn tại");
            apiBaseResponse.setData(request);
            apiBaseResponse.setOptional(1L);
            return apiBaseResponse;
        }
        apiBaseResponse.setErrorCode(Constants.CALL_API_CODE_SUCCESS);
        apiBaseResponse.setErrorDescription("Cập nhật thành công");
        apiBaseResponse.setData(request);
        apiBaseResponse.setOptional(1L);
        return apiBaseResponse;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/coffee/delete")
    public ApiBaseResponse delete(@RequestBody CoffeeBeanRequest request) {
        ApiBaseResponse apiBaseResponse = new ApiBaseResponse();
        boolean rs = coffeeBeanService.delete(request);
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
