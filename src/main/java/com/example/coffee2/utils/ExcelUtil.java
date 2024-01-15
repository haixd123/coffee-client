package com.example.coffee2.utils;

import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.apache.commons.lang3.StringUtils;
import org.apache.poi.hssf.usermodel.HSSFDataFormat;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.ss.util.RegionUtil;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.apache.poi.xssf.usermodel.*;

import static org.apache.poi.xssf.usermodel.XSSFCellStyle.*;

public class ExcelUtil {
    public static XSSFCellStyle cellStyleCustom(XSSFWorkbook workbook, String type, String alignment, short textSize, boolean border) {
        XSSFFont timeNewRomanFont = workbook.createFont();
        timeNewRomanFont.setFontName("Times New Roman");
        if (type.equals("bold"))
            timeNewRomanFont.setBold(true);
        if (type.equals("italic"))
            timeNewRomanFont.setItalic(true);
        if (type.equals("bold-italic")) {
            timeNewRomanFont.setBold(true);
            timeNewRomanFont.setItalic(true);
        }
        timeNewRomanFont.setFontHeightInPoints(textSize);

        XSSFCellStyle style = workbook.createCellStyle();
        if (border) {
            style = ExcelUtil.cellBorder(workbook);
        }
        if (alignment == "left")
            style.setAlignment(HorizontalAlignment.LEFT);
        if (alignment == "right")
            style.setAlignment(HorizontalAlignment.RIGHT);
        if (alignment == "center") {
            style.setAlignment(HorizontalAlignment.CENTER);
            style.setVerticalAlignment(VerticalAlignment.CENTER);
        }
        style.setFont(timeNewRomanFont);


        return style;

    }

    public static void createCell(XSSFSheet sheet, int rowNum, int columNum, String value, XSSFCellStyle style) {
        Row row;
        if (sheet.getRow(rowNum) == null) {
            row = sheet.createRow(rowNum);
        }
        row = sheet.getRow(rowNum);
        Cell cell = row.createCell(columNum);
        cell.setCellValue(value);
        if (style != null) {
            cell.setCellStyle(style);
        }
    }

    public static void createLongCell(XSSFSheet sheet, int rowNum, int columNum, long value, XSSFCellStyle style) {
        Row row;
        if (sheet.getRow(rowNum) == null) {
            row = sheet.createRow(rowNum);
        }
        row = sheet.getRow(rowNum);
        Cell cell = row.createCell(columNum);
        cell.setCellValue(value);
        if (style != null) {
            style.setDataFormat((short) 1);
            cell.setCellStyle(style);
        }
    }

    public static void mergeCellCustom(int firstRow, int lastRow, int firstCol, int lastCol, XSSFSheet sheet, XSSFWorkbook workbook, boolean border) {

        CellRangeAddress mergedCell = new CellRangeAddress(
                firstRow, lastRow, firstCol, lastCol);
        sheet.addMergedRegion(mergedCell);

        if (border) {
            RegionUtil.setBorderTop(CellStyle.BORDER_THIN, mergedCell, sheet, workbook);
            RegionUtil.setBorderBottom(CellStyle.BORDER_THIN, mergedCell, sheet, workbook);
            RegionUtil.setBorderLeft(CellStyle.BORDER_THIN, mergedCell, sheet, workbook);
            RegionUtil.setBorderRight(CellStyle.BORDER_THIN, mergedCell, sheet, workbook);
        }
    }

    private static XSSFCellStyle cellBorder(XSSFWorkbook workbook) {
        XSSFCellStyle style = workbook.createCellStyle();
        style.setBorderLeft(XSSFCellStyle.BORDER_THIN);
        style.setBorderRight(XSSFCellStyle.BORDER_THIN);
        style.setBorderTop(XSSFCellStyle.BORDER_THIN);
        style.setBorderBottom(XSSFCellStyle.BORDER_THIN);
        return style;
    }
}
