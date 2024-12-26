import { IModal, IModalConfig } from '../types';
import { ensureElement } from '../utils/utils';
import { IEvents } from './base/events';
import { Component } from './Component';

export class Modal extends Component implements IModal
{
    protected _content: HTMLElement;
    protected _closeBtn: HTMLElement;
    protected _selector: string;

    constructor ({ modal, closeBtn, content, selector }: IModalConfig, protected _emitter: IEvents)
    {
        super(ensureElement(modal));

        this._content = ensureElement(content, this._container);
        this._closeBtn = ensureElement(closeBtn, this._container);
        this._selector = selector;

        this._closeBtn.addEventListener('click', this.close);
        this._container.addEventListener('click', this.close);
        this._content.addEventListener('click', e =>
        {
            e.stopPropagation();
        });
    }

    public open(): void
    {
        this.clearContent(this._content);
        this.addClass(this._container, this._selector);
        document.addEventListener('keydown', this._closeByEsc);
        this._emitter.emit('modal:open');
    }

    public close = (): void =>
    {
        this.clearContent(this._content);
        this.removeClass(this._container, this._selector);
        document.removeEventListener('keydown', this._closeByEsc);
        this._emitter.emit('modal:close');

    };

    protected _closeByEsc = (e: KeyboardEvent): void =>
    {
        if(e.key === 'Escape') this.close();
    };

    public override render(content: HTMLElement[]): void
    {
        this.open();
        this._content.append(...content);
    }
}