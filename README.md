<br />
<div align="center">

  <h3 align="center">WhatsApp chat</h3>

  <p align="center">
  Данный проект предназначен для входа в свою учетную запись мессенджера WhatsApp, создания чата по номеру телефона собеседника и ведение онлайн переписки.    <br />
  </p>
</div>


### Использованные технологии

* React
* Redux
* Redux-persist
* React-router-dom
* React-spinners
* Typescript
* Scss
* Axios


## Запуск приложения локально


### Регистрация

1. Нужно зарегистрироваться в сервисе https://console.green-api.com/
2. Создать "инстанс", привязать его к своему устройству через QR-код
3. Включить уведомления на входящие текстовые сообщения
4. Для входа в приложение понадобятся "idInstance" и "apiTokenInstance", которые можно найти в своем созданном инстансе


### Установка

1. Клонируем репозиторий
   ```sh
   git clone https://github.com/GlebProkopovich/whatsapp-chat-app
   ```
2. Устанавливаем все необходимые зависимости
   ```sh
   npm install
   ```
3. Запускаем приложение
   ```sh
   npm start
   ```
   
## Использование

1. Вводим данные с личного кабинета

<img src="https://i.ibb.co/fHp0wxk/2023-06-12-14-34-17.png" alt="Sign in" width="1000" height="400">

2. Для создания нового чата нажимаем кнопку "+".

   Для выхода из учётной записи нажимаем на кнопку выхода.

<img src="https://i.ibb.co/2tDtj9w/2023-06-12-14-38-37.png" alt="Interface" width="1000" height="400">
   
   3. Вводим номер собеседника в указанном формате
   
<img src="https://i.ibb.co/XknsQv1/2023-06-12-14-41-30.png" alt="Interface" width="1000" height="400">

4. Появляется слева диалоговая кнопка, с информацией собеседника (его номер, последнее сообщение в беседе и дата последнего сообщения)
5. Для открытия диалога нажимаем на эту кнопку

<img src="https://i.ibb.co/BK4znbc/2023-06-12-14-43-30.png" alt="Interface" width="1000" height="400">

6. В чате подгружается история сообщений (последние 10 сообщений). Для отправки сообщения заполняем поле ввода и нажимаем клавишу "Enter" или кликаем по кнопке для отправки сообщений.

   Есть возможность начинать сразу несколько диалогов.

<img src="https://i.ibb.co/pwzbrSs/2023-06-12-14-48-14.png" alt="Interface" width="1000" height="400">


## Задеплоенный проект

Так же проект задеплоен и можно его использовать онлайн по ссылке:
https://whatsapp-chat-app.vercel.app/


<!-- CONTACT -->
## Контакт

Почта - glebprokopovich@gmail.com

Ссылка на проект: https://github.com/GlebProkopovich/whatsapp-chat-app
