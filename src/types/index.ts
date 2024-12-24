export interface IProduct
{
    id: string;
    title: string;
    description: string;
    image: string;
    category: string;
    price: number | null;
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

export interface IPage
{
    set isLockedContainerByScroll(value: boolean);
    set gallery(elements: HTMLElement[]);
    set counter(count: number);
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