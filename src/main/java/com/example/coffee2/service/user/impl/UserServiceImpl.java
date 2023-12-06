package com.example.coffee2.service.user.impl;

import com.example.coffee2.entity.UserEntity;
import com.example.coffee2.reponsitory.Customer.UserCustomer;
import com.example.coffee2.reponsitory.UserRespository;
import com.example.coffee2.request.UserRequest;
import com.example.coffee2.response.UserResponse;
import com.example.coffee2.service.user.UserService;
import com.example.coffee2.utils.DateProc;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Service
@Log4j2
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRespository respository;

    @Autowired
    private UserCustomer userCustomer;

//    @Autowired
//    private PasswordEncoder passwordEncoder;

//    @Override
//    public String addUser(UserDto userDto) {

//        UserEntity obj = new UserEntity(
//                userDto.getId(),
//                userDto.getUserName(),
//                userDto.getEmail(),
//                this.passwordEncoder.encode(userDto.getPassWord())
//        );

//        respository.save(obj);
//
//        return obj.getUserName();
//    }


    @Override
    public List<UserResponse> getListUser(UserRequest request) {
        return userCustomer.getListUser(request);
    }

    @Override
    public Long getCountListUser(UserRequest request) {
        return userCustomer.getCountListUser(request);
    }

    @Override
    public boolean create(UserRequest request) {
        Date now = new Date();
        try {
            List<String> checkNameExist = respository.findAllUserName();
            if (checkNameExist.contains(request.getUserName())) {
                log.error("Tài khoản đã tồn tại");
                return false;
            }
            UserEntity obj = new UserEntity();
            obj.setUserName(request.getUserName());
//            obj.setPassWord(request.getPassWord());
            obj.setEmail(request.getEmail());
            obj.setName(request.getName());
//            obj.setAddress(request.getAddress());
//            obj.setAge(request.getAge());
            obj.setRole(request.getRole());
            obj.setPhoneNumber(request.getPhoneNumber());
            obj.setDateOfBirth(DateProc.stringToDateDDMMYYYY(request.getDateOfBirth()));
            obj.setSex(request.getSex());
            obj.setCreateDate(now);
            obj.setStatus(1L);
            obj.setImage(request.getImage());
            respository.save(obj);
            return true;
        } catch (Exception e) {
            log.error("not success: " + e.getMessage());
        }
        return false;
    }

    @Override
    public boolean update(UserRequest request) {
        Date now = new Date();
        try {
            UserEntity obj = respository.findById(request.getId()).orElse(null);
//            PostsEntity obj = repository.getPostsEntityByID(request.getId());
            if (obj == null) {
                log.error("update | không tìm thấy bản ghi");
                return false;
            }
            obj.setUserName(request.getUserName());
//            obj.setPassWord(request.getPassWord());
            obj.setEmail(request.getEmail());
            obj.setName(request.getName());
//            obj.setAddress(request.getAddress());
//            obj.setAge(request.getAge());
            obj.setRole(request.getRole());
            obj.setPhoneNumber(request.getPhoneNumber());
//            obj.setDateOfBirth(DateProc.stringToDateDDMMYYYY(request.getDateOfBirth()));
            obj.setDateOfBirth(null);
            obj.setSex(request.getSex());
//            obj.setCreateDate(DateProc.stringToDateDDMMYYYY(request.getCreateDate()));
            obj.setCreateDate(now);
            obj.setStatus(request.getStatus());
            obj.setImage(request.getImage());
            respository.save(obj);
            return true;

        } catch (Exception e) {
            log.info("not success: " + e.getMessage());
            return false;
        }
    }

    @Override
    public boolean updateInfo(UserRequest request) {
        try {
            UserEntity obj = respository.findById(request.getId()).orElse(null);
//            PostsEntity obj = repository.getPostsEntityByID(request.getId());
            if (obj == null) {
                log.error("update | không tìm thấy bản ghi");
                return false;
            }
            obj.setName(request.getName());
            obj.setPhoneNumber(request.getPhoneNumber());
            obj.setDateOfBirth(DateProc.stringToDateDDMMYYYY(request.getDateOfBirth()));
            obj.setSex(request.getSex());
            obj.setImage(request.getImage());
            obj.setEmail(request.getEmail());
            respository.save(obj);
            return true;

        } catch (Exception e) {
            log.info("not success: " + e.getMessage());
            return false;
        }
    }

    @Override
    public boolean delete(UserRequest request) {
        try {
            UserEntity obj = respository.findById(request.getId()).orElse(null);
//            PostsEntity obj = repository.getPostsEntityByID(request.getId());
            if (obj == null) {
                log.error("delete | không tìm thấy bản ghi");
                return false;
            }
            obj.setStatus(-1L);
            respository.save(obj);
            return true;
        } catch (Exception e) {
            log.info("not success: " + e.getMessage());
            return false;
        }
    }

    @Override
    public UserEntity findByUserNameAndStatus(String username) {
        return respository.findByUserNameAndStatus(username,1l).get();
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity user =respository.findByUserNameAndStatus(username,1l).get();

        List<GrantedAuthority> roles = new ArrayList<>();
        String role = user.getRole();
        GrantedAuthority grantedAuthority = new GrantedAuthority() {
            @Override
            public String getAuthority() {
                return role;
            }
        };
        roles.add(grantedAuthority);

        return new User(username, user.getPassWord(),roles);
    }
}


