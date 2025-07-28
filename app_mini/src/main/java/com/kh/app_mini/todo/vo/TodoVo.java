package com.kh.app_mini.todo.vo;

import lombok.Data;

@Data
public class TodoVo {
    private int todoNo;
    private int categoryNo;
    private String todoContent;
    private String dueDate;
    private String isDone;
    private String createdDate;
    private String modifiedDate;
    // categoryName: 조회(조인) 때만 사용
    private String categoryName;
}
