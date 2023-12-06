package com.example.coffee2.service.notify;

import com.example.coffee2.request.LikePostsRequest;
import com.example.coffee2.request.NotifyRequest;
import com.example.coffee2.response.LikePostsResponse;
import com.example.coffee2.response.NotifyResponse;

import java.util.List;

public interface NotifyService {


    List<NotifyResponse> createSqlGetListfromUser();

    List<NotifyResponse> createSqlGetListIsCommentPost();

    List<NotifyResponse> createSqlGetListIsReplyComment();

    boolean create(NotifyRequest request);

    boolean delete(NotifyRequest request);
}
