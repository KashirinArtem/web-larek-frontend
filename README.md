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

## Тип архитектуры: MVP

- Model - модель данных;
- View - представление данных;
- Presenter - связающая часть между Model и View.

## Интерфейсы модели-представления

1. **Component** - абстрактный класс, реализует интерфейс `IComponent`, взаимодействует с DOM-элементами производных классов, выступает базовым классом для классов `Form`, `Page`, `Basket`, `CardBasket`, `CardGallery`, `CardPreview`, `Modal`, `Order`, `Success` и `Contacts`

- Члены класса:
  `constructor` - принимает DOM-элемент, контейнер в котором содержится контентная часть;
  `setText(elem: HTMLElement, text: string): void` - устанавливает текст;
  `setId(elem: HTMLElement, id: string): void` - устанавливает id;
  `setImage(elem: HTMLElement, src: string, alt: string): void` - устанавливает изображение и альтернативный текст;
  `addClass(elem: HTMLElement, className: string): void` - добавляет класс;
  `removeClass(elem: HTMLElement, className: string): void` - удаляет класс;
  `setDisabled(elem: HTMLElement, value: boolean): void` - устанавливает атрибут disabled;
  `toggleClass(elem: HTMLElement, className: string, force?: boolean): void` - переключает класс;
  `render(content: HTMLElement[], target?: HTMLElement): void` - вставляет конетент в контейнер.

2. **Form** - абстрактный класс, реализущий интерфейс `IForm` и расширяющий абстрактный класс `Component`. Взаимодействует с формами приложения и выступает базовым классом для классов `Order` и `Contacts`

- Члены класса:
  `constructor` - принимает два аргумента, первый - объект, содержащий селекторы фоормы, кнопки типа summit, контейнера для установки ошибок формы, вторым - брокер событий `IEvents`;
  `protected _submit: HTMLElement` - DOM-эелмент кнопки типа submit;
  `protected _errors: HTMLElement` - DOM-эелмент контейнера с ошибками формы;
  `get submit(): HTMLButtonElement` - возвращает DOM-эелмент \_submit;
  `set errors(errors: string[])` - устанавливает ошибки в DOM-эелмент \_errors;
  `public resetErrors(): void` - сбрасывает ошибки \_errors;
  `public resetForm(): void` - сбрасыва содержимое полей формы.

3. **Page** - класс реализующий интерфейс `IPage`, интерфейс модели-представления главной старинцы приложения.

- Члены класса:
  `constructor` - принимает два аргумента, первый - селекторы главной страницы, вторым - брокер событий `IEvents`;
  `protected _gallery: HTMLElement` - DOM-эелмент gallery;
  `protected _counter: HTMLElement` - DOM-эелмент counter;
  `protected _basket: HTMLElement` - DOM-эелмент basket;
  `set gallery(elements: HTMLElement[])` - устанавливает контент для \_gallery;
  `set isLockedContainerByScroll(value: boolean)` - снимает/ставит блокировку скролла у главной страницы в момент открытия/закрытия модального окна;
  `set counter(count: number)` - станавливает контент для \_counter.

4. **Basket** - класс реализующий интерфейс `IBasket`, интерфейс модели-представления корзины заказов.

- Члены класса:
  `constructor` - принимает два аргумента, первый - объект, типа `IBasketConfig` содержащий селекторы корзины, вторым - брокер событий `IEvents`;
  `protected _list: HTMLElement` - DOM-эелмент list;
  `protected _orderBtn: HTMLElement` - DOM-эелмент orderBtn;
  `protected _totalPrice: HTMLElement` - DOM-эелмент totalPrice;
  `set disabled(value: boolean)` - true, устанавливает атрибут disabled для orderBtn, false - снимает;
  `set price(price: number)` - устанвливает значение для totalPrice;
  `public override render(content: HTMLElement[]): void` - вставляет content в list.

5. **CardBasket** - класс реализующий интерфейс `IOnInit`, интерфейс модели-представления одного товара в `Basket`.

- Члены класса:
  `constructor` - принимает два аргумента, первый - объект, типа `ICardBasketConfig` содержащий селекторы одного товара в корзине, вторым - обработчик события типа `THandler` для \_deleteBtn;
  `protected _index: HTMLElement` - DOM-эелмент \_index;
  `protected _title: HTMLElement` - DOM-эелмент \_title;
  `protected _price: HTMLElement` - DOM-эелмент \_price;
  `protected _deleteBtn: HTMLElement` - DOM-эелмент \_deleteBtn;
  `public init({ id, title, price, index }: IProduct & { index: number; }): void` - инициализирует значениями элементы \_index, \_title, \_price, \_container;

6. **CardGallery** - класс реализующий интерфейс `IOnInit`, интерфейс модели-представления товара в \_gallery `Page`.

- Члены класса:
  `constructor` - принимает два аргумента, первый - объект, типа `ICardConfig` содержащий селекторы одного товара, вторым - обработчик события типа `THandler` для \_container;
  `protected _category: HTMLElement` - DOM-эелмент \_category;
  `protected _title: HTMLElement` - DOM-эелмент \_title;
  `protected _image: HTMLElement` - DOM-эелмент \_image;
  `protected _price: HTMLElement` - DOM-эелмент \_price;
  `protected readonly _colorCategory: Record<string, string>` - enum `CategoryClassName` преобразованный в объект;
  `public init({ id, title, category, image, price }: IProduct): void` - инициализирует значениями элементы \_category, \_title, \_image, \_price, \_container.

7. **CardPreview** - производный класс от `CardGallery`, интерфейс модели-представления товара в открывающемся модальном окне.

- Члены класса:
  `constructor` - принимает два аргумента, первый - объект, типа `ICardConfig` содержащий селекторы одного товара, вторым - обработчик события типа `THandler` для \_cardBtn;
  м
  `protected _cardBtn: HTMLElement` - DOM-эелмент \_cardBtn;
  `public override onInit(product: IProduct): void` - инициализирует значениями элементы класса `CardGallery` и \_description.

8. **Modal** - класс реализующий интерфейс `IModal`, интерфейс модели-представления модального окна, в которое рендерятся модели-представления `CardPreview`, `Basket`, `CardBasket`, `Order`, `Contacts` и `Success`.

- Члены класса:
  `constructor` - принимает два аргумента, первый - объект, типа `IModalConfig` содержащий селекторы модального окна, вторым - брокер событий `IEvents`;
  `protected _content: HTMLElement` - DOM-эелмент \_content;
  `protected _closeBtn: HTMLElement` - DOM-эелмент \_closeBtn;
  `protected _selector: HTMLElement` - DOM-эелмент \_selector;
  `protected _closeByEsc: (e: KeyboardEvent) => void` - при наступлении события типа `KeyboardEvent` проверят было ли событие вызвано клавишей Escape и закрывает вызывает метод close();
  `public open(): void` - открывает модальное окно;
  `public сlose: () => void` - закрывает модальное окно;
  `public override render(content: HTMLElement[]): void` - рендерит content в \_content предварительно очищая содержимое \_content.

9. **Success** - класс реализующий интерфейс `IOnInit`, интерфейс модели-представления успешного оформления заказа, рендерится в модальном окне.

- Члены класса:
  `constructor` - принимает два аргумента, первый - объект, типа `ISuccessConfig` содержащий селекторы успешного оформления заказа, вторым - брокер событий `IEvents` для \_closeBtn;
  `protected _description: HTMLElement` - DOM-эелмент \_description;
  `protected _closeBtn: HTMLElement` - DOM-эелмент \_closeBtn;
  `public onInit(totalPrice: number): void` - инициализирует аргуменом элемент \_description.

10. **Form** - абстрактный класс, производный класс от базового класса `Component`, реализующий интерфейс `IForm`, взаимодействует с DOM-элементами форм для производных классов `Order` и `Contacts`.

- Члены класса:
  `constructor` - принимает два аргумента, первый - объект, типа `IOrderConfig` содержащий селекторы форы, вторым - брокер событий `IEvents`;
  `protected _submit: HTMLElement` - DOM-эелмент \_submit;
  `protected _errors: HTMLElement` - DOM-эелмент \_errors;
  `get submit(): HTMLButtonElement` - возвращает DOM-эелмент \_submit;
  `set errors(errors: string[])` - устанавливает значение для \_errors;
  `public resetErrors(): void` - удаляет все значения из \_errors;
  `public resetForm(): void` - очищает все элементы input внутри \_container.

11. **Order** - производный класс от базового класса `Form`, реализует интерфейс `IOrderForm`, интерфейс модели-представления формы с выбором типа оплаты и адресом, рендерится в модальном окне.

- Члены класса:
  `constructor` - принимает два аргумента, первый - объект, типа `IOrderConfig` содержащий селекторы форы, вторым - брокер событий `IEvents`, для \_paymentBtn и address;
  `protected _paymentBtn: HTMLElement[];` - DOM-эелмент \_paymentBtn;
  `protected _address: HTMLElement;` - DOM-эелмент \_address;
  `set address(value: string)` - устанавливает значение для \_address
  `get address()` - возвращает значение из \_address;
  `resetPayment()` - удаляет у всех элементом \_paymentBtn класс.

12. **Contacts** - производный класс от базового класса `Form`, реализует интерфейс `IContactsForm`, интерфейс модели-представления формы с вводом телефона и электронной почты, рендерится в модальном окне.

- Члены класса:
  `constructor` - принимает два аргумента, первый - объект, типа `IOrderConfig` содержащий селекторы форы, вторым - брокер событий `IEvents`, для phone и email;
  `protected _email: HTMLElement[];` - DOM-эелмент \_email;
  `protected _phone: HTMLElement[];` - DOM-эелмент \_phone;
  `set email(value: string)` - устанавливает значение для \_email;
  `set phone(value: string)` - устанавливает значение для \_phone;
  `get email(): string` - возвраает значение из \_email;
  `get phone(): string` - возвраает значение из \_phone.

## Интерфейсы модели-данных

1. **Api** - базовый класс, интерфейса модели-данных, взаимодействует с сервером.

- Члены класса:
  `constructor` - принимает два аргумента, первый - базовый url, вторым - объект типа `RequestInit`;
  `readonly baseUrl: string;`- базовый url;
  `protected options: RequestInit;`- объект описывающий заголовки запроса;
  `protected handleResponse(response: Response): Promise<object>`- обертка над ответом от сервера предварительно обрабатывает ответ от сервера;
  `get(uri: string): Promise<object>`- get-запрос;`post(uri: string, data: object, method: ApiPostMethods = 'POST'): Promise<object>` - post-запрос.

2. **LarekApi** - производный класс от базового класса `Api`, реализует интерфейс `ILarekApi` интерфейса модели-данных, взаимодействует с сервером.

- Члены класса:
  `constructor` - принимает три аргумента, первый - базовый url, второй - cdn, третий - объект типа `RequestInit`;
  `protected _cdn: string` - cdn;
  `getAllProducts(): Promise<IProduct[]>` - возращает Promise содержащий массив продуктов тип `IProduct`;
  `postOrder(order: IOrder): Promise<IApiOrderResponse>` - возращает Promise типа `IApiOrderResponse`, данные по совершенному заказу.

3. **App** - класс реализующий интерфейс `IApp`, интерфейс модели-данных, хранит данные главной старинцы приложения.

- Члены класса:
  `productList: IProduct[]` - массив продуктов приложения;
  `basketList: IProduct[]` - массив добавленных продуктов в корзину;
  `order: IOrder` - модель-данных заказа;
  `paymentState: Partial<FormFieldState>` - состояние кнопок выбора оплаты;
  `addressState: Partial<FormFieldState>` - состояни поле ввода адреса;
  `emailSate: Partial<FormFieldState>` - состояние поле ввода лектронный почты;
  `phoneState: Partial<FormFieldState>` - состояние поле ввода телефона;
  `errors: string[]` - массив содержащий ошибки при валидации значений;
  `isAddressValid(address: string): boolean` - валидирует address, true - валидно, false - не валидно;
  `isEmailValid(email: string): boolean` - валидирует email, true - валидно, false - не валидно;
  `isPhoneValid(phone: string): boolean` - валидирует phone, true - валидно, false - не валидно;
  `resetOrderFormState(): void` - возращает состоние членов paymentState и addressState в начальное состоние;
  `resetContactFormState(): void` - возращает состоние членов emailSate и phoneState в начальное состоние;
  `resetErrors(): void` - удаляет все ошибки из errors;

## Интерфейсы модели-контроллера

1. **EventEmitter** - класс реализующий интерфейс `IEvents`, интерфейс модели-контроллера, связывает модель-данных с моделью-представления, вуступает брокером событий, подписывается на события и уведомлят подписчиков о наступлении события.

- Члены класса:
  `_events: Map<EventName, Set<Subscriber>>;` - объект, ключ - имя события, значение - функция;
  `on<T extends object>(eventName: EventName, callback: (event: T) => void): this` - подписывается на событие eventName и вызывает функцию callback, функция может содержать данные переданные из члена emit, возвращает текущий экземпляр объекта;
  `off(eventName: EventName, callback: Subscriber): void` - отписывается от события eventName и вызова функции callback, возвращает void;
  `emit<T extends object>(eventName: string, data?: T): void` - инициирует событие eventName, может передать данные data, для on;
  `onAll(callback: (event: EmitterEvent) => void): void` - подписывается на все события и вызывает callback;
  `offAll(): void` - отписывается от всех событий;
  `trigger<T extends object>(eventName: string, context?: Partial<T>): Function` - инициирует событие eventName передавая данные, возвращает функцию;

## События

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

## Типы данных применяемыее в приложении

- IComponent
- IForm
- IPage
- IBasket
- IOrderForm
- IContactsForm
- IProduct
- IApp
- ILarekApi
- CategoryClassName
- IModal
- IOrder
- IApiOrderResponse
- IOnInit
- THandler
- ICardConfig
- IModalConfig
- ICardBasketConfig
- IBasketConfig
- IOrderConfig
- ISuccessConfig
- FormFieldState
