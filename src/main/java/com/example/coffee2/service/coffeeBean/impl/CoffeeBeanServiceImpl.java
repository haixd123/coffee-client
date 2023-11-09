package com.example.coffee2.service.coffeeBean.impl;

import com.example.coffee2.entity.CoffeeBeanEntity;
import com.example.coffee2.reponsitory.CoffeeBeanRespository;
import com.example.coffee2.reponsitory.Customer.CoffeeBeanCustomer;
import com.example.coffee2.request.CoffeeBeanRequest;
import com.example.coffee2.response.CoffeeBeanResponse;
import com.example.coffee2.service.coffeeBean.CoffeeBeanService;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.lang3.RandomUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Random;
import java.util.RandomAccess;

@Service
@Log4j2
public class CoffeeBeanServiceImpl implements CoffeeBeanService {
    @Autowired
    private CoffeeBeanRespository respository;

    @Autowired
    private CoffeeBeanCustomer coffeeBeanCustomer;

    @Override
    public List<CoffeeBeanResponse> getListCoffeeBean(CoffeeBeanRequest request) {
        return coffeeBeanCustomer.getListCoffeeBean(request);
    }

    @Override
    public Long getCountListCoffeeBean(CoffeeBeanRequest request) {
        return coffeeBeanCustomer.getCountListCoffeeBean(request);
    }

    @Override
    public boolean create(CoffeeBeanRequest request) {
        try {
            List<String> checkNameExist = respository.findAllCoffeeBeanName(request.getName());
            if (checkNameExist.contains(request.getName())) {
                log.error("Loại cafe đã tồn tại!");
                return false;
            }
            CoffeeBeanEntity obj = new CoffeeBeanEntity();
            obj.setName(request.getName());
            obj.setTitle(request.getTitle());
            obj.setPopular(request.getPopular());
            obj.setDescription(request.getDescription());
            obj.setOrigin(request.getOrigin());
            obj.setPlantingInstructions(request.getPlantingInstructions());
            obj.setStatus(1L);
            obj.setContentCoffee(request.getContentCoffee());
            obj.setImage(request.getImage());
            respository.save(obj);
            return true;
        } catch (Exception e) {
            log.error("error: " + e.getMessage());
            return false;
        }
    }

    public boolean update(CoffeeBeanRequest request) {
        try {
//            List<String> checkNameExist = respository.getAllByName((request.getName()));
//            if (checkNameExist.contains(request.getName())) {
//                log.error("Loại cafe đã tồn tại!");
//                return false;
//            }
            CoffeeBeanEntity obj = respository.findById(request.getId()).orElse(null);
            obj.setName(request.getName());
            obj.setTitle(request.getTitle());
            obj.setPopular(request.getPopular());
            obj.setDescription(request.getDescription());
            obj.setOrigin(request.getOrigin());
            obj.setPlantingInstructions(request.getPlantingInstructions());
            obj.setStatus(request.getStatus());
            obj.setContentCoffee(request.getContentCoffee());
//            obj.setSlug(request.getSlug());
            obj.setImage(request.getImage());
            respository.save(obj);
            return true;
        } catch (Exception e) {
            log.error("error: " + e.getMessage());
            return false;
        }
    }

    public boolean delete(CoffeeBeanRequest request) {
        try {
            CoffeeBeanEntity obj = respository.findById(request.getId()).orElse(null);
            obj.setStatus(-1L);
            respository.save(obj);
            return true;
        } catch (Exception e) {
            log.error("not success: " + e.getMessage());
            return false;
        }

    }
}
