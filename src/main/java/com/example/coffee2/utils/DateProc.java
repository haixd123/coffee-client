package com.example.coffee2.utils;

import org.apache.commons.lang3.StringUtils;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;


public class DateProc {
    private static final SimpleDateFormat _format_DDMMYYYYMMSS = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
    private static final SimpleDateFormat _format_DDMMYYYY = new SimpleDateFormat("dd/MM/yyyy");
    private static final SimpleDateFormat _format_yyyyMMdd = new SimpleDateFormat("yyyyMMdd");
    private static final SimpleDateFormat _format_MMyyyy = new SimpleDateFormat("MM/yyyy");

    public static String dateToStringDDMMYYYY(Date date) {
        if (date == null) {
            return "";
        }
        return _format_DDMMYYYY.format(date);
    }

    public static Date stringToDateDDMMYYYY(String dateStr) throws ParseException {
        if (StringUtils.isBlank(dateStr)) {
            return null;
        }
        return _format_DDMMYYYY.parse(dateStr);
    }

    public static String dateToStringFormat(Date date, String format) {
        if (date == null) {
            return "";
        }
        return new SimpleDateFormat(format).format(date);
    }

    public static Date stringToDateFormat(String dateStr, String format) throws ParseException {
        if (StringUtils.isBlank(dateStr)) {
            return null;
        }
        return new SimpleDateFormat(format).parse(dateStr);
    }

    public static String dateToStringDDMMYYYYMMSS(Date date) {
        if (date == null) {
            return "";
        }
        return _format_DDMMYYYYMMSS.format(date);
    }

    public static Date stringToDateDDMMYYYYMMSS(String dateStr) throws ParseException {
        if (StringUtils.isBlank(dateStr)) {
            return null;
        }
        return _format_DDMMYYYYMMSS.parse(dateStr);
    }

    public static String Date2DDMMYYYYH24MI(Date date) {
        if (date == null) {
            return "";
        }
        return _format_DDMMYYYYMMSS.format(date);
    }

    public static boolean validateDateDDMMYY(String dateStr) {
        if (StringUtils.isBlank(dateStr)) {
            return false;
        }
        try {
            _format_DDMMYYYY.parse(dateStr);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public static Date stringToDateYYYYMMDD(String dateStr) throws ParseException {
        if (StringUtils.isBlank(dateStr)) {
            return null;
        }
        return _format_yyyyMMdd.parse(dateStr);
    }

    public static String dateToStringYYYYMMDD(String date) throws ParseException {
        if (date == null) {
            return "";
        }
        return _format_yyyyMMdd.format(date);
    }

    public static String getNextDateDDMMYYYY(String curDate, int n) throws Exception {
        final Date date = _format_DDMMYYYY.parse(curDate);
        final Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(Calendar.DAY_OF_YEAR, n);
        return _format_DDMMYYYY.format(calendar.getTime());
    }

    public static Date addDays(Date date, int days) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.add(Calendar.DATE, days); //minus number would decrement the days
        return cal.getTime();
    }

    public static String getDateYYYYMMDD(Timestamp date) {
        if (date == null) {
            return "";
        }
        SimpleDateFormat sf = new SimpleDateFormat(
                "yyyy-MM-dd");
        return sf.format(date);
    }

    public static String getDateDDMMYYYY(Timestamp date) {
        if (date == null) {
            return "";
        }
        return _format_DDMMYYYY.format(date);
    }

    public static Timestamp createTimestamp() {
        Calendar calendar = Calendar.getInstance();
        return new Timestamp((calendar.getTime()).getTime());
    }

    public static Timestamp createTimestampYesterday() {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.DATE, -1);
        return new Timestamp((calendar.getTime()).getTime());
    }

    public static int getDay(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        return calendar.get(Calendar.DAY_OF_MONTH);
    }

    public static int getMonth(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        return calendar.get(Calendar.MONTH) + 1;
    }

    public static int getYear(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        return calendar.get(Calendar.YEAR);
    }

    public static Date getStartDateOfMonth(Integer month) {
        Calendar calendar = GregorianCalendar.getInstance();
        calendar.set(Calendar.MONTH, month - 1);
        calendar.set(Calendar.DAY_OF_MONTH, calendar.getActualMinimum(Calendar.DAY_OF_MONTH));
        setTimeToBeginningOfDay(calendar);
        return calendar.getTime();
    }

    public static Date getEndDateOfMonth(Integer month) {
        Calendar calendar = GregorianCalendar.getInstance();
        calendar.set(Calendar.MONTH, month - 1);
        calendar.set(Calendar.DAY_OF_MONTH, calendar.getActualMaximum(Calendar.DAY_OF_MONTH));
        setTimeToEndofDay(calendar);
        return calendar.getTime();
    }
//
//    public static Date getStartDateOfMonth(String month) {
//        Date date = Utils.convertStringToDate(month, "MM/yyyy");
//        Calendar calendar = GregorianCalendar.getInstance();
//        calendar.setTime(date);
//        calendar.set(Calendar.DAY_OF_MONTH, calendar.getActualMinimum(Calendar.DAY_OF_MONTH));
//        setTimeToBeginningOfDay(calendar);
//        return calendar.getTime();
//    }
//
//    public static Date getEndDateOfMonth(String month) {
//        Date date = Utils.convertStringToDate(month, "MM/yyyy");
//        Calendar calendar = GregorianCalendar.getInstance();
//        calendar.setTime(date);
//        calendar.set(Calendar.DAY_OF_MONTH, calendar.getActualMaximum(Calendar.DAY_OF_MONTH));
//        setTimeToEndofDay(calendar);
//        return calendar.getTime();
//    }

    private static Calendar getCalendarForNow(Date processDate) {
        Calendar calendar = GregorianCalendar.getInstance();
        calendar.setTime(processDate);
        return calendar;
    }

    private static void setTimeToBeginningOfDay(Calendar calendar) {
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
    }

    private static void setTimeToEndofDay(Calendar calendar) {
        calendar.set(Calendar.HOUR_OF_DAY, 23);
        calendar.set(Calendar.MINUTE, 59);
        calendar.set(Calendar.SECOND, 59);
        calendar.set(Calendar.MILLISECOND, 999);
    }

    public static String getDatetimeFormatYYYYMMDDHH24MISS() {
        SimpleDateFormat sf = new SimpleDateFormat(
                "yyyyMMddHHmmss");
        return sf.format(createTimestamp());
    }

    public static Date truncateTime(Date date) {
        Calendar cal = Calendar.getInstance(); // locale-specific
        cal.setTime(date);
        cal.set(Calendar.HOUR_OF_DAY, 0);
        cal.set(Calendar.MINUTE, 0);
        cal.set(Calendar.SECOND, 0);
        cal.set(Calendar.MILLISECOND, 0);
        return new Date(cal.getTimeInMillis());
    }

    public static String dateToStringMMYYYY(Date date) {
        if (date == null) {
            return "";
        }
        return _format_MMyyyy.format(date);
    }

}
