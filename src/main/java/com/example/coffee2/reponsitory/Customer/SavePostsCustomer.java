package com.example.coffee2.reponsitory.Customer;

import com.example.coffee2.request.LikePostsRequest;
import com.example.coffee2.request.SavePostsRequest;
import com.example.coffee2.response.LikePostsResponse;
import com.example.coffee2.response.SavePostsResponse;

import java.util.List;

public interface SavePostsCustomer {
    List<SavePostsResponse> getListSavePosts(SavePostsRequest request);

    Long getCountListSavePosts(SavePostsRequest request);
}
