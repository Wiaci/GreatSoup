package com.greatsoup.soup.entities;

import lombok.*;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Data
@ToString
public class Point {

    @Id
    @GeneratedValue
    private Long id;

    private double x;
    private double y;
    private double r;
    private boolean inArea;

    @ManyToOne
    private User user;

    public Point(double x, double y, double r, boolean inArea, User user) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.inArea = inArea;
        this.user = user;
    }
}
