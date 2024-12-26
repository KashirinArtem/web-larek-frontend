import { IOnInit, IOrderConfig, IOrderForm } from '../types';
import { ensureAllElements, ensureElement } from '../utils/utils';
import { IEvents } from './base/events';
import { Form } from './Form';

export class Order extends Form implements IOrderForm
{
    protected _paymentBtn: HTMLElement[];
    protected _address: HTMLElement;


    constructor ({ form, paymentBtn, address, submit, errors }: Partial<IOrderConfig>, protected _emitter: IEvents)
    {
        super({ form, submit, errors }, _emitter);

        this._paymentBtn = ensureAllElements(paymentBtn, this._container);
        this._address = ensureElement(address, this._container);

        this._paymentBtn.forEach(btn =>
        {

            btn.addEventListener('click', e =>
            {
                const button = (<HTMLButtonElement> e.target);
                this._emitter.emit('order:payment', { payment: button.name });

                this._paymentBtn.forEach(item =>
                {
                    this.toggleClass(
                        item,
                        'button_alt-active',
                        button.name === (<HTMLButtonElement> item).name);
                });
            });
        });
    }

    set address(value: string)
    {
        (<HTMLInputElement> this._address).value = value;

        this._emitter.emit('address:validation', { address: value });
    }

    get address()
    {
        return (<HTMLInputElement> this._address).value;
    }

    public resetPayment(): void
    {
        this._paymentBtn.forEach(btn =>
        {
            this.removeClass(btn, 'button_alt-active');
        });
    }





}