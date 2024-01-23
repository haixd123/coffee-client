package com.example.coffee2.reponsitory.Customer;

import com.example.coffee2.request.PostsRequest;
import com.example.coffee2.response.PostsResponse;

import java.util.List;

public interface PostsRespositoryCustomer {
    List<PostsResponse> getListPosts(PostsRequest request);

    Long getCountListPosts(PostsRequest request);

    Long getTotalPosts(PostsRequest request);
}
