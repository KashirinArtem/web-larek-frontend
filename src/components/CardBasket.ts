import { ICardBasketConfig, IOnInit, IProduct, THandler } from '../types';
import { cloneTemplate, ensureElement } from '../utils/utils';
import { Component } from './Component';


export class CardBasket extends Component implements IOnInit
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

    public onInit({ title, price, id, index }: IProduct & { index: number; }): void
    {
        this.setText(this._index, String(index));
        this.setText(this._title, title);
        this.setText(this._price, price ? price + ' синапсов' : 'Бесценно');
        this.setId(this._container, id);
    }
}