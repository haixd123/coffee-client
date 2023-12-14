package com.example.coffee2.reponsitory.Customer.impl;

import com.example.coffee2.reponsitory.Customer.CoffeeBeanCustomer;
import com.example.coffee2.request.CoffeeBeanRequest;
import com.example.coffee2.request.PostsRequest;
import com.example.coffee2.response.CoffeeBeanResponse;
import com.example.coffee2.response.PostsResponse;
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
public class CoffeeBeanCustomerImpl implements CoffeeBeanCustomer {
    @Autowired
    private final EntityManager entityManager;

    public CoffeeBeanCustomerImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public List<CoffeeBeanResponse> getListCoffeeBean(CoffeeBeanRequest request) {
        try {
            StringBuilder sql = new StringBuilder();
            Map<String, Object> params = new HashMap<>();
            createSqlGetListCoffeeBean(request, sql, params, false);
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
            return FunctionUtils.mapping(query.getResultList(), CoffeeBeanResponse.class);
        } catch (Exception e) {
            log.error("error1: " + e.getMessage());
        }
        return null;
    }

    public Long getCountListCoffeeBean(CoffeeBeanRequest request) {
        try {
            StringBuilder sql = new StringBuilder();
            Map<String, Object> params = new HashMap<>();
            createSqlGetListCoffeeBean(request, sql, params, true);
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

    private void createSqlGetListCoffeeBean(CoffeeBeanRequest request, StringBuilder sql, Map<String, Object> params, boolean isCount) {
        if (isCount) {
            sql.append("select count(*) \n");
        } else {
//            sql.append("select f.* \n");
            sql.append("select \n");
            sql.append("f.id, \n");
            sql.append("f.name, \n");
            sql.append("f.title, \n");
            sql.append("f.popular, \n");
            sql.append("f.description, \n");
            sql.append("f.origin, \n");
            sql.append("f.planting_instructions, \n");
            sql.append("f.status, \n");
            sql.append("f.content_coffee, \n");
            sql.append("f.image \n");
        }
        sql.append("from \n");
        sql.append("coffee_bean f \n");
        sql.append("where f.status != -1 \n");
        if (request.getName() != null) {
            sql.append("and f.name = :name \n");
            params.put("name", request.getName());
//            params.put("name", "%" + request.getName() + "%");
        }
    }
}
