package com.example.coffee2.reponsitory.Customer.impl;

import com.example.coffee2.reponsitory.Customer.LikePostsCustomer;
import com.example.coffee2.reponsitory.LikePostsRepository;
import com.example.coffee2.request.CoffeeBeanRequest;
import com.example.coffee2.request.LikePostsRequest;
import com.example.coffee2.response.CoffeeBeanResponse;
import com.example.coffee2.response.LikePostsResponse;
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
public class LikePostsCustomerImpl implements LikePostsCustomer {
    @Autowired
    private final EntityManager entityManager;

    public LikePostsCustomerImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public List<LikePostsResponse> getListLikePosts(LikePostsRequest request) {
        try {
            StringBuilder sql = new StringBuilder();
            Map<String, Object> params = new HashMap<>();
            createSqlGetListLikePosts(request, sql, params, false);
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
            return FunctionUtils.mapping(query.getResultList(), LikePostsResponse.class);
        } catch (Exception e) {
            log.error("error1: " + e.getMessage());
        }
        return null;
    }

    public Long getCountListLikePosts(LikePostsRequest request) {
        try {
            StringBuilder sql = new StringBuilder();
            Map<String, Object> params = new HashMap<>();
            createSqlGetListLikePosts(request, sql, params, true);
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

    private void createSqlGetListLikePosts(LikePostsRequest request, StringBuilder sql, Map<String, Object> params, boolean isCount) {
        if (isCount) {
            sql.append("select count(*) \n");
            sql.append("from \n");
            sql.append("like_posts f \n");
            if (request.getPostId() != null) {
                sql.append(" where 1=1 ");
                sql.append(" and f.post_id = :postId \n");
                params.put("postId", request.getPostId());
                sql.append("update dbo.posts set total_like = (select count(is_like) from like_posts where post_id= :postId ) where id= :postId");
                params.put("postId", request.getPostId());
            }
        } else {
            sql.append("select \n");
            sql.append("f.id, \n");
            sql.append("f.user_id, \n");
            sql.append("f.post_id, \n");
            sql.append("f.is_like \n");
            sql.append("from \n");
            sql.append("like_posts f \n");
        }
    }

    public Long getTotalLikePosts(LikePostsRequest request) {
        try {
            StringBuilder sql = new StringBuilder();
            Map<String, Object> params = new HashMap<>();
            createSqlGetTotalLikePosts(request, sql, params);
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

    private void createSqlGetTotalLikePosts(LikePostsRequest request, StringBuilder sql, Map<String, Object> params) {
        sql.append("select sum(total_like) from posts  \n");
        sql.append("where 1 = 1 \n");
        sql.append("and user_id = :userId \n");
        params.put("userId", request.getUserId());
    }
}
