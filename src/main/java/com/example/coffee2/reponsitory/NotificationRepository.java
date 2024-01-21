package com.example.coffee2.reponsitory;

import com.example.coffee2.entity.Notification;
import com.example.coffee2.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findAllByUserOrderByCreatedAtDesc(UserEntity user);
}
