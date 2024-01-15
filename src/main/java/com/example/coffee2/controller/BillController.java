package com.example.coffee2.controller;


import com.example.coffee2.request.BillRequest;
import com.example.coffee2.request.CoffeeBeanRequest;
import com.example.coffee2.response.BillResponse;
import com.example.coffee2.response.CoffeeBeanResponse;
import com.example.coffee2.response.base.ApiBaseResponse;
import com.example.coffee2.service.bill.BillService;
import com.example.coffee2.utils.Constants;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@Log4j2
//@CrossOrigin(origins = "*")
@RequestMapping(path = "api")
public class BillController {
    @Autowired
    private BillService billService;

    @PostMapping("/authors/bill/search")
    public ApiBaseResponse getListBill(@RequestBody BillRequest request) {
        List<BillResponse> listResult = billService.getListBill(request);
        log.info("listResult: " + listResult);
        Long count = billService.getCountListBill(request);
        ApiBaseResponse apiBaseResponse = new ApiBaseResponse();
        apiBaseResponse.setData(listResult);
        apiBaseResponse.setOptional(count);
        return apiBaseResponse;
    }

    @PostMapping("/authors/bill/create")
    public ApiBaseResponse create(@RequestBody BillRequest request) {
        ApiBaseResponse apiBaseResponse = new ApiBaseResponse();
        boolean rs = billService.create(request);
//        if(!rs) {
//            apiBaseResponse.setErrorCode(Constants.CALL_API_CODE_FAIL);
//            apiBaseResponse.setErrorDescription("Loại cafe đã tồn tại");
//            apiBaseResponse.setData(request);
//            apiBaseResponse.setOptional(1L);
//            return apiBaseResponse;
//        }
//        apiBaseResponse.setErrorCode(Constants.CALL_API_CODE_SUCCESS);
//        apiBaseResponse.setErrorDescription("Đã thêm loại cafe mới");
//        apiBaseResponse.setData(request);
//        apiBaseResponse.setOptional(1L);
        return apiBaseResponse;
    }

    @PostMapping("/authors/bill/export")
    public void export(HttpServletResponse response, @RequestBody BillRequest request) throws Exception {
        List<BillResponse> listResult = billService.getListBill(request);
        billService.exprot(response, listResult, request);
//        log.info("listResult: " + listResult);
//        Long count = billService.getCountListBill(request);
//        ApiBaseResponse apiBaseResponse = new ApiBaseResponse();
//        apiBaseResponse.setData(listResult);
//        apiBaseResponse.setOptional(count);
//        return apiBaseResponse;
    }

//    @PostMapping("/exprotFmisAccountNumber")
//    public void exprotFmisAccountNumber(HttpServletResponse response, @RequestBody FmisAccountNumberRequest request) throws Exception {
//        List<FmisAccountNumberResponse> listResponse = responsitoryInterface.listManagerAccountNumber(request);
//        responsitoryInterface.exprot(response, listResponse, request);
//    }
}
