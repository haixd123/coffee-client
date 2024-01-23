package com.example.coffee2.reponsitory;

import com.example.coffee2.entity.CommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CommentRepository extends JpaRepository<CommentEntity, Long> {

    Optional<CommentEntity> findByCommentId(Long commentId);
}
