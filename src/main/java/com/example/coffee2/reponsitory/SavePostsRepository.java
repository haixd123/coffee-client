package com.example.coffee2.reponsitory;

import com.example.coffee2.entity.SavePostsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface SavePostsRepository extends JpaRepository<SavePostsEntity, Long> {
    SavePostsEntity findByPostIdAndUserId(Long postId, Long userId);

    List<SavePostsEntity> findAllByPostIdAndUserId(Long postId, Long userId);
}
