package com.example.coffee2.service.bill.impl;

import com.example.coffee2.entity.BillEntity;
import com.example.coffee2.reponsitory.BillRepository;
import com.example.coffee2.reponsitory.Customer.BillCustomer;
import com.example.coffee2.request.BillRequest;
import com.example.coffee2.response.BillResponse;
import com.example.coffee2.service.bill.BillService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Log4j2
public class BillServiceImpl implements BillService {
    @Autowired
    private BillRepository respository;

    @Autowired
    private BillCustomer billCustomer;

    @Override
    public List<BillResponse> getListBill(BillRequest request) {
        return billCustomer.getListBill(request);
    }

    @Override
    public Long getCountListBill(BillRequest request) {
        return billCustomer.getCountListBill(request);
    }

    @Override
    public boolean create(BillRequest request) {
        try {
            BillEntity obj = new BillEntity();
            obj.setName(request.getName());
            obj.setEmail(request.getEmail());
            obj.setPhone(request.getPhone());
            obj.setAddress(request.getAddress());
            obj.setDetail(request.getDetail());
            respository.save(obj);
            return true;
        } catch (Exception e) {
            log.error("error: " + e.getMessage());
            return false;
        }
    }

//    @Override
//    public boolean delete(BillRequest request) {
//        try {
//            BillEntity obj = new BillEntity();
//            obj.setName(request.getName());
//            obj.setEmail(request.getEmail());
//            obj.setPhone(request.getPhone());
//            obj.setAddress(request.getAddress());
//            obj.setDetail(request.getDetail());
//            respository.save(obj);
//            return true;
//        } catch (Exception e) {
//            log.error("error: " + e.getMessage());
//            return false;
//        }
//    }
}
