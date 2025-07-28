package com.kh.app_mini.todo.service;

import com.kh.app_mini.todo.mapper.TodoMapper;
import com.kh.app_mini.todo.vo.TodoVo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TodoService {

    private final TodoMapper mapper;

    public int insert(TodoVo vo) {
        return mapper.insert(vo);
    }

    public List<TodoVo> selectList() {
        return mapper.selectList();
    }

    public TodoVo selectOne(int todoNo) {
        return mapper.selectOne(todoNo);
    }

    public int update(TodoVo vo) {
        return mapper.update(vo);
    }

    public int delete(int todoNo) {
        return mapper.delete(todoNo);
    }
}