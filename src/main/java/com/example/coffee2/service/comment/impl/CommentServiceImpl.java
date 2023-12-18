package com.example.coffee2.service.comment.impl;

import com.example.coffee2.entity.CommentEntity;
import com.example.coffee2.reponsitory.CommentRepository;
import com.example.coffee2.reponsitory.Customer.CommentCustomer;
import com.example.coffee2.request.CommentRequest;
import com.example.coffee2.response.CommentResponse;
import com.example.coffee2.service.comment.CommentService;
import com.example.coffee2.utils.DateProc;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.lang3.RandomUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@Log4j2
public class CommentServiceImpl implements CommentService {
    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private CommentCustomer commentCustomer;

    @Override
    public List<CommentResponse> getListComment(CommentRequest request) {
        return commentCustomer.getListComment(request);
    }

    @Override
    public Long getCountListComment(CommentRequest request) {
        return commentCustomer.getCountListComment(request);
    }

    @Override
    public Long getTotalCommentPosts(CommentRequest request) {
        return commentCustomer.getTotalCommentPosts(request);
    }


    @Override
    public boolean create(CommentRequest request) {
        Date now = new Date();
        try {
            CommentEntity obj = new CommentEntity();
            obj.setCommentId(request.getCommentId());
            obj.setUserId(request.getUserId());
            obj.setPostId(request.getPostId());
            obj.setCommentText(request.getCommentText());
            obj.setCreateAt(request.getCreateAt());
            obj.setUpdateAt(request.getUpdateAt());
            obj.setLikeComment(request.getLikeComment());
            obj.setStatus(1L);
            commentRepository.save(obj);
            return true;
        } catch (Exception e) {
            log.error("error: " + e.getMessage());
            return false;
        }
    }


    @Override
    public boolean update(CommentRequest request) {
        Date now = new Date();

        try {
            CommentEntity obj = commentRepository.findById(request.getId()).orElse(null);
            obj.setCommentId(request.getCommentId());
            obj.setUserId(request.getUserId());
            obj.setPostId(request.getPostId());
            obj.setCommentText(request.getCommentText());
//            obj.setCreateAt(DateProc.dateToStringYYYYMMDD(request.getCreateAt()));
//            requestMail.setRequestDate(DateProc.getDatetimeFormatYYYYMMDDHH24MISS());
//            groupEntity.setFileName(DateProc.dateToStringYYYYMMDD(new Date()) + getFileName(request.getBankId()));
//            rsModel.setApprovedDateStr(DateProc.dateToStringDDMMYYYYMMSS(rsModel.getApprovedDate()));

            obj.setUpdateAt(request.getUpdateAt());
            obj.setLikeComment(request.getLikeComment());
            obj.setStatus(request.getStatus());
            commentRepository.save(obj);
            return true;
        } catch (Exception e) {
            log.error("error: " + e.getMessage());
            return false;
        }


    }

    @Override
    public boolean delete(CommentRequest request) {
        try {
            CommentEntity obj = commentRepository.findById(request.getId()).orElse(null);
            obj.setStatus(-1L);
            commentRepository.save(obj);
            return true;
        } catch (Exception e) {
            log.error("error: " + e.getMessage());
            return false;
        }


    }
}
