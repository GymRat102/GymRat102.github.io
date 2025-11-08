---
layout: post
title: "[译] Use The Index, Luke - Preface"
date: 2025-11-08 21:22 +0800
---

Developers Need to Index

开发者需要使用（学会）索引  

<br>

SQL performance problems are as old as SQL itself—some might even say that SQL is inherently slow. Although this might have been true in the early days of SQL, it is definitely not true anymore. Nevertheless SQL performance problems are still commonplace. How does this happen?

SQL性能问题与SQL本身一样古老——甚至可能有人会说SQL天生就慢。虽然在SQL的早期阶段这可能是事实，但如今绝对不再适用。然而SQL性能问题仍然普遍存在。这究竟是如何发生的？

<br>

The SQL language is perhaps the most successful fourth-generation programming language (4GL). Its main benefit is the capability to separate “what” and “how”. An SQL statement is a straight description of what is needed without instructions as to how to get it done. Consider the following example:

SQL语言或许是最成功的第四代编程语言（4GL）。它的主要优势在于能够分离“做什么”和“怎么做”。SQL语句直接描述了需要什么，而无需指示如何实现。请看以下示例：

<br>

```sql
SELECT date_of_birth
  FROM employees
 WHERE last_name = 'WINAND'
```

<br>

The SQL query reads like an English sentence that explains the requested data. Writing SQL statements generally does not require any knowledge about inner workings of the database or the storage system (such as disks, files, etc.). There is no need to tell the database which files to open or how to find the requested rows. Many developers have years of SQL experience yet they know very little about the processing that happens in the database.

这段SQL查询读起来像解释所需数据的英文句子。编写SQL语句通常不需要了解数据库或存储系统（如磁盘、文件等）的内部工作原理。无需告知数据库要打开哪些文件或如何找到所需行。许多开发者拥有多年SQL经验，却对数据库中发生的处理过程知之甚少。

<br>

The separation of concerns—what is needed versus how to get it—works remarkably well in SQL, but it is still not perfect. The abstraction reaches its limits when it comes to performance: the author of an SQL statement by definition does not care how the database executes the statement. Consequently, the author is not responsible for slow execution. However, experience proves the opposite; i.e., the author must know a little bit about the database to prevent performance problems.

这种关注点的分离（separation of concerns）——即“需要什么”与“如何获取”——在SQL中运作得相当出色，但仍非完美。当涉及性能时，这种抽象就会触及极限[^1]：从定义上来说，SQL语句的作者并不关心数据库如何执行该语句。因此，作者无需对执行缓慢负责。然而实践经验却恰恰相反——也就是说，作者必须对数据库有所了解才能避免性能问题。

<br>

It turns out that the only thing developers need to learn is how to index. Database indexing is, in fact, a development task. That is because the most important information for proper indexing is not the storage system configuration or the hardware setup. The most important information for indexing is how the application queries the data. This knowledge—about the access path—is not very accessible to database administrators (DBAs) or external consultants. Quite some time is needed to gather this information through reverse engineering of the application: development, on the other hand, has that information anyway.

事实证明，开发者唯一需要学习的就是如何建立索引。实际上，数据库索引是一项开发任务。这是因为正确建立索引所需的最重要信息并非存储系统配置或硬件设置，而是应用程序如何查询数据。这种关于访问路径（access path）的知识对于数据库管理员（DBA）或外部顾问来说并不容易获取，需要通过对应用程序花费大量时间进行逆向工程（reverse engineering）才能收集到——而开发团队本身就拥有这些信息。

<br>

This book covers everything developers need to know about indexes—and nothing more. To be more precise, the book covers the most important index type only: the *B-tree index*.

本书涵盖了开发者需要了解的关于索引的所有知识——且仅此而已。更准确地说，本书只涉及最重要的索引类型：B树索引。

<br>

The B-tree index works almost identically in many databases. The book primarily uses the terminology of the Oracle® database, but refers to the corresponding terms of other database where appropriate. Side notes provide more information about MySQL, PostgreSQL and SQL Server®.

B树索引在多数数据库中的工作方式几乎完全相同。本书主要采用Oracle®数据库的术语体系，同时在适当处引用其他数据库的对应术语。侧边注释提供了关于MySQL、PostgreSQL和SQL Server®的更多信息。

<br>

The structure of the book is tailor-made for developers; most chapters correspond to a particular part of an SQL statement.

本书的结构是专为开发者量身定制的；大多数章节分别对应SQL语句的特定组成部分。

<br>

[CHAPTER 1 - Anatomy of an Index](https://use-the-index-luke.com/sql/anatomy)

第一章 - 详解索引

The first chapter is the only one that doesn’t cover SQL specifically; it is about the fundamental structure of an index. An understanding of the index structure is essential to following the later chapters—don’t skip this!

第一章是唯一不专门讲解SQL的章节；它主要阐述索引的基本结构。理解索引结构对后续章节的学习至关重要——请不要跳过！

Although the chapter is rather short—only about eight pages—after working through the chapter you will already understand the phenomenon of slow indexes.

虽然这一章相当简短——只有大约八页——但在学习完本章后，你将能立即理解索引速度缓慢的场景。

<br>

[CHAPTER 2 - The Where Clause](https://use-the-index-luke.com/sql/where-clause)

第二章 - Where 子句

This is where we pull out all the stops[^2]. This chapter explains all aspects of the `where` clause, from very simple single column lookups to complex clauses for ranges and special cases such as `LIKE`.This chapter makes up the main body of the book. Once you learn to use these techniques, you will write much faster SQL.

这一张我们将全力以赴进行理解。本章将阐释`WHERE`子句的所有方面，从非常简单的单列查找，到针对范围的复杂自居，及特殊情形例如`LIKE`。本章构成了本书的主体部分。一旦你学会运用这些技巧，就将能编写出高效得多的SQL语句。

<br>

[CHAPTER 3 - Performance and Scalability](https://use-the-index-luke.com/sql/testing-scalability)

第三章 - 性能和可拓展性

This chapter is a little digression about performance measurements and database scalability. See why adding hardware is not the best solution to slow queries.

本章将稍作偏离主题，探讨性能度量与数据库可扩展性。了解为何增加硬件并非解决查询缓慢的最佳方案。

<br>

[CHAPTER 4 - The Join Operation](https://use-the-index-luke.com/sql/join)

第四章 - Join 操作

Back to SQL: here you will find an explanation of how to use indexes to perform a fast table join.

回归SQL主题：本章将阐释如何利用索引实现快速的表连接。

<br>

[CHAPTER 5 - Clustering Data](https://use-the-index-luke.com/sql/clustering)

第五章 - 数据聚簇

Have you ever wondered if there is any difference between selecting a single column or all columns? Here is the answer—along with a trick to get even better performance.

你是否曾思考过，选择单列与选择所有列是否存在差异？答案就在本章——同时还将介绍一项获取更优性能的技巧。

<br>

[CHAPTER 6 - Sorting and Grouping](https://use-the-index-luke.com/sql/sorting-grouping)

第六章 - 排序与分组

Even `order by` and `group by` can use indexes.

即使是 `ORDER BY` 和 `GROUP BY` 子句也能利用索引。

<br>

[CHAPTER 7 - Partial Results](https://use-the-index-luke.com/sql/partial-results)

第七章 - 部分结果

This chapter explains how to benefit from a “pipelined” execution if you don’t need the full result set.

本章将阐释在不需要完整结果集的情况下，如何从“流水线”式的执行中获益。

<br>

[CHAPTER 8 - Insert, Delete and Update](https://use-the-index-luke.com/sql/dml)

第八章 - 插入、删除与更新

How do indexes affect write performance? Indexes don’t come for free—use them wisely!

索引如何影响写入性能？索引并非没有代价——请明智使用！

<br>

[APPENDIX A - Execution Plans](https://use-the-index-luke.com/sql/explain-plan)

附录A - 执行计划

Asking the database how it executes a statement.

向数据库探询其如何执行某条语句。

<br>

[APPENDIX B - Myth Directory](https://use-the-index-luke.com/sql/myth-directory)

附录B - 误区目录

Lists some common myth and explains the truth. Will be extended as the book grows.

列举了一些常见误区并阐明真相。本书后续版本将对此部分进行扩充。

<br>

[APPENDIX C - Example Schema](https://use-the-index-luke.com/sql/example-schema)

附录C - 示例Schema

All `create` and `insert` statements for the tables from the book.

本书所用全部数据表的创建及插入语句。

<br>

---

[^1]: 可以这样理解这里所说的 「抽象到达了极限」：SQL 语言本来提供的抽象是，开发者不用关心底层如何查询，只需要用 query 语言描述自己想要查询什么数据。但是一旦设计到性能问题，开发者就必须要去理解数据库底层是如何执行语句的。这就导致了抽象被打破了。
[^2]: **PHRASE 短语 **全力以赴;竭尽全力 If you **pull out all the stops**, you do everything you can to make something happen or succeed.
