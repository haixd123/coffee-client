package com.example.coffee2.reponsitory.Customer.impl;

import com.example.coffee2.reponsitory.Customer.SavePostsCustomer;
import com.example.coffee2.request.LikePostsRequest;
import com.example.coffee2.request.SavePostsRequest;
import com.example.coffee2.response.LikePostsResponse;
import com.example.coffee2.response.SavePostsResponse;
import com.example.coffee2.utils.FunctionUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Repository
public class SavePostsCustomerImpl implements SavePostsCustomer {
    @Autowired
    private final EntityManager entityManager;

    public SavePostsCustomerImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public List<SavePostsResponse> getListSavePosts(SavePostsRequest request) {
        try {
            StringBuilder sql = new StringBuilder();
            Map<String, Object> params = new HashMap<>();
            createSqlGetListSavePosts(request, sql, params, false);
            Query query = entityManager.createNativeQuery(sql.toString());
            if (params.size() > 0) {
                params.forEach((key, value) -> {
                    query.setParameter(key, value);
                });
            }
            if (request.getPageIndex() != 0 && request.getPageSize() != 0) {
                query.setFirstResult((request.getPageIndex() - 1) * request.getPageSize());
                query.setMaxResults(request.getPageSize());
            }
            return FunctionUtils.mapping(query.getResultList(), SavePostsResponse.class);
        } catch (Exception e) {
            log.error("error1: " + e.getMessage());
        }
        return null;
    }

    public Long getCountListSavePosts(SavePostsRequest request) {
        try {
            StringBuilder sql = new StringBuilder();
            Map<String, Object> params = new HashMap<>();
            createSqlGetListSavePosts(request, sql, params, true);
            Query query = entityManager.createNativeQuery(sql.toString());
            if (params.size() > 0) {
                params.forEach((key, value) -> {
                    query.setParameter(key, value);
                });
            }

            Long count = ((Integer) query.getSingleResult()).longValue();
            return count;
        } catch (Exception e) {
            log.error("error2: " + e.getMessage());
        }
        return null;
    }

    private void createSqlGetListSavePosts(SavePostsRequest request, StringBuilder sql, Map<String, Object> params, boolean isCount) {
        if (isCount) {
            sql.append("select count(*) \n");
            sql.append("from \n");
            sql.append("save_posts f \n");
            if (request.getUserId() != null) {
                sql.append(" and userId = :userId \n");
                params.put("userId", request.getUserId());
            }
//            if (request.getStatus() != null) {
//                sql.append(" and status = :userId \n");
//                params.put("userId", request.getUserId());
//            }
        } else {
            sql.append("select \n");
            sql.append("f.id, \n");
            sql.append("f.user_id, \n");
            sql.append("f.post_id, \n");
            sql.append("f.is_save \n");
            sql.append("from \n");
            sql.append("save_posts f \n");
            if (request.getUserId() != null) {
                sql.append(" and userId = :userId \n");
                params.put("userId", request.getUserId());
            }

        }
    }
}
