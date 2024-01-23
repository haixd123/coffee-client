package com.example.coffee2.reponsitory.Customer;

import com.example.coffee2.request.UserRequest;
import com.example.coffee2.response.UserResponse;

import java.util.List;

public interface UserCustomer {
    List<UserResponse> getListUser(UserRequest request);

    Long getCountListUser(UserRequest request);
}
