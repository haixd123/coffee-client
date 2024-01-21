package com.example.coffee2.service.bill;

import com.example.coffee2.entity.BillEntity;
import com.example.coffee2.request.BillRequest;
import com.example.coffee2.response.BillResponse;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.ParseException;
import java.util.List;

public interface BillService {

    List<BillResponse> getListBill(BillRequest request);

    Long getCountListBill(BillRequest request);

    boolean create(BillRequest request);
    BillEntity create(BillRequest request,boolean payed) throws ParseException;

    void updateBillPayed(Long id);

    void exprot(HttpServletResponse response, List<BillResponse> listResponse, BillRequest request) throws IOException;

}
