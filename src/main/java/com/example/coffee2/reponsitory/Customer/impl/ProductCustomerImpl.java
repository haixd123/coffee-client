package com.example.coffee2.reponsitory.Customer.impl;

import com.example.coffee2.reponsitory.Customer.ProductCustomer;
import com.example.coffee2.request.CoffeeBeanRequest;
import com.example.coffee2.request.ProductRequest;
import com.example.coffee2.response.CoffeeBeanResponse;
import com.example.coffee2.response.ProductResponse;
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
public class ProductCustomerImpl implements ProductCustomer {
    @Autowired
    private final EntityManager entityManager;

    public ProductCustomerImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public List<ProductResponse> getListProduct(ProductRequest request) {
        try {
            StringBuilder sql = new StringBuilder();
            Map<String, Object> params = new HashMap<>();
            createSqlGetListProduct(request, sql, params, false);
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
            return FunctionUtils.mapping(query.getResultList(), ProductResponse.class);
        } catch (Exception e) {
            log.error("error1: " + e.getMessage());
        }
        return null;
    }

    public Long getCountListProduct(ProductRequest request) {
        try {
            StringBuilder sql = new StringBuilder();
            Map<String, Object> params = new HashMap<>();
            createSqlGetListProduct(request, sql, params, true);
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

    private void createSqlGetListProduct(ProductRequest request, StringBuilder sql, Map<String, Object> params, boolean isCount) {
        if (isCount) {
            sql.append("select count(*) \n");
        } else {
//            sql.append("select f.* \n");
            sql.append("select \n");
            sql.append("f.id, \n");
            sql.append("f.name, \n");
            sql.append("f.description, \n");
            sql.append("f.sku, \n");
            sql.append("f.price, \n");
            sql.append("f.category, \n");
            sql.append("f.discount, \n");
            sql.append("f.remaining, \n");
            sql.append("f.image, \n");
            sql.append("f.status, \n");
            sql.append("f.detail \n");
        }
        sql.append("from \n");
        sql.append("product f \n");
        sql.append("where f.status != -1 \n");
        if (request.getName() != null) {
            sql.append("and f.name = :name \n");
//            params.put("name", "%" + request.getName() + "%");
            params.put("name", request.getName());
        }
        if(request.getSortPriceDown() == 1) {
            sql.append("ORDER BY f.price DESC");
        }
        if(request.getSortPriceUp() == 1) {
            sql.append("ORDER BY f.price ASC");
        }
        if(request.getSortDiscountDown() == 1) {
            sql.append("ORDER BY f.discount DESC");
        }
        if(request.getSortDiscountUp() == 1) {
            sql.append("ORDER BY f.discount ASC");
        }
        if(request.getSortRemainingDown() == 1) {
            sql.append("ORDER BY f.remaining DESC");
        }
        if(request.getSortRemainingUp() == 1) {
            sql.append("ORDER BY f.remaining ASC");
        }
    }
}
