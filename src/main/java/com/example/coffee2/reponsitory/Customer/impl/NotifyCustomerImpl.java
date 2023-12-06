package com.example.coffee2.reponsitory.Customer.impl;

import com.example.coffee2.reponsitory.Customer.NotifyCustomer;
import com.example.coffee2.request.LikePostsRequest;
import com.example.coffee2.request.NotifyRequest;
import com.example.coffee2.response.LikePostsResponse;
import com.example.coffee2.response.NotifyResponse;
import com.example.coffee2.utils.FunctionUtils;
import com.example.coffee2.utils.TransformObjToCamel;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.query.NativeQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Repository
public class NotifyCustomerImpl implements NotifyCustomer {
    @Autowired
    private final EntityManager entityManager;

    public NotifyCustomerImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public List<NotifyResponse> createSqlGetListfromUser() {
        try {
            StringBuilder sql = new StringBuilder();
            Map<String, Object> params = new HashMap<>();
            createSqlGetListfromUser(sql, params, false);
//            Query query = entityManager.createNativeQuery(sql.toString());
            Query query = entityManager.createNativeQuery(sql.toString()).unwrap(NativeQuery.class).setResultTransformer(new TransformObjToCamel());
            if (params.size() > 0) {
                params.forEach((key, value) -> {
                    query.setParameter(key, value);
                });
            }
//            return FunctionUtils.mapping(query.getResultList(), NotifyResponse.class);
            return query.getResultList();
        } catch (Exception e) {
            log.error("error1: " + e.getMessage());
        }
        return null;
    }

    public List<NotifyResponse> createSqlGetListIsCommentPost() {
        try {
            StringBuilder sql = new StringBuilder();
            Map<String, Object> params = new HashMap<>();
            createSqlGetListIsCommentPost(sql, params, false);
//            Query query = entityManager.createNativeQuery(sql.toString());
            Query query = entityManager.createNativeQuery(sql.toString()).unwrap(NativeQuery.class).setResultTransformer(new TransformObjToCamel());
            if (params.size() > 0) {
                params.forEach((key, value) -> {
                    query.setParameter(key, value);
                });
            }
//            return FunctionUtils.mapping(query.getResultList(), NotifyResponse.class);
            return query.getResultList();
        } catch (Exception e) {
            log.error("error1: " + e.getMessage());
        }
        return null;
    }

    public List<NotifyResponse> createSqlGetListIsReplyComment() {
        try {
            StringBuilder sql = new StringBuilder();
            Map<String, Object> params = new HashMap<>();
            createSqlGetListIsReplyComment(sql, params, false);
//            Query query = entityManager.createNativeQuery(sql.toString());
            Query query = entityManager.createNativeQuery(sql.toString()).unwrap(NativeQuery.class).setResultTransformer(new TransformObjToCamel());
            if (params.size() > 0) {
                params.forEach((key, value) -> {
                    query.setParameter(key, value);
                });
            }
//            return FunctionUtils.mapping(query.getResultList(), NotifyResponse.class);
            return query.getResultList();
        } catch (Exception e) {
            log.error("error1: " + e.getMessage());
        }
        return null;
    }

    private void createSqlGetListfromUser(StringBuilder sql, Map<String, Object> params, boolean isCount) {
        if (!isCount) {
            //Người gửi
            sql.append("select user1.name, notify.id from user1,notify \n" +
                    "where user1.id = notify.user_id \n");
        }
    }

    private void createSqlGetListIsCommentPost(StringBuilder sql, Map<String, Object> params, boolean isCount) {
        if (!isCount) {

            //Người nhận khi user comment
            sql.append("select user1.name, notify.comment_id, notify.id, posts.image_path from notify,user1,posts \n" +
                    "where notify.user_id = user1.id and posts.id = notify.post_id \n");


        }
    }

    private void createSqlGetListIsReplyComment(StringBuilder sql, Map<String, Object> params, boolean isCount) {
        if (!isCount) {

            //Người nhận khi user reply comment
            sql.append("select user1.name, notify.comment_id, notify.id, posts.image_path from notify,user1,comment, posts \n" +
                    "where notify.user_id = user1.id and comment.comment_id = notify.comment_id and notify.post_id = posts.id");
        }
    }
}
