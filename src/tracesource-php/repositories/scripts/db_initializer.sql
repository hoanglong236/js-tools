create database trace_source_php encoding 'utf8';

create table source_files (
  id int primary key,
  path varchar(300) not null,
  class_name varchar(80) not null,
  parent_class_name varchar(80) not null,
  created_at timestamp not null default current_timestamp
);

create table file_functions (
  id int primary key,
  file_id int not null,
  function_signature varchar(200),
  function_name varchar(80),
  created_at timestamp not null default current_timestamp
)

create table file_function_invokers (
  id int primary key,
  file_id int not null,
  function_id int not null,
  line_number int not null,
  line_content varchar(200) not null,
  created_at timestamp not null default current_timestamp
)