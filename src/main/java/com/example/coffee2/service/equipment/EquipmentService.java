package com.example.coffee2.service.equipment;


import com.example.coffee2.entity.EquipmentEntity;
import com.example.coffee2.request.EquipmentRequest;
import com.example.coffee2.response.EquipmentResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface EquipmentService {
    List<EquipmentResponse> getListEquipment(EquipmentRequest request);

    Long getCountListEquipment(EquipmentRequest request);

    boolean create(EquipmentRequest request);

    boolean update(EquipmentRequest request);

    boolean delete(EquipmentRequest request);
}
