# Stellar burgers - космическая бургерная

**Формат проекта:** Одностраничное приложение (SPA) онлайн-бургерной в космической тематике с возможностью регистрации, авторизации,редактирования личного кабинета, сборки кастомного бургера, оформления заказа, просмотра своих заказов и заказов других пользователей в ленте.

**Ссылка на проект:** https://webbOrista.github.io/stellar-burgers/

## Используемые технологии и библиотеки

### Разработка:
- HTML
- CSS
- TypeScript
- React
- React Router
- Redux Toolkit

### Тестирование:
- Jest
- Cypress

## Краткое описание проекта

### Структура

Приложение содержит три основные страницы:

- **Конструктор бургеров**
- **Лента заказов**
- **Личный кабинет**

### Основные возможности пользователя

- Просмотр подробной информации о каждом ингредиенте в модальном окне
- Добавление ингредиентов в конструктор бургера и их удаление
- Оформление заказа, получение номера сформированного заказа с сервера
- Регистрация с указанием имени, e-mail и пароля
- Авторизация с e-mail и паролем
- Восстановление пароля по e-mail
- Смена персональных данных в личном кабинете
- Просмотр истории своих заказов
- Просмотр ленты заказов всех пользователей
- Просмотр подробной информации о заказе в модальном окне
- Просмотр статуса и статистики по заказам: готово/в работе, выполнено за всё время/за сегодня

### Особенности

- Навигация осуществляется при помощи ссылок в шапке.
- Сборка бургера и просмотр ленты заказов доступны всем пользователям.
- Оформление заказа и доступ к личному кабинету доступны только авторизованным пользователям.
- Список ингредиентов, лента заказов всех пользователей, лента заказов текущего пользователя и данные профиля подтягиваются с сервера.

## Функциональность, реализованная мной

### Разработка

- Полностью настроен роутинг с использованием библиотеки React Router.
- Реализованы защищённые маршруты, доступные только авторизованным пользователям.
- Настроено корректное отображение данных в модальных окнах при открытии по прямой ссылке.
- Создано глобальное состояние при помощи Redux Toolkit с разделением на срезы по каждой сущности.
- Реализованы различные методы, такие как добавление, удаление и перемещение ингредиентов бургера.
- Настроено отображение лоадера во время ожидания ответа от сервера.
- Реализована авторизация с использованием refreshToken и accessToken.

### Тестирование

- Написаны модульные тесты с использованием Jest и интеграционные тесты на Cypress.
- Настроен перехват запросов и подмена ответов сервера моковыми данными.
- Написаны тесты для проверки работы редьюсеров, асинхронных запросов и обработки ошибок.
  
Тесты:
- **Jest**: 36 тестов для проверки всех срезов состояния (сгруппированы при помощи `describe`).
- **Cypress**: 8 тестов для проверки сценария сборки бургера и оформления заказа.

## Установка и запуск

### Установка зависимостей и запуск приложения:

```bash
npm i
npm run start

```

### Запуск юнит-тестов jest:

```bash
npm run test

```

###  Запуск интеграционных тестов cypress:

В первом терминале: 

```bash
npm run start

```

Во втором терминале:

```bash
npm run cypress:open

```

