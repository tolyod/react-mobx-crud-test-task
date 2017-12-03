# react-mobx-crud-test-task
# Тестовое задание на должность Frontend Developer

Необходимо разработать CRUD интерфейс для работы с базой сотрудников. 

Обязательными являются следующие функции:
  
  - список людей
  - создание
  - редактирование
  - удаление
  - фильтрация списка (необязательно)

Приложение должно прочитать базу один раз из файла **mates.json**. Ее содержимое можно положить, например, в глобальную переменную **window.db**

Список может выглядеть так

![List sample](pics/sample_list.png)


А форма создания так

![Create form sample](pics/create_form.png)

Это должно быть SPA приложение, написанное на reactjs. Исходный код с инструкциями по запуску должен быть выложен на github/bitbucket/gitlab.
В приложении должна быть постраничная навигация, то есть списк, формы редактирования сотрудников и форма добавления сотрудника - разные страницы,
с уникальным url внутри.

Предпочтительные технологии:

1. webpack
2. reactjs
3. typescript
4. mobx
5. Тесты на mocha/jest

#Установка

```
$git clone https://github.com/tolyod/react-mobx-crud-test-task.git``

$cd react-mobx-crud-test-task

$npm install```

#Запуск 
```npm start```

#Запуск тестов
```npm test```

#Browser Demo
[online demo](https://rawgit.com/tolyod/react-mobx-crud-test-task/master/demo/)
