import { IComponent } from '../types';

export abstract class Component implements IComponent
{
    protected _container: HTMLElement;
    constructor (container: HTMLElement)
    {
        this._container = container;
    }

    public get content(): HTMLElement
    {
        return this._container;
    }

    public clearContent(elem: HTMLElement): void
    {
        elem.innerHTML = '';
    }

    public setText(elem: HTMLElement, text: string): void
    {
        elem.textContent = text;
    }

    public setId(elem: HTMLElement, id: string): void
    {
        elem.id = id;
    }

    public setImage(elem: HTMLElement, src: string, alt: string): void
    {
        if(elem instanceof HTMLImageElement)
        {
            elem.src = src;
            elem.alt = alt;
        }
    }

    public addClass(elem: HTMLElement, className: string): void
    {
        elem.classList.add(className);
    }

    public removeClass(elem: HTMLElement, className: string): void
    {
        elem.classList.remove(className);
    }

    public setDisabled(elem: HTMLElement, value: boolean): void
    {
        if(elem instanceof HTMLButtonElement)
        {
            elem.disabled = value;
        }
    }

    public toggleClass(elem: HTMLElement, className: string, force?: boolean): void
    {
        elem.classList.toggle(className, force);
    }


    public render(content: HTMLElement[], target?: HTMLElement): void
    {
        this.clearContent(target);

        if(target)
        {
            target.append(...content);
        }
    }

}