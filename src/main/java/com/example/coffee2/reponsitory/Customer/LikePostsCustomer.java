package com.example.coffee2.reponsitory.Customer;

import com.example.coffee2.request.CoffeeBeanRequest;
import com.example.coffee2.request.LikePostsRequest;
import com.example.coffee2.response.CoffeeBeanResponse;
import com.example.coffee2.response.LikePostsResponse;

import java.util.List;

public interface LikePostsCustomer {

    List<LikePostsResponse> getListLikePosts(LikePostsRequest request);

    Long getCountListLikePosts(LikePostsRequest request);

    Long getTotalLikePosts(LikePostsRequest request);

}
