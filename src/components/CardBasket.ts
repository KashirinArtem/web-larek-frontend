import { ICardBasketConfig, IPage, IProduct, THandler } from '../types';
import { cloneTemplate, ensureElement } from '../utils/utils';
import { IEvents } from './base/events';
import { Component } from './Component';

export class CardBasket extends Component
{
    protected _index: HTMLElement;
    protected _title: HTMLElement;
    protected _price: HTMLElement;
    protected _deleteBtn: HTMLElement;


    constructor ({ card, index, title, price, deleteBtn }: ICardBasketConfig, handler: THandler)
    {
        super(cloneTemplate(card));

        this._index = ensureElement(index, this._container);
        this._title = ensureElement(title, this._container);
        this._price = ensureElement(price, this._container);
        this._deleteBtn = ensureElement(deleteBtn, this._container);

        this._deleteBtn.addEventListener('click', handler);
    }

    public init({ id, title, price, index }: IProduct & { index: number; }): void
    {
        this.index = index;
        this.id = id;
        this.title = title;
        this.price = price;
    }

    set index(index: number)
    {
        this.setText(this._index, String(index));
    }

    set title(title: string)
    {
        this.setText(this._title, title);
    }

    set price(price: number)
    {
        this.setText(this._price, price ? price + ' синапсов' : 'Бесценно');
    }

    set id(id: string)
    {
        this.setId(this._container, id);
    }





}