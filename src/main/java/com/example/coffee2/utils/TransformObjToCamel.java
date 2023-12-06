package com.example.coffee2.utils;

import lombok.SneakyThrows;
import org.hibernate.transform.ResultTransformer;

import java.math.BigDecimal;
import java.sql.Clob;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class TransformObjToCamel implements ResultTransformer {

    @SneakyThrows
    @Override
    public Object transformTuple(
            Object[] tuple,
            String[] aliases) {
        int idx = 0;
        Map<String, Object> res = new HashMap<>();
        for (Object o : tuple) {
            if (o instanceof BigDecimal)
                o = ((BigDecimal) o).longValue();
            if (o instanceof Clob) {
                o = ((Clob) o).getSubString(1, (int) ((Clob) o).length());
            }
            res.put(FunctionUtils.convertLowerCamelCase(aliases[idx++].toLowerCase()), o);
        }
        return res;
    }

    @Override
    public List transformList(List tuples) {
        return tuples;
    }
}
