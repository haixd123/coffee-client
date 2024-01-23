package com.example.coffee2.service.notify.impl;

import com.example.coffee2.entity.NotifyEntity;
import com.example.coffee2.reponsitory.Customer.NotifyCustomer;
import com.example.coffee2.reponsitory.NotifyRepository;
import com.example.coffee2.request.NotifyRequest;
import com.example.coffee2.response.NotifyResponse;
import com.example.coffee2.service.notify.NotifyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class NotifyServiceImpl implements NotifyService {

    @Autowired
    private NotifyRepository repository;

    @Autowired
    private NotifyCustomer notifyCustomer;

    @Override
    public List<NotifyResponse> createSqlGetListfromUser() {
        return notifyCustomer.createSqlGetListfromUser();
    }

    @Override
    public List<NotifyResponse> createSqlGetListIsCommentPost() {
        return notifyCustomer.createSqlGetListIsCommentPost();
    }

    @Override
    public List<NotifyResponse> createSqlGetListIsReplyComment() {
        return notifyCustomer.createSqlGetListIsReplyComment();
    }

    @Override
    public boolean create(NotifyRequest request) {
        Date now = new Date();

        NotifyEntity obj = new NotifyEntity();
        obj.setUserId(request.getUserId());
        obj.setPostId(request.getPostId());
        obj.setCommentId(request.getCommentId());
        obj.setCreateAt(request.getCreateAt());
        repository.save(obj);
        return true;
    }

    @Override
    public boolean delete(NotifyRequest request) {
        NotifyEntity obj = repository.findByCommentId(request.getCommentId()).orElse(null);
        repository.delete(obj);
        return true;
    }
}
