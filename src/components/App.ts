import { FormFieldState, IApp, IOrder, IProduct } from '../types';

export class App implements IApp
{
    public productList: IProduct[] = [];
    public basketList: IProduct[] = [];
    public order: IOrder = {
        payment: '',
        address: '',
        phone: '',
        email: '',
        items: [],
        total: 0
    };
    public paymentState: Partial<FormFieldState> = {
        isValid: false,
        errorMessage: 'Выберите способ оплаты'
    };
    public addressState: Partial<FormFieldState> = {
        isValid: false,
        errorMessage: 'Укажите адрес доставки',
        pattern: /[а-яА-ЯёЁa-zA-Z0-9\s\/.,-]/
    };
    public emailSate: Partial<FormFieldState> = {
        isValid: false,
        errorMessage: 'Не верный формат электронной почты',
        pattern: /^\S+@\S+\.\S+$/

    };
    public phoneState: Partial<FormFieldState> = {
        isValid: false,
        errorMessage: 'Не верный формат номера телефона',
        pattern: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/
    };
    public errors: string[] = [];


    public isAddressValid(address: string): boolean
    {
        const v = address.trim();
        return (v.length >= 5) && this.addressState.pattern.test(v);
    }

    public isEmailValid(email: string): boolean
    {
        const v = email.trim();
        return this.emailSate.pattern.test(v);
    }

    public isPhoneValid(phone: string): boolean
    {
        const v = phone.trim();
        return this.phoneState.pattern.test(v);
    }

    public resetOrderFormState(): void
    {
        this.paymentState.isValid = this.addressState.isValid = false;
    }

    public resetContactFormState(): void
    {
        this.phoneState.isValid = this.emailSate.isValid = false;
    }

    public resetErrors(): void
    {
        this.errors = [];

    }









}