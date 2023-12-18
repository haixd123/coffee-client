package com.example.coffee2.service.posts.impl;

import com.example.coffee2.entity.PostsEntity;
import com.example.coffee2.reponsitory.PostsRepository;
import com.example.coffee2.request.LikePostsRequest;
import com.example.coffee2.request.PostsRequest;
import com.example.coffee2.response.PostsResponse;
import com.example.coffee2.reponsitory.Customer.PostsRespositoryCustomer;
import com.example.coffee2.service.posts.PostsService;
import com.example.coffee2.utils.DateProc;
import lombok.extern.java.Log;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.lang3.RandomUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Date;
import java.util.List;

@Service
@Log4j2
public class PostsServiceImpl implements PostsService {
    @Autowired
    private PostsRespositoryCustomer postsRespositoryCustomer;

    @Autowired
    private PostsRepository repository;

    @Override
    public List<PostsResponse> getListPosts(PostsRequest request) {
        return postsRespositoryCustomer.getListPosts(request);
    }

    @Override
    public Long getCountListPosts(PostsRequest request) {
        return postsRespositoryCustomer.getCountListPosts(request);
    }

    @Override
    public Long getTotalPosts(PostsRequest request) {
        return postsRespositoryCustomer.getTotalPosts(request);
    }

    @Override
    public boolean create(PostsRequest request) {
        Date now = new Date();
        try {
            List<String> checkNameExist = repository.findByTitle(request.getTitle());

            if (checkNameExist.contains(request.getTitle())) {
                log.error("create | Tài khoản đã tồn tại");
                return false;
            }
            PostsEntity obj = new PostsEntity();
            obj.setLike1(request.getLike1());
            obj.setComment(request.getComment());
            obj.setContentPost(request.getContentPost());
            obj.setContentDetail(request.getContentDetail());
            obj.setTitle(request.getTitle());
            obj.setStatus(1L);
            obj.setImagePath(request.getImagePath());
            obj.setUserId(request.getUserId());
            obj.setCreatedAt(now);
            obj.setUpdatedAt(null);
            obj.setCategory(request.getCategory());
            repository.save(obj);
            return true;
        } catch (Exception e) {
            log.info("not success: " + e.getMessage());
            return false;
        }
    }

    @Override
    public boolean update(PostsRequest request) {
        Date now = new Date();
        try {
            PostsEntity obj = repository.findById(request.getId()).orElse(null);
//            PostsEntity obj = repository.getPostsId(request.getId());
//            PostsEntity obj = repository.getPostsEntityByID(request.getId());
            if (obj == null) {
                log.error("update | không tìm thấy bản ghi");
                return false;
            }
            obj.setLike1(request.getLike1());
            obj.setComment(request.getComment());
            obj.setContentPost(request.getContentPost());
            obj.setTitle(request.getTitle());
            obj.setStatus(request.getStatus());
            obj.setImagePath(request.getImagePath());
            obj.setUserId(request.getUserId());
            obj.setCreatedAt(DateProc.stringToDateDDMMYYYY(request.getCreatedAt()));
            obj.setUpdatedAt(now);
//            obj.setTotalComment(request.getTotalComment());
            obj.setCategory(request.getCategory());
            repository.save(obj);
            return true;
        } catch (Exception e) {
            log.info("not success: " + e.getMessage());
            return false;
        }
    }

    @Override
    public boolean delete(PostsRequest request) {
        try {
            PostsEntity obj = repository.findById(request.getId()).orElse(null);
//            PostsEntity obj = repository.getPostsEntityByID(request.getId());
            if (obj == null) {
                log.error("delete | không tìm thấy bản ghi");
                return false;
            }
            obj.setStatus(-1L);
            repository.save(obj);
            return true;
        } catch (Exception e) {
            log.info("not success: " + e.getMessage());
            return false;
        }
    }
}
