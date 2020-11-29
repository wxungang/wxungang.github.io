# mysql
> 日常使用 记录

## 规范
- 禁用外键：增删改性能。有利于数据一致性
- 索引看业务查询场景：不利于增删改性能，有利于查性能
- 慎用约束：同外键

## 查询顺序
```sh
-- inner join 笛卡尔积的 所有数据集合
-- EXPLAIN SELECT c.id AS `class_id`, c.name, s.class AS `student_class_id`, s.name FROM `class` AS `c` INNER JOIN `student` AS `s`;
-- 匹配 笛卡尔积的 数据集
-- EXPLAIN SELECT c.id AS `class_id`, c.name, s.class AS `student_class_id`, s.name FROM `class` AS `c` INNER JOIN `student` AS `s` ON s.class=c.id WHERE c.id = 2;
-- 多对多查询 ： 某位老师下的学生
-- EXPLAIN SELECT t.id AS `teacher_id`, t.name, s_t.student, s.name FROM `teacher` AS `t` INNER JOIN `student_teacher` AS `s_t` ON s_t.teacher = t.id INNER JOIN `student` AS `s` ON s_t.student=s.id WHERE t.id = 2;
```

## 表关联
- 一对多：
- 多对多：

## 约束
- NOT NULL
- UNIQUE
- PRIMARY KEY
- FOREIGN KEY
- CHECK
- DEFAULT
