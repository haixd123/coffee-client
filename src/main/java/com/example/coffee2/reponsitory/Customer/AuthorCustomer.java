package com.example.coffee2.reponsitory.Customer;

import com.example.coffee2.dto.UserDto;
import com.example.coffee2.response.AuthResponse;

public interface AuthorCustomer {
    boolean registerAuthor(UserDto userDto);
    AuthResponse loginAuthor(UserDto userDto);
//    boolean loginAuthor(UserDto userDto);
}
