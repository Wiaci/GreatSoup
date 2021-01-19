package com.greatsoup.soup.repositories;

import com.greatsoup.soup.entities.Point;
import com.greatsoup.soup.entities.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PointRepository extends CrudRepository<Point, Long> {
    Iterable<Point> findAllByUser(User user);
    void deleteAllByUser(User user);
}
