import { IBasketConfig } from '../types';
import { cloneTemplate, ensureElement } from '../utils/utils';
import { IEvents } from './base/events';
import { Component } from './Component';

export class Basket extends Component
{
    protected _list: HTMLElement;
    protected _orderBtn: HTMLElement;
    protected _totalPrice: HTMLElement;

    constructor ({ basket, list, orderBtn, totalPrice }: IBasketConfig, emitter: IEvents)
    {
        super(cloneTemplate(basket));

        this._list = ensureElement(list, this._container);
        this._orderBtn = ensureElement(orderBtn, this._container);
        this._totalPrice = ensureElement(totalPrice, this._container);

        this._orderBtn.addEventListener('click', () => emitter.emit('basket:order'));
    }

    set disabled(value: boolean)
    {
        this.setDisabled(this._orderBtn, value);
    }

    set price(price: number)
    {
        this.setText(this._totalPrice, price ? String(price) + " синапсов" : '');
    }

    public override render(content: HTMLElement[]): void
    {
        this.clearContent(this._list);
        this._list.append(...content);
    }

}