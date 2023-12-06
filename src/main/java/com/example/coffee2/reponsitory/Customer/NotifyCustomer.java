package com.example.coffee2.reponsitory.Customer;

import com.example.coffee2.request.NotifyRequest;
import com.example.coffee2.response.NotifyResponse;

import java.util.List;

public interface NotifyCustomer {

    List<NotifyResponse> createSqlGetListfromUser();

    List<NotifyResponse> createSqlGetListIsCommentPost();

    List<NotifyResponse> createSqlGetListIsReplyComment();


}
