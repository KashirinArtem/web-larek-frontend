import { IOrderConfig } from '../types';
import { ensureElement } from '../utils/utils';
import { IEvents } from './base/events';
import { Form } from './Form';

export class Contact extends Form
{
    protected _email: HTMLElement;
    protected _phone: HTMLElement;
    constructor ({ form, email, phone, submit, errors }: Partial<IOrderConfig>, protected _emitter: IEvents)
    {
        super({ form, submit, errors }, _emitter);

        this._email = ensureElement(email, this._container);
        this._phone = ensureElement(phone, this._container);
    }

    set email(value: string)
    {
        (<HTMLInputElement> this._email).value = value;
        this._emitter.emit('email:validation', { email: value });
    }

    get email()
    {
        return (<HTMLInputElement> this._email).value;

    }

    set phone(value: string)
    {
        const v = value.startsWith('8') ? '+7' + value.substring(1) : value;


        (<HTMLInputElement> this._phone).value = v;
        this._emitter.emit('phone:validation', { phone: v });
    }

    get phone()
    {
        return (<HTMLInputElement> this._phone).value;
    }


}