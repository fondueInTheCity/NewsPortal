package com.spring.server.repository;


import com.spring.server.model.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {
    Tag findByName(String name);

    @Query("SELECT CASE WHEN COUNT(t) > 0 THEN 'true' ELSE 'false' END FROM Tag t WHERE t.name = ?1")
    public Boolean existsByName(String name);
}
