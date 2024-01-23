//package com.example.coffee2.service.LikeComment.impl;
//
//import com.example.coffee2.entity.LikeCommentEntity;
//import com.example.coffee2.reponsitory.Customer.LikeCommentCustomer;
//import com.example.coffee2.reponsitory.LikeCommentRepository;
//import com.example.coffee2.request.LikeCommentRequest;
//import com.example.coffee2.response.LikeCommentResponse;
//import com.example.coffee2.service.LikeComment.LikeCommentService;
//import lombok.extern.log4j.Log4j2;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//@Service
//@Log4j2
//public class LikeCommentServiceImpl implements LikeCommentService {
//    @Autowired
//    private LikeCommentRepository likeCommentRepository;
//
//    @Autowired
//    private LikeCommentCustomer likeCommentCustomer;
//
//    @Override
//    public List<LikeCommentResponse> getListLikeComment(LikeCommentRequest request) {
//        return likeCommentCustomer.getListLikeComment(request);
//
//    }
//
//    @Override
//    public boolean update(LikeCommentRequest request) {
//        try {
//
//            LikeCommentEntity obj1 = likeCommentRepository.findByPostIdAndUserIdAndCommentId(request.getPostId(), request.getUserId(), request.getCommentId());
//            List<LikeCommentEntity> checkExist = likeCommentRepository.findAllByPostIdAndUserIdAndCommentId(request.getPostId(), request.getUserId(), request.getCommentId());
//            if (checkExist.contains(obj1)) {
//                likeCommentRepository.delete(obj1);
//                return true;
//            }
//            if (obj1 == null) {
//                LikeCommentEntity obj = new LikeCommentEntity();
//                obj.setCommentId(request.getCommentId());
//                obj.setUserId(request.getUserId());
//                obj.setIsLikeComment(1L);
//                obj.setPostId(request.getPostId());
//                likeCommentRepository.save(obj);
//                return true;
//            }
//        } catch (Exception e) {
//            log.error("not success: " + e.getMessage());
//            return false;
//        }
//        return false;
//    }
//
//}
