import { CategoryClassName, ICardConfig, IOnInit, IProduct, THandler } from '../types';
import { cloneTemplate, ensureElement } from '../utils/utils';
import { Component } from './Component';

export class CardGallery extends Component implements IOnInit
{
    protected _category: HTMLElement;
    protected _title: HTMLElement;
    protected _image: HTMLElement;
    protected _price: HTMLElement;
    protected readonly _colorCategory: Record<string, string> = Object.fromEntries(Object.entries(CategoryClassName));

    constructor ({ card, category, title, image, price }: ICardConfig, protected _handler?: THandler)
    {
        super(cloneTemplate(card));

        this._category = ensureElement(category, this._container);
        this._title = ensureElement(title, this._container);
        this._image = ensureElement(image, this._container);
        this._price = ensureElement(price, this._container);

        this._handler && this._container.addEventListener('click', this._handler);
    }

    public onInit({ id, title, category, image, price }: IProduct): void
    {
        this.setId(this._container, id);
        this.setText(this._title, title);
        this.setImage(this._image, image, title);
        this.setText(this._price, price ? price + ' синапсов' : 'Бесценно');
        this.setText(this._category, category);
        this.addClass(this._category, 'card__category_' + this._colorCategory[ category ]);
    }
}