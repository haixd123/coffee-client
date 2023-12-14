package com.example.coffee2.reponsitory.Customer;

import com.example.coffee2.request.BillRequest;
import com.example.coffee2.request.CoffeeBeanRequest;
import com.example.coffee2.response.BillResponse;
import com.example.coffee2.response.CoffeeBeanResponse;

import java.util.List;

public interface BillCustomer {

    List<BillResponse> getListBill(BillRequest request);

    Long getCountListBill(BillRequest request);

}
