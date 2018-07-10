package com.spring.server.repository;


import com.spring.server.model.Comment;
import com.spring.server.model.News;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findAllByNews(News news);
    Comment findById(long id);
}
