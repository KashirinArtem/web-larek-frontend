import { IOnInit, ISuccessConfig } from '../types';
import { cloneTemplate, ensureElement } from '../utils/utils';
import { IEvents } from './base/events';
import { Component } from './Component';

export class Success extends Component implements IOnInit
{
    protected _description: HTMLElement;

    protected _closeBtn: HTMLElement;

    constructor ({ success, description, successBtn }: ISuccessConfig, protected _emitter: IEvents)
    {
        super(cloneTemplate(success));

        this._description = ensureElement(description, this._container);
        this._closeBtn = ensureElement(successBtn, this._container);

        this._closeBtn.addEventListener('click', () => this._emitter.emit('order:done'));

    }

    public onInit(totalPrice: number): void
    {
        this.setText(this._description, `Списано ${ totalPrice } синапсов`);
    }

}