# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:

- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:

- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск

Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```

## Сборка

```
npm run build
```

или

```
yarn build
```

https://github.com/KashirinArtem/web-larek-frontend

Классы модели данных:

- App
- LarekApi

Классы представлениия:

- Page
- Basket
- CardBasket
- CardGallery
- CardPreview
- Form
- Order
- Contact
- Modal
- Success

Ключевые типы данных:

- IProduct
- ILarekApi
- enum CategoryClassName
- IOrder

События:

- modal:open - открытие модального окна
- modal:close - закрытие модального окна
- products:render - рендеринг продуктов
- card:select - выбор карточки
- product:add - добавление продукта в в корзину
- basket:open - открытие корзины продуктов
- card:remove - удаление карточки
- basket:order - оформление заказа
- order:address - ввод и сохрание адреса
- order:payment - выбор и сохрание типа оплаты
- contacts:email - ввод и сохрание почты
- email:validation - валидация почты
- contacts:phone - ввод и сохрание телефона
- phone:validation - валидация телефона
- address:validation - валидация адреса
- order:submit - submit формы order
- contacts:submit - submit формы contacts
- order:done - сброс состояний
