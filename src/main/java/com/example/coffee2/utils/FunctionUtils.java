package com.example.coffee2.utils;

import lombok.extern.slf4j.Slf4j;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.sql.Clob;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Slf4j
public class FunctionUtils {
    public static <T> List<?> mapping(List<Object[]> results, Class<?> clazz) throws Exception {
        List<T> listResult = new ArrayList<>();
        Field[] fields = clazz.getDeclaredFields();
        for (Object[] e : results) {
            T subClazz = (T) clazz.newInstance();
            int i = 0;
            for (Field f : fields) {
                String proName = f.getName();
                Class<?> clz = subClazz.getClass().getDeclaredField(proName).getType();
                String proNameUpperFirst = proName.substring(0, 1).toUpperCase() + proName.substring(1);
                Method method = subClazz.getClass().getMethod("set" + proNameUpperFirst, clz);
                method.setAccessible(true);
                Object val;
                if (clz.equals(Long.class)) {
                    val = Long.valueOf(String.valueOf(e[i] != null ? e[i] : "0"));
                } else if (clz.equals(String.class)) {
                    if (e[i] instanceof Clob) {
                        val = ((Clob) e[i]).getSubString(1, (int) ((Clob) e[i]).length());
                    } else {
                        val = String.valueOf(e[i] != null ? e[i] : "");
                    }
                } else {
                    val = e[i];
                }
                method.invoke(subClazz, clz.cast(val));
                i++;
            }
            listResult.add(subClazz);
        }
        return listResult;
    }

    public static String convertLowerCamelCase(String text) {
        Pattern p = Pattern.compile("_([a-zA-Z])");
        Matcher m = p.matcher(text.toLowerCase());
        StringBuffer sb = new StringBuffer();
        while (m.find()) {
            m.appendReplacement(sb, m.group(1).toUpperCase());
        }
        m.appendTail(sb);
        return sb.toString();
    }
}
