package com.example.coffee2.reponsitory.Customer.impl;


import com.example.coffee2.request.CommentRequest;
import com.example.coffee2.request.PostsRequest;
import com.example.coffee2.response.PostsResponse;
import com.example.coffee2.reponsitory.Customer.PostsRespositoryCustomer;
import com.example.coffee2.utils.FunctionUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Repository
public class PostsCustomerImpl implements PostsRespositoryCustomer {
//    @Override
//    public List<PostsResponse> getListPosts(PostsRequest request) {
//        return null;
//    }
//
//    @Override
//    public Long getCountListPosts(PostsRequest request) {
//        return null;
//    }

    //            @Autowired
//        @Qualifier("coffeeEntityManager")
//        private EntityManager entityManager;
//
//            @Qualifier("vnptcoreappEntityManager")
    @Autowired
    private final EntityManager entityManager;

    public PostsCustomerImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public List<PostsResponse> getListPosts(PostsRequest request) {
        try {
            StringBuilder sql = new StringBuilder();
            Map<String, Object> params = new HashMap<>();
            createSqlGetListPosts(request, sql, params, false);
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
            return FunctionUtils.mapping(query.getResultList(), PostsResponse.class);
        } catch (Exception e) {
            log.error("error1: " + e.getMessage());
        }
        return null;
    }

    public Long getCountListPosts(PostsRequest request) {
        try {
            StringBuilder sql = new StringBuilder();
            Map<String, Object> params = new HashMap<>();
            createSqlGetListPosts(request, sql, params, true);
            Query query = entityManager.createNativeQuery(sql.toString());
            if (params.size() > 0) {
                params.forEach((key, value) -> {
                    query.setParameter(key, value);
                });
            }
//            if (request.getPageIndex() != 0 && request.getPageSize() != 0) {
//                query.setFirstResult((request.getPageIndex() - 1) * request.getPageSize());
//                query.setMaxResults(request.getPageSize());
//            }
            Long count = ((Integer) query.getSingleResult()).longValue();
            return count;
        } catch (Exception e) {
            log.error("error2: " + e.getMessage());
        }
        return null;
    }

    private void createSqlGetListPosts(PostsRequest request, StringBuilder sql, Map<String, Object> params, boolean isCount) {
        log.info("request: " + request);
        if (isCount) {
            sql.append("select count(*) \n");

        } else {
//            sql.append("select f.* \n");
            sql.append("select \n");
            sql.append("f.id, \n");
            sql.append("f.total_like, \n");
            sql.append("f.total_share, \n");
            sql.append("f.total_comment, \n");
//            sql.append(" '' a, \n");
//            sql.append(" '' b, \n");
//            sql.append(" '' c, \n");
//            sql.append(" '' d, \n");
            sql.append("f.title, \n");
            sql.append("f.content_post, \n");
            sql.append("f.content_detail, \n");
            sql.append("f.status, \n");
            sql.append("f.image_path, \n");
            sql.append("f.user_id, \n");
            sql.append("f.created_at, \n");
            sql.append("f.updated_at, \n");
            sql.append("f.category \n");
        }
        sql.append("from \n");
        sql.append("posts f \n");
        sql.append("where f.status != -1 \n");
        if (request.getCategory() != null) {
            sql.append("and f.category = :category");
//            params.put("category", "%" + request.getCategory() + "%");
            params.put("category", request.getCategory());
        }
        if (request.getTitle() != null) {
            sql.append("and f.title = :title \n");
            params.put("title",request.getTitle());
//            params.put("title", "%" +  request.getTitle() + "%");
        }
//        if (request.getUserId() != null) {
//            sql.append("and f.user_id = :userId \n");
//            params.put("userId", request.getUserId());
//        }
        if (request.getSortLikeDown() == 1) {
            sql.append("ORDER BY f.total_like DESC");
        }
        if (request.getSortLikeUp() == 1) {
            sql.append("ORDER BY f.total_like ASC");
        }
        if (request.getSortCommentDown() == 1) {
            sql.append("ORDER BY f.total_comment DESC");
        }
        if (request.getSortCommentUp() == 1) {
            sql.append("ORDER BY f.total_comment ASC");
        }
    }

    public Long getTotalPosts(PostsRequest request) {
        try {
            StringBuilder sql = new StringBuilder();
            Map<String, Object> params = new HashMap<>();
            createSqlGetTotalPosts(request, sql, params);
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

    private void createSqlGetTotalPosts(PostsRequest request, StringBuilder sql, Map<String, Object> params) {
        sql.append("select sum(status) from posts  \n");
        sql.append("where 1 = 1 \n");
        sql.append("and user_id = :userId \n");
        params.put("userId", request.getUserId());
    }
}
