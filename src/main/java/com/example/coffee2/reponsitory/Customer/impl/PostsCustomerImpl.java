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
            sql.append("select count(*) ");
        } else {
//            sql.append("select f.* ");
            sql.append("select ");
            sql.append("f.id, ");
            sql.append("f.total_like, ");
            sql.append("f.total_comment, ");
//            sql.append(" '' a, ");
//            sql.append(" '' b, ");
//            sql.append(" '' c, ");
//            sql.append(" '' d, ");
            sql.append("f.title, ");
            sql.append("f.content_post, ");
            sql.append("f.content_detail, ");
            sql.append("f.status, ");
            sql.append("f.image_path, ");
            sql.append("f.user_id, ");
            sql.append("f.created_at, ");
            sql.append("f.updated_at, ");
            sql.append("f.category, ");
            sql.append("f.rating ");
        }
        sql.append("from ");
        sql.append("posts f ");
        sql.append("where f.status != -1 ");
        if (request.getUserId() != null) {
            sql.append(" and f.user_id = :userId ");
//            params.put("category", "%" + request.getCategory() + "%");
            params.put("userId", request.getUserId());
        }
        if (request.getStatus() != null) {
            sql.append(" and f.status = :status ");
//            params.put("category", "%" + request.getCategory() + "%");
            params.put("status", request.getStatus());
        }
        if (request.getCategory() != null) {
            sql.append(" and f.category = :category ");
//            params.put("category", "%" + request.getCategory() + "%");
            params.put("category", request.getCategory());
        }
        if (request.getTitle() != null) {
            sql.append(" and f.title = :title ");
            params.put("title", request.getTitle());
//            params.put("title", "%" +  request.getTitle() + "%");
        }
//        if (request.getUserId() != null) {
//            sql.append("and f.user_id = :userId ");
//            params.put("userId", request.getUserId());
//        }
        if (!isCount) {
            sql.append(" ORDER BY ");
        }

        if (!isCount && request.getSortLikeDown() == 1) {
            sql.append("  f.total_like DESC, ");
        }
        if (!isCount && request.getSortLikeUp() == 1) {
            sql.append("  f.total_like ASC, ");
        }
        if (!isCount && request.getSortCommentDown() == 1) {
            sql.append("  f.total_comment DESC, ");
        }
        if (!isCount && request.getSortCommentUp() == 1) {
            sql.append("  f.total_comment ASC, ");
        }

        if (!isCount) {
            sql.append(" f.created_at desc, id desc ");
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
        sql.append("select sum(status) from posts  ");
        sql.append("where 1 = 1 ");
        sql.append("and user_id = :userId ");
        params.put("userId", request.getUserId());
    }
}
