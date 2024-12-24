import { IOrderConfig } from '../types';
import { cloneTemplate, ensureElement } from '../utils/utils';
import { IEvents } from './base/events';
import { Component } from './Component';

export class Form extends Component
{
    protected _submit: HTMLElement;
    protected _errors: HTMLElement;
    constructor ({ form, submit, errors }: Partial<IOrderConfig>, protected _emitter: IEvents)
    {
        super(cloneTemplate(form));

        this._submit = ensureElement(submit, this._container);
        this._errors = ensureElement(errors, this._container);

        this._container.addEventListener('input', e =>
        {
            e.preventDefault();
            e.stopPropagation();

            const input = e.target as HTMLInputElement;

            this._emitter.emit(
                `${ (<HTMLFormElement> this._container).name }:${ input.name }`,
                { [ input.name ]: input.value });
        });

        this._container.addEventListener('submit', (e) =>
        {
            e.preventDefault();

            this._emitter.emit(`${ (<HTMLFormElement> this._container).name }:submit`);
        });
    }

    get submit(): HTMLButtonElement
    {
        return this._submit as HTMLButtonElement;
    }

    set errors(errors: string[])
    {
        if(!errors.length)
        {
            this._errors.textContent = '';
        } else
        {
            errors.forEach(err =>
            {
                this._errors.textContent = err;
            });
        }
    }

    public resetErrors(): void
    {
        this.errors = [];
    }

    public resetForm(): void
    {
        if(this._container instanceof HTMLFormElement) this._container.reset();
    }








}