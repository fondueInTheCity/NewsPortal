package com.spring.server.repository;


import com.spring.server.model.News;
import com.spring.server.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NewsRepository extends JpaRepository<News, Long> {
    List<News> findAllByUser(User user);
    News findById(long id);
}
