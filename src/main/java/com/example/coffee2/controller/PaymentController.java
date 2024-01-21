package com.example.coffee2.controller;

import com.example.coffee2.config.Config;
import com.example.coffee2.entity.BillEntity;
import com.example.coffee2.request.BillRequest;
import com.example.coffee2.response.PaymentResponse;
import com.example.coffee2.response.TransactionResponse;
import com.example.coffee2.service.bill.BillService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@RequestMapping("/api/payment")

@Slf4j
public class PaymentController {

    @Autowired
    private BillService billService;

    @PostMapping("/authors/create-payment")
    public ResponseEntity<?> createPayment(@RequestBody BillRequest billRequest) throws UnsupportedEncodingException, ParseException {

        BillEntity bill = billService.create(billRequest,false);

        String vnp_Version = "2.1.0";
        String vnp_Command = "pay";
        String orderType = "other";
        long amount = Integer.parseInt(billRequest.getTotal())*100;
        String bankCode = "NCB";

        String vnp_TxnRef = Config.getRandomNumber(8);

        String vnp_TmnCode = Config.vnp_TmnCode;

        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", vnp_Version);
        vnp_Params.put("vnp_Command", vnp_Command);
        vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
        vnp_Params.put("vnp_Amount", String.valueOf(amount));
        vnp_Params.put("vnp_CurrCode", "VND");
        vnp_Params.put("vnp_BankCode", bankCode);
        vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.put("vnp_OrderInfo", "Thanh toan don hang:" + vnp_TxnRef);
        vnp_Params.put("vnp_OrderType", orderType);

        vnp_Params.put("vnp_Locale", "vn");
        vnp_Params.put("vnp_ReturnUrl", Config.vnp_ReturnUrl);
        vnp_Params.put("vnp_IpAddr", "127.0.0.1");

        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String vnp_CreateDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);

        cld.add(Calendar.MINUTE, 15);
        String vnp_ExpireDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

        List fieldNames = new ArrayList(vnp_Params.keySet());
        Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();
        Iterator itr = fieldNames.iterator();
        while (itr.hasNext()) {
            String fieldName = (String) itr.next();
            String fieldValue = (String) vnp_Params.get(fieldName);
            if ((fieldValue != null) && (fieldValue.length() > 0)) {
                //Build hash data
                hashData.append(fieldName);
                hashData.append('=');
                hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                //Build query
                query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
                query.append('=');
                query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                if (itr.hasNext()) {
                    query.append('&');
                    hashData.append('&');
                }
            }
        }
        String queryUrl = query.toString();
        String vnp_SecureHash = Config.hmacSHA512(Config.secretKey, hashData.toString());
        queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
        String paymentUrl = Config.vnp_PayUrl + "?" + queryUrl;

        PaymentResponse paymentResponse = new PaymentResponse();

        paymentResponse.setStatus("OK");
        paymentResponse.setMessage("Successfully");
        paymentResponse.setURL(paymentUrl);
        paymentResponse.setBillId(bill.getId().toString());

        return ResponseEntity.status(HttpStatus.OK).body(paymentResponse);
    }

    @GetMapping("/payment-info")
    public ResponseEntity<?> transaction(
            @RequestParam("billId") String billId

    ){
        TransactionResponse transactionResponse = new TransactionResponse();
        billService.updateBillPayed(Long.parseLong(billId));
        transactionResponse.setStatus("OK");
        transactionResponse.setStatus("Successfully");
        transactionResponse.setData("");
        return ResponseEntity.status(HttpStatus.OK).body(transactionResponse);
    }

}
