package com.example.coffee2.service.equipment.impl;

import com.example.coffee2.entity.CoffeeBeanEntity;
import com.example.coffee2.entity.EquipmentEntity;
import com.example.coffee2.reponsitory.Customer.EquipmentCustomer;
import com.example.coffee2.reponsitory.EquipmentRespository;
import com.example.coffee2.request.EquipmentRequest;
import com.example.coffee2.response.EquipmentResponse;
import com.example.coffee2.service.equipment.EquipmentService;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.lang3.RandomUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Log4j2
public class EquipmentServiceImpl implements EquipmentService {
    @Autowired
    private EquipmentRespository respository;

    @Autowired
    private EquipmentCustomer equipmentCustomer;

    @Override
    public List<EquipmentResponse> getListEquipment(EquipmentRequest request) {
        return equipmentCustomer.getListEquipment(request);
    }

    @Override
    public Long getCountListEquipment(EquipmentRequest request) {
        return equipmentCustomer.getCountListEquipment(request);
    }

    @Override
    public boolean create(EquipmentRequest request) {
        try {
            List<String> chechNameExist = respository.findAllByName(request.getName());

            if (chechNameExist.contains(request.getName())) {
                log.error("model đã tồn tại");
                return false;
            }
            EquipmentEntity obj = new EquipmentEntity();
            obj.setName(request.getName());
            obj.setTitle(request.getTitle());
            obj.setContentEquipment(request.getContentEquipment());
            obj.setImage(request.getImage());
            obj.setStatus(1L);
            respository.save(obj);
            return true;

        } catch (Exception e) {
            log.error("not success: " + e.getMessage());
            return false;
        }
    }

    @Override
    public boolean update(EquipmentRequest request) {
        try {
            List<String> chechNameExist = respository.findAllByName(request.getName());
//            if (chechNameExist.contains(request.getModel())) {
//                log.error("model đã tồn tại");
//                return false;
//            }
            EquipmentEntity obj = respository.findById(request.getId()).orElse(null);
            obj.setName(request.getName());
            obj.setTitle(request.getTitle());
            obj.setContentEquipment(request.getContentEquipment());
            obj.setImage(request.getImage());
            obj.setStatus(request.getStatus());
            respository.save(obj);
            return true;
        } catch (Exception e) {
            log.error("not success: " + e.getMessage());
            return false;
        }
    }

    @Override
    public boolean delete(EquipmentRequest request) {
        try {
            EquipmentEntity obj = respository.findById(request.getId()).orElse(null);
            obj.setStatus(-1L);
            respository.save(obj);
            return true;
        } catch (Exception e) {
            log.error("not success: " + e.getMessage());
            return false;
        }
    }
}
