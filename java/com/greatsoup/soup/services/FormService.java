package com.greatsoup.soup.services;

import com.greatsoup.soup.entities.Point;
import com.greatsoup.soup.entities.User;
import com.greatsoup.soup.repositories.PointRepository;
import com.greatsoup.soup.repositories.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.annotation.SessionScope;

import java.util.*;

@Service
@SessionScope
public class FormService {

    private final PointRepository pointRepository;
    private final UserRepository userRepository;
    private final UserInfo userInfo;

    public FormService(PointRepository pointRepository,
                       UserRepository userRepository, UserInfo userInfo) {
        this.pointRepository = pointRepository;
        this.userRepository = userRepository;
        this.userInfo = userInfo;
    }

    public Map<String, String> submitPoint(Map<String, String> request) {
        Map<String, String> response = new HashMap<>();
        double x = Double.parseDouble(request.get("x"));
        double y = Double.parseDouble(request.get("y"));
        double r = Double.parseDouble(request.get("r"));
        //String login = request.get("login");
        String login = userInfo.getLogin();
        boolean inArea = checkIfInArea(x, y, r);
        Point point = new Point(x, y, r, inArea, getUser(login));
        pointRepository.save(point);
        response.put("in", Boolean.toString(inArea));
        return response;
    }

    private User getUser(String login) {
        System.out.println("login " + login);
        Optional<User> userOptional = userRepository.findById(login);
        if (userOptional.isPresent()) {
            return userOptional.get();
        } else {
            System.out.println("Login is incorrect!");
            return null;
        }
    }

    private boolean checkIfInArea(double x, double y, double r) {
        boolean inCircle = x * x + y * y <= r * r / 4;
        if (r > 0) {
            return (x <= 0 && x >= -r && y <= 0 && y >= -r) ||
                    (x <= 0 && y >= 0 && inCircle) ||
                    (x >= 0 && y >= 0 && y <= -x + r);
        } else {
            return (x >= 0 && x <= -r && y >= 0 && y <= -r) ||
                    (x >= 0 && y <= 0 && inCircle) ||
                    (x <= 0 && y <= 0 && y >= -x + r);
        }
    }

    public List<Point> getUsersPoints() {
        Iterable<Point> points = pointRepository.findAllByUser(
                getUser(userInfo.getLogin()));
        List<Point> response = new ArrayList<>();
        for (Point point : points) {
            response.add(point);
        }
        return response;
    }

    @Transactional
    public void delete() {
        pointRepository.deleteAllByUser(getUser(
                userInfo.getLogin()));
    }
}
