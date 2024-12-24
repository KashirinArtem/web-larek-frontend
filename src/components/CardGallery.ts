import { CategoryClassName, ICardConfig, IProduct, THandler } from '../types';
import { cloneTemplate, ensureElement } from '../utils/utils';
import { Component } from './Component';

export class CardGallery extends Component
{
    protected _category: HTMLElement;
    protected _title: HTMLElement;
    protected _image: HTMLElement;
    protected _price: HTMLElement;
    protected _colorCategory: Record<string, string> = Object.fromEntries(Object.entries(CategoryClassName));

    constructor ({ card, category, title, image, price }: ICardConfig, protected _handler?: THandler)
    {
        super(cloneTemplate(card));

        this._category = ensureElement(category, this._container);
        this._title = ensureElement(title, this._container);
        this._image = ensureElement(image, this._container);
        this._price = ensureElement(price, this._container);

        this._handler && this._container.addEventListener('click', this._handler);
    }

    public init({ id, title, category, image, price }: IProduct): void
    {
        this.id = id;
        this.title = title;
        this.image = image;
        this.category = category;
        this.price = price;
    }

    set id(id: string)
    {
        this.setId(this._container, id);
    }

    set title(title: string)
    {
        this.setText(this._title, title);
    }

    set image(image: string)
    {
        this.setImage(this._image, image, this.title);
    }

    set category(category: string)
    {
        this.setText(this._category, category);
        this.addClass(this._category, 'card__category_' + this._colorCategory[ category ]);
    }

    set price(price: number | null)
    {
        this.setText(this._price, price ? price + ' синапсов' : 'Бесценно');
    }
}