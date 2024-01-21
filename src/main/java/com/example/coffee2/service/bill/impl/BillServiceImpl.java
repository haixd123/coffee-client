package com.example.coffee2.service.bill.impl;

import com.example.coffee2.entity.BillEntity;
import com.example.coffee2.reponsitory.BillRepository;
import com.example.coffee2.reponsitory.Customer.BillCustomer;
import com.example.coffee2.request.BillRequest;
import com.example.coffee2.response.BillResponse;
import com.example.coffee2.service.bill.BillService;
import com.example.coffee2.utils.DateProc;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import com.example.coffee2.utils.ExcelUtil;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;

@Service
@Log4j2
public class BillServiceImpl implements BillService {
    @Autowired
    private BillRepository respository;

    @Autowired
    private BillCustomer billCustomer;

    @Override
    public List<BillResponse> getListBill(BillRequest request) {
        return billCustomer.getListBill(request);
    }

    @Override
    public Long getCountListBill(BillRequest request) {
        return billCustomer.getCountListBill(request);
    }

    @Override
    public boolean create(BillRequest request) {
        try {
            BillEntity obj = new BillEntity();
            obj.setName(request.getName());
            obj.setEmail(request.getEmail());
            obj.setPhone(request.getPhone());
            obj.setAddress(request.getAddress());
            obj.setDetail(request.getDetail());
            obj.setCreateDate(DateProc.stringToDateDDMMYYYY(request.getCreateDate()));
            obj.setTotal(request.getTotal());
            obj.setPayed(false);
            respository.save(obj);
            return true;
        } catch (Exception e) {
            log.error("error: " + e.getMessage());
            return false;
        }
    }

    @Override
    public BillEntity create(BillRequest request, boolean payed){
        BillEntity obj = new BillEntity();
        obj.setName(request.getName());
        obj.setEmail(request.getEmail());
        obj.setPhone(request.getPhone());
        obj.setAddress(request.getAddress());
        obj.setDetail(request.getDetail());
        try {
            obj.setCreateDate(DateProc.stringToDateDDMMYYYY(request.getCreateDate()));
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
        obj.setTotal(request.getTotal());
        obj.setPayed(payed);
        return respository.save(obj);
    }

    @Override
    public void updateBillPayed(Long id) {

        BillEntity bill = respository.findById(id).orElseThrow(() -> new RuntimeException("Not found bill"));
        log.info(id);
        log.info(bill);
        bill.setPayed(true);
        respository.save(bill);
    }


    @Override
    public void exprot(HttpServletResponse response, List<BillResponse> listResponse, BillRequest request) throws IOException {
        XSSFWorkbook workbook = new XSSFWorkbook();
        XSSFSheet sheetTheND = workbook.createSheet("Công cụ khai báo tài khoản truy cập hệ thống api MYVNPT");
        //????
        int rowNum = 2;
        int columNum = 0;

        XSSFCellStyle boldAlignmentCenterBorder12 = ExcelUtil.cellStyleCustom(workbook, "bold", "center", (short) 12, true);
        XSSFCellStyle boldAlignmentCenterBorder14 = ExcelUtil.cellStyleCustom(workbook, "bold", "center", (short) 14, true);

        rowNum++;
        rowNum++;
        ExcelUtil.mergeCellCustom(1, 1, 0, 5, sheetTheND, workbook, false);
        ExcelUtil.createCell(sheetTheND, 1, 0, "Công cụ thống kê hóa đơn bán hàng", boldAlignmentCenterBorder14);
        ExcelUtil.createCell(sheetTheND, rowNum, 0, "STT", boldAlignmentCenterBorder12);
        ExcelUtil.createCell(sheetTheND, rowNum, 1, "id", boldAlignmentCenterBorder12);
        ExcelUtil.createCell(sheetTheND, rowNum, 2, "Tên người dùng", boldAlignmentCenterBorder12);
        ExcelUtil.createCell(sheetTheND, rowNum, 3, "Email", boldAlignmentCenterBorder12);
        ExcelUtil.createCell(sheetTheND, rowNum, 4, "Số điện thoại", boldAlignmentCenterBorder12);
        ExcelUtil.createCell(sheetTheND, rowNum, 5, "Địa chỉ", boldAlignmentCenterBorder12);
        ExcelUtil.createCell(sheetTheND, rowNum, 6, "Chi tiết hóa đơn", boldAlignmentCenterBorder12);
        ExcelUtil.createCell(sheetTheND, rowNum, 7, "Ngày mua hàng", boldAlignmentCenterBorder12);
        ExcelUtil.createCell(sheetTheND, rowNum, 8, "Tổng tiền", boldAlignmentCenterBorder12);
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
        XSSFCellStyle normalAlignmentCenterBorder = ExcelUtil.cellStyleCustom(workbook, "", "center", (short) 12, true);
        int index = 1;
        log.info("Bat dau export du lieu ra file: " + System.currentTimeMillis());

        for (BillResponse item : listResponse) {
            columNum = 0;
            rowNum++;
            ExcelUtil.createLongCell(sheetTheND, rowNum, columNum++, index++, boldAlignmentCenterBorder12);
            ExcelUtil.createCell(sheetTheND, rowNum, columNum++, String.valueOf(item.getId()), normalAlignmentCenterBorder);
            ExcelUtil.createCell(sheetTheND, rowNum, columNum++, item.getName(), normalAlignmentCenterBorder);
            ExcelUtil.createCell(sheetTheND, rowNum, columNum++, item.getEmail(), normalAlignmentCenterBorder);
            ExcelUtil.createCell(sheetTheND, rowNum, columNum++, item.getPhone(), normalAlignmentCenterBorder);
            ExcelUtil.createCell(sheetTheND, rowNum, columNum++, item.getAddress(), normalAlignmentCenterBorder);
            ExcelUtil.createCell(sheetTheND, rowNum, columNum++, item.getDetail(), normalAlignmentCenterBorder);
            ExcelUtil.createCell(sheetTheND, rowNum, columNum++, item.getCreateDate(), normalAlignmentCenterBorder);
            ExcelUtil.createCell(sheetTheND, rowNum, columNum++, item.getTotal(), normalAlignmentCenterBorder);
            log.info("Du lieu: " + item);
        }
        log.info("Ket thuc export du lieu ra file: " + System.currentTimeMillis());
        for (int i = 0; i < 10; i++)
            sheetTheND.autoSizeColumn(i, true);
        String file_name = "Thong-ke-hoa-don-ban-hang " + System.currentTimeMillis();
        response.setHeader("Content-Disposition", "attachment; filename=\"" + file_name + ".xlsx\"");
        OutputStream out = response.getOutputStream();
        workbook.write(out);
        out.close();

    }

}
