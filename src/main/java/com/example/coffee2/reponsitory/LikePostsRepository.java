package com.example.coffee2.reponsitory;

import com.example.coffee2.entity.LikePostsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface LikePostsRepository extends JpaRepository<LikePostsEntity, Long> {

//    List<LikePostsEntity> findByPostId(@RequestParam Long postId);

//    List<LikePostsEntity> findByUserId(@RequestParam Long userId);

    LikePostsEntity findByPostIdAndUserId(@RequestParam Long postId, @RequestParam Long userId);

    List<LikePostsEntity> findAllByPostIdAndUserId(Long postId, Long userId);
}
