package com.kh.app_mini.todo.mapper;

import com.kh.app_mini.todo.vo.TodoVo;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface TodoMapper {

    @Insert("""
        INSERT INTO TODO (
            TODO_NO, CATEGORY_NO, TODO_CONTENT, DUE_DATE,
            IS_DONE, CREATED_DATE, MODIFIED_DATE, DEL_YN
        ) VALUES (
            SEQ_TODO.NEXTVAL, #{categoryNo}, #{todoContent},
            TO_DATE(#{dueDate}, 'YYYY-MM-DD'),
            'N', SYSTIMESTAMP, SYSTIMESTAMP, 'N'
        )
    """)
    int insert(TodoVo vo);

    @Select("""
        SELECT 
            t.TODO_NO, t.CATEGORY_NO, t.DUE_DATE, 
            t.IS_DONE, c.CATEGORY_NAME
        FROM TODO t
        JOIN TODO_CATEGORY c 
          ON t.CATEGORY_NO = c.CATEGORY_NO
        WHERE t.DEL_YN = 'N'
        ORDER BY t.TODO_NO DESC
    """)
    List<TodoVo> selectList();

    @Select("""
        SELECT 
            t.TODO_NO, t.CATEGORY_NO, t.TODO_CONTENT,
            t.DUE_DATE, t.IS_DONE, t.CREATED_DATE,
            t.MODIFIED_DATE, c.CATEGORY_NAME
        FROM TODO t
        JOIN TODO_CATEGORY c
          ON t.CATEGORY_NO = c.CATEGORY_NO
        WHERE t.TODO_NO = #{todoNo} 
          AND t.DEL_YN = 'N'
    """)
    TodoVo selectOne(@Param("todoNo") int todoNo);

    @Update("""
        UPDATE TODO
           SET TODO_CONTENT  = #{todoContent},
               DUE_DATE      = TO_DATE(#{dueDate}, 'YYYY-MM-DD'),
               CATEGORY_NO   = #{categoryNo},
               MODIFIED_DATE = SYSTIMESTAMP
         WHERE TODO_NO = #{todoNo}
           AND DEL_YN   = 'N'
    """)
    int update(TodoVo vo);

    @Update("""
        UPDATE TODO
           SET DEL_YN        = 'Y',
               MODIFIED_DATE = SYSTIMESTAMP
         WHERE TODO_NO = #{todoNo}
    """)
    int delete(@Param("todoNo") int todoNo);
}
