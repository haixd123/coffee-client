package com.example.coffee2.controller;


import com.example.coffee2.entity.EquipmentEntity;
import com.example.coffee2.entity.ResponseObject;
import com.example.coffee2.reponsitory.EquipmentRespository;
import com.example.coffee2.request.CoffeeBeanRequest;
import com.example.coffee2.request.EquipmentRequest;
import com.example.coffee2.response.CoffeeBeanResponse;
import com.example.coffee2.response.EquipmentResponse;
import com.example.coffee2.response.base.ApiBaseResponse;
import com.example.coffee2.service.equipment.EquipmentService;
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
//@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(path = "api")
public class EquipmentController {
    @Autowired
    private EquipmentRespository repository;

    @Autowired
    private EquipmentService equipmentService;

//    @PreAuthorize("hasRole('USER')")
//    @GetMapping("")
//    ResponseEntity<ResponseObject> findAllEquipment() {
//        List<EquipmentEntity> foundProduct = repository.findAllEquipment();
//        return ResponseEntity.status(HttpStatus.OK).body(
//                new ResponseObject("ok", "get full product successfully", foundProduct)
//        );
//    }

    @PostMapping("/authors/equipment/search")
    public ApiBaseResponse getListEquipment(@RequestBody EquipmentRequest request) {
        List<EquipmentResponse> listResult = equipmentService.getListEquipment(request);
        Long count = equipmentService.getCountListEquipment(request);
        ApiBaseResponse apiBaseResponse = new ApiBaseResponse();
        apiBaseResponse.setData(listResult);
        apiBaseResponse.setOptional(count);
        return apiBaseResponse;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/equipment/create")
    public ApiBaseResponse create(@RequestBody EquipmentRequest request){
        ApiBaseResponse apiBaseResponse = new ApiBaseResponse();
        List<String> list = repository.findByName(request.getName());
        if(list.size() > 0) {
            apiBaseResponse.setErrorCode(Constants.CALL_API_CODE_FAIL);
            apiBaseResponse.setErrorDescription("Model đã tồn tại");
            apiBaseResponse.setData(request);
            apiBaseResponse.setOptional(1L);
            return apiBaseResponse;
        }
        boolean rs = equipmentService.create(request);
        if(!rs) {
            apiBaseResponse.setErrorCode(Constants.CALL_API_CODE_FAIL);
            apiBaseResponse.setErrorDescription("Thêm mới model không thành công");
            apiBaseResponse.setData(request);
            apiBaseResponse.setOptional(1L);
            return apiBaseResponse;
        }
        apiBaseResponse.setErrorCode(Constants.CALL_API_CODE_SUCCESS);
        apiBaseResponse.setErrorDescription("Thêm mới model thành công");
        apiBaseResponse.setData(request);
        apiBaseResponse.setOptional(1L);
        return apiBaseResponse;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/equipment/update")
    public ApiBaseResponse update(@RequestBody EquipmentRequest request) {
        ApiBaseResponse apiBaseResponse = new ApiBaseResponse();
        boolean rs = equipmentService.update(request);
        if(!rs) {
            apiBaseResponse.setErrorCode(Constants.CALL_API_CODE_FAIL);
            apiBaseResponse.setErrorDescription("Cập nhật model không thành công");
            apiBaseResponse.setData(request);
            apiBaseResponse.setOptional(1L);
            return apiBaseResponse;
        }
        apiBaseResponse.setErrorCode(Constants.CALL_API_CODE_SUCCESS);
        apiBaseResponse.setErrorDescription("Cập nhật model thành công");
        apiBaseResponse.setData(request);
        apiBaseResponse.setOptional(1L);
        return apiBaseResponse;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/equipment/delete")
    public ApiBaseResponse delete(@RequestBody EquipmentRequest request) {
        ApiBaseResponse apiBaseResponse = new ApiBaseResponse();
        boolean rs = equipmentService.delete(request);
        if(!rs) {
            apiBaseResponse.setErrorCode(Constants.CALL_API_CODE_FAIL);
            apiBaseResponse.setErrorDescription("Xoá model không thành công");
            apiBaseResponse.setData(request);
            apiBaseResponse.setOptional(1L);
            return apiBaseResponse;
        }
        apiBaseResponse.setErrorCode(Constants.CALL_API_CODE_SUCCESS);
        apiBaseResponse.setErrorDescription("Xóa model thành công");
        apiBaseResponse.setData(request);
        apiBaseResponse.setOptional(1L);
        return apiBaseResponse;
    }
}
