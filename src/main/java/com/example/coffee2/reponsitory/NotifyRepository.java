package com.example.coffee2.reponsitory;

import com.example.coffee2.entity.NotifyEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Optional;

public interface NotifyRepository extends JpaRepository<NotifyEntity, Long> {
//    @Query(
//            value = "SELECT e.comment_id FROM notify e where e.comment_id = :commentId",
//            nativeQuery = true
//    )
    Optional<NotifyEntity> findByCommentId(@RequestParam String commentId);
}
