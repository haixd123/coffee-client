package com.example.coffee2.reponsitory.Customer;

import com.example.coffee2.request.EquipmentRequest;
import com.example.coffee2.request.PostsRequest;
import com.example.coffee2.response.EquipmentResponse;
import com.example.coffee2.response.PostsResponse;

import java.util.List;

public interface EquipmentCustomer {
    List<EquipmentResponse> getListEquipment(EquipmentRequest request);

    Long getCountListEquipment(EquipmentRequest request);
}
