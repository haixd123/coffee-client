//package com.example.coffee2.reponsitory;
//
//import com.example.coffee2.entity.LikeCommentEntity;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.web.bind.annotation.RequestParam;
//
//import java.util.List;
//
//public interface LikeCommentRepository extends JpaRepository<LikeCommentEntity, Long> {
//    LikeCommentEntity findByPostIdAndUserIdAndCommentId(@RequestParam Long postId, @RequestParam Long userId, @RequestParam Long commentId);
//
//    List<LikeCommentEntity> findAllByPostIdAndUserIdAndCommentId(@RequestParam Long postId, @RequestParam Long userId, @RequestParam Long commentId);
//}
