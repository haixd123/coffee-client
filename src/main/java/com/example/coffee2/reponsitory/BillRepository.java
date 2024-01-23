package com.example.coffee2.reponsitory;

import com.example.coffee2.entity.BillEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BillRepository extends JpaRepository<BillEntity, Long> {
}
