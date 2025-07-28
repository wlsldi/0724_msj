package com.kh.app_mini.todo.api;

import com.kh.app_mini.todo.service.TodoService;
import com.kh.app_mini.todo.vo.TodoVo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/todo")
@RequiredArgsConstructor
@CrossOrigin(origins = {
        "http://127.0.0.1:5500",
        "http://192.168.45.251:5500"
})
public class TodoApiController {

    private final TodoService service;

    @PostMapping
    public ResponseEntity<Integer> insert(@RequestBody TodoVo vo) {
        int result = service.insert(vo);
        return ResponseEntity.ok(result);
    }

    @GetMapping
    public ResponseEntity<List<TodoVo>> list() {
        return ResponseEntity.ok(service.selectList());
    }

    @GetMapping("/{todoNo}")
    public ResponseEntity<TodoVo> todoDetail(@PathVariable int todoNo) {
        return ResponseEntity.ok(service.selectOne(todoNo));
    }

    @PutMapping
    public ResponseEntity<Integer> update(@RequestBody TodoVo vo) {
        int result = service.update(vo);
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/{todoNo}")
    public ResponseEntity<Integer> delete(@PathVariable int todoNo) {
        int result = service.delete(todoNo);
        return ResponseEntity.ok(result);
    }
}
