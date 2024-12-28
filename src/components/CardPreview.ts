import { ICardConfig, IProduct, THandler } from '../types';
import { ensureElement } from '../utils/utils';
import { CardGallery } from './CardGallery';

export class CardPreview extends CardGallery
{
    protected _description: HTMLElement;
    protected _cardBtn: HTMLElement;

    constructor (
        { card, category, title, image, price, description, cardBtn }: ICardConfig,
        protected _handler: THandler)
    {
        super({ card, category, title, image, price });

        this._description = ensureElement(description, this._container);
        this._cardBtn = ensureElement(cardBtn, this._container);

        this._cardBtn.addEventListener('click', this._handler);
    }

    public override onInit(product: IProduct): void
    {
        super.onInit(product);

        this.setText(this._description, product.description);
    }
}