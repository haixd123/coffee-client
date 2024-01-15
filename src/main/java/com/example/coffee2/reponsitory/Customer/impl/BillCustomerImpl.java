package com.example.coffee2.reponsitory.Customer.impl;

import com.example.coffee2.reponsitory.Customer.BillCustomer;
import com.example.coffee2.request.BillRequest;
import com.example.coffee2.request.CoffeeBeanRequest;
import com.example.coffee2.response.BillResponse;
import com.example.coffee2.response.CoffeeBeanResponse;
import com.example.coffee2.utils.FunctionUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Repository
public class BillCustomerImpl implements BillCustomer {
    @Autowired
    private final EntityManager entityManager;

    public BillCustomerImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public List<BillResponse> getListBill(BillRequest request) {
        try {
            StringBuilder sql = new StringBuilder();
            Map<String, Object> params = new HashMap<>();
            createSqlGetListBill(request, sql, params, false);
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
            return FunctionUtils.mapping(query.getResultList(), BillResponse.class);
        } catch (Exception e) {
            log.error("error1: " + e.getMessage());
        }
        return null;
    }

    public Long getCountListBill(BillRequest request) {
        try {
            StringBuilder sql = new StringBuilder();
            Map<String, Object> params = new HashMap<>();
            createSqlGetListBill(request, sql, params, true);
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

//    @Override
//    public void exprot(HttpServletResponse response, List<BillResponse> listResponse, BillRequest request) throws IOException {
//
//    }

    private void createSqlGetListBill(BillRequest request, StringBuilder sql, Map<String, Object> params, boolean isCount) {
        if (isCount) {
            sql.append("select count(*) \n");
        } else {
//            sql.append("select f.* \n");
            sql.append("select \n");
            sql.append("f.id, \n");
            sql.append("f.name, \n");
            sql.append("f.email, \n");
            sql.append("f.phone, \n");
            sql.append("f.address, \n");
            sql.append("f.detail, \n");
            sql.append("f.create_date, \n");
            sql.append("f.total \n");
        }
        sql.append("from \n");
        sql.append("bill f \n");
        sql.append("where 1 = 1 \n");
        if (request.getName() != null) {
            sql.append("and f.name = :name \n");
            params.put("name", request.getName());
//            params.put("name", "%" + request.getName() + "%");
        }
//        sql.append("order by create_date desc");
    }
}
