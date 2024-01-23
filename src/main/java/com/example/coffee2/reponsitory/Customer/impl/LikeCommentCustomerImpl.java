//package com.example.coffee2.reponsitory.Customer.impl;
//
//import com.example.coffee2.reponsitory.Customer.LikeCommentCustomer;
//import com.example.coffee2.request.LikeCommentRequest;
//import com.example.coffee2.request.NotifyRequest;
//import com.example.coffee2.response.LikeCommentResponse;
//import com.example.coffee2.response.NotifyResponse;
//import com.example.coffee2.utils.FunctionUtils;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Repository;
//
//import javax.persistence.EntityManager;
//import javax.persistence.Query;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//@Slf4j
//@Repository
//public class LikeCommentCustomerImpl implements LikeCommentCustomer {
//    @Autowired
//    private final EntityManager entityManager;
//
//    public LikeCommentCustomerImpl(EntityManager entityManager) {
//        this.entityManager = entityManager;
//    }
//
//    public List<LikeCommentResponse> getListLikeComment(LikeCommentRequest request) {
//        try {
//            StringBuilder sql = new StringBuilder();
//            Map<String, Object> params = new HashMap<>();
//            createSqlGetListLikeComment(request, sql, params, false);
//            Query query = entityManager.createNativeQuery(sql.toString());
//            if (params.size() > 0) {
//                params.forEach((key, value) -> {
//                    query.setParameter(key, value);
//                });
//            }
//            return FunctionUtils.mapping(query.getResultList(), LikeCommentResponse.class);
//        } catch (Exception e) {
//            log.error("error1: " + e.getMessage());
//        }
//        return null;
//    }
//
//    private void createSqlGetListLikeComment(LikeCommentRequest request, StringBuilder sql, Map<String, Object> params, boolean isCount) {
//        if (!isCount) {
//            sql.append("select \n");
//            sql.append("f.id, \n");
//            sql.append("f.comment_id, \n");
//            sql.append("f.user_id, \n");
//            sql.append("f.is_like_comment, \n");
//            sql.append("f.post_id \n");
//            sql.append("from \n");
//            sql.append("like_comments f \n");
////            if (request.getToUser() != null) {
////                sql.append(" where 1=1 ");
////                sql.append("and f.to_user = :toUser \n");
////                params.put("toUser", request.getToUser());
////            }
//        }
//    }
//}
