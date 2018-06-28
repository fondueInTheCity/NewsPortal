package com.spring.server.repository;


import com.spring.server.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findById(long id);
    User findByUsername(String username);
    User findByActivationCode(String activateCode);
    User findByEmail(String email);

    @Query("SELECT u FROM User u WHERE u.isDeleted = false")
    List<User> findAllExisted();
}
