export interface IComponent
{
    get content(): HTMLElement;
    clearContent(elem: HTMLLinkElement): void;
    setText(elem: HTMLElement, text: string): void;
    setId(elem: HTMLElement, id: string): void;
    setImage(elem: HTMLElement, src: string, alt: string): void;
    addClass(elem: HTMLElement, className: string): void;
    removeClass(elem: HTMLElement, className: string): void;
    setDisabled(elem: HTMLElement, value: boolean): void;
    toggleClass(elem: HTMLElement, className: string, force?: boolean): void;
    render(content: HTMLElement[], target?: HTMLElement): void;
}

export interface IForm
{
    get submit(): HTMLButtonElement;
    set errors(err: string[]);
    resetErrors(): void;
    resetForm(): void;
}

export interface IPage
{
    set isLockedContainerByScroll(value: boolean);
    set gallery(elements: HTMLElement[]);
    set counter(count: number);
}

export interface IBasket
{
    set disabled(value: boolean);
    set price(price: number);
}

export interface IOrderForm
{
    set address(value: string);
    get address();
    resetPayment(): void;
}

export interface IContactsForm
{
    set email(value: string);
    get email();
    set phone(value: string);
    get phone();
}

export interface IOnInit
{
    onInit(obj: unknown): void;
}

export interface IProduct
{
    id: string;
    title: string;
    description: string;
    image: string;
    category: string;
    price: number | null;
}

export interface IApp
{
    productList: IProduct[];
    basketList: IProduct[];
    order: IOrder;
    paymentState: Partial<FormFieldState>;
    addressState: Partial<FormFieldState>;
    emailSate: Partial<FormFieldState>;
    phoneState: Partial<FormFieldState>;
    errors: string[];
    isAddressValid(address: string): boolean;
    isEmailValid(email: string): boolean;
    isPhoneValid(phone: string): boolean;
    resetOrderFormState(): void;
    resetContactFormState(): void;
    resetErrors(): void;
}
export interface ILarekApi
{
    getAllProducts(): Promise<IProduct[]>;
    postOrder(order: IOrder): Promise<IApiOrderResponse>;
}

export type THandler = (e?: Event) => void;

export interface ICardConfig
{
    card: string;
    category: string;
    title: string;
    image: string;
    price: string;
    description?: string;
    cardBtn?: string;
}

export interface IModalConfig
{
    modal: string;
    closeBtn: string;
    content: string;
    selector: string;
}

export interface ICardBasketConfig
{
    card: string;
    index: string;
    title: string;
    price: string;
    deleteBtn: string;
}

export interface IBasketConfig
{
    basket: string;
    list: string;
    orderBtn: string;
    totalPrice: string;
}

export interface IOrderConfig
{
    form: string;
    paymentBtn: string;
    address: string;
    email: string;
    phone: string;
    submit: string;
    errors: string;
}

export interface ISuccessConfig
{
    success: string;
    description: string;
    successBtn: string;
}

export enum CategoryClassName
{
    "софт-скил" = "soft",
    "другое" = "other",
    "дополнительное" = "additional",
    "кнопка" = "button",
    "хард-скил" = "hard"
}

export interface IModal
{
    open: () => void;
    close: () => void;
}

export interface IOrder
{
    payment: string;
    address: string;
    phone: string;
    email: string;
    items: string[];
    total: number;
}

export interface FormFieldState
{
    isValid: boolean;
    errorMessage: string;
    pattern: RegExp;

}

export interface IApiOrderResponse
{
    id: string;
    total: number;
}