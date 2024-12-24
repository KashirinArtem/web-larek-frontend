import { IPage } from '../types';
import { ensureElement } from '../utils/utils';
import { IEvents } from './base/events';
import { Component } from './Component';

export class Page extends Component implements IPage
{
    protected _gallery: HTMLElement;
    protected _counter: HTMLElement;
    protected _basket: HTMLElement;




    constructor (container: string, emitter: IEvents)
    {
        super(ensureElement(container));

        this._gallery = ensureElement('.gallery', this._container);
        this._counter = ensureElement('.header__basket-counter', this._container);
        this._basket = ensureElement('.header__basket', this._container);

        this._basket.addEventListener('click', () => emitter.emit('basket:open'));
    }

    set gallery(elements: HTMLElement[])
    {
        this.render(elements, this._gallery);
    }

    set isLockedContainerByScroll(value: boolean)
    {
        value ?
            this.addClass(this._container, 'page__wrapper_locked') :
            this.removeClass(this._container, 'page__wrapper_locked');
    }

    set counter(count: number)
    {
        this.setText(this._counter, String(count));

    }




}