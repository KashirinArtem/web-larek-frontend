
import { App } from './components/App';
import { EventEmitter } from './components/base/events';
import { Basket } from './components/Basket';
import { CardBasket } from './components/CardBasket';
import { CardGallery } from './components/CardGallery';
import { CardPreview } from './components/CardPreview';
import { Contact } from './components/Contact';
import { LarekApi } from './components/LarekApi';
import { Modal } from './components/Modal';
import { Order } from './components/Order';
import { Page } from './components/Page';
import { Success } from './components/Success';
import './scss/styles.scss';
import { IBasketConfig, ICardBasketConfig, ICardConfig, IModalConfig, IOrderConfig, IProduct, ISuccessConfig } from './types';
import { cloneTemplate } from './utils/utils';

const cardGalleryConfig: ICardConfig = {
    card: '#card-catalog',
    category: '.card__category',
    title: '.card__title',
    price: '.card__price',
    image: '.card__image'
};
const cardPreviewConfig: ICardConfig = {
    card: '#card-preview',
    category: '.card__category',
    title: '.card__title',
    price: '.card__price',
    image: '.card__image',
    description: '.card__text',
    cardBtn: '.card__button'
};
const modalConfig: IModalConfig = {
    modal: '#modal-container',
    closeBtn: '.modal__close',
    content: '.modal__content',
    selector: 'modal_active'
};
const basketConfig: IBasketConfig = {
    basket: '#basket',
    list: '.basket__list',
    orderBtn: '.basket__button',
    totalPrice: '.basket__price'
};
const cardBasketConfig: ICardBasketConfig = {
    card: '#card-basket',
    index: '.basket__item-index',
    title: '.card__title',
    price: '.card__price',
    deleteBtn: '.basket__item-delete'
};
const orderConfig: Partial<IOrderConfig> = {
    form: '#order',
    paymentBtn: '.button_alt',
    address: '.form__input',
    submit: '.order__button',
    errors: '.form__errors'
};
const contactConfig: Partial<IOrderConfig> = {
    form: '#contacts',
    submit: '.pay__button',
    errors: '.form__errors',
    phone: '.form__phone',
    email: '.form__email'
};
const successConfig: ISuccessConfig = {
    success: '#success',
    description: '.order-success__description',
    successBtn: '.order-success__close'
};


const emitter = new EventEmitter();
const page = new Page('.page__wrapper', emitter);
const app = new App();
const api = new LarekApi(
    'https://larek-api.nomoreparties.co/api/weblarek',
    'https://larek-api.nomoreparties.co/content/weblarek'
);
const modal = new Modal(modalConfig, emitter);
const basket = new Basket(basketConfig, emitter);
const order = new Order(orderConfig, emitter);
const contact = new Contact(contactConfig, emitter);
const success = new Success(successConfig, emitter);

api.getAllProducts()
    .then(
        products =>
        {
            app.productList.push(...products);
            emitter.emit('products:render');
        })
    .catch(console.log);

emitter.on('modal:open', () =>
{
    page.isLockedContainerByScroll = true;
});

emitter.on('modal:close', () =>
{
    order.resetForm();
    order.resetPayment();
    order.resetErrors();

    contact.resetForm();
    contact.resetErrors();

    page.isLockedContainerByScroll = false;
});

emitter.on('products:render', () =>
{
    page.gallery = app.productList.map(product =>
    {
        const card = new CardGallery(
            cardGalleryConfig,
            () =>
            {
                emitter.emit('card:select', product);
            }
        );

        card.onInit(product);

        return card.content;
    });
});

emitter.on<IProduct>('card:select', product =>
{
    const cardPreview = new CardPreview(cardPreviewConfig, () => 
    {
        emitter.emit('product:add', product);
    });

    cardPreview.onInit(product);

    modal.render([ cardPreview.content ]);
});

emitter.on<IProduct>('product:add', product =>
{
    app.basketList.push(product);

    page.counter = app.basketList.length;

    modal.close();
});

emitter.on('basket:open', () =>
{

    basket.disabled = !app.basketList.length;
    basket.price = app.basketList.reduce(
        (prev, product) => prev + Number(product.price), 0);

    if(app.basketList.length)
    {
        const cardItems = app.basketList.map((product, index) =>
        {
            console.log('index', index);
            const card = new CardBasket(
                cardBasketConfig,
                () => emitter.emit('card:remove', {
                    product,
                    index
                }));

            card.onInit({
                ...product,
                index: index + 1
            });

            return card.content;
        });

        basket.render(cardItems);
    } else
    {
        basket.render([ cloneTemplate('#basket-empty') ]);
    }

    modal.render([ basket.content ]);
});

emitter.on<IProduct & { index: number; }>('card:remove', item =>
{
    app.basketList.splice(item.index, 1);

    page.counter = app.basketList.length;

    emitter.emit('basket:open',);
});

emitter.on('basket:order', () =>
{
    app.order.items = app.basketList.map(product => product.id);
    app.order.total = app.basketList.reduce(
        (prev, product) => prev + Number(product.price), 0);

    const isValid = app.paymentState.isValid && app.addressState.isValid;

    order.setDisabled(order.submit, !isValid);

    modal.render([ order.content ]);
});

emitter.on<{ address: string; }>('order:address', input =>
{
    order.address = input.address;
});

emitter.on<{ payment: string; }>('order:payment', input =>
{
    const isValid = () => app.paymentState.isValid && app.addressState.isValid;

    if(!input?.payment)
    {
        app.paymentState.isValid = false;
        app.errors.push(app.paymentState.errorMessage);

        order.errors = app.errors;
        order.setDisabled(order.submit, true);

        return;
    } else
    {
        app.order.payment = input.payment;
        app.paymentState.isValid = true;
        app.resetErrors();

        order.resetErrors();

        !isValid() && emitter.emit('address:validation');
    }

    isValid() && order.setDisabled(order.submit, false);
});

emitter.on<{ email: string; }>('contacts:email', input =>
{
    contact.email = input.email;
});

emitter.on<{ email: string; }>('email:validation', input =>
{
    const isValid = () => app.emailSate.isValid && app.phoneState.isValid;

    if(!app.isEmailValid(input.email))
    {
        app.emailSate.isValid = false;
        app.errors.push(app.emailSate.errorMessage);

        contact.errors = app.errors;
        contact.setDisabled(contact.submit, !isValid());

        return;
    }
    else
    {
        app.emailSate.isValid = true;
        app.order.email = input.email;
        app.resetErrors();

        contact.resetErrors();
        contact.setDisabled(contact.submit, !isValid());
    }

    !isValid() && emitter.emit('phone:validation', { phone: contact.phone });
});

emitter.on<{ phone: string; }>('contacts:phone', input =>
{
    contact.phone = input.phone;

});

emitter.on<{ phone: string; }>('phone:validation', input =>
{
    const isValid = () => app.emailSate.isValid && app.paymentState.isValid;
    contact.setDisabled(order.submit, !isValid());

    if(!app.isPhoneValid(input.phone))
    {
        app.phoneState.isValid = false;
        app.errors.push(app.phoneState.errorMessage);

        contact.errors = app.errors;
        contact.setDisabled(contact.submit, !isValid());

        return;
    } else
    {
        app.phoneState.isValid = true;
        app.order.phone = input.phone;
        app.resetErrors();

        contact.resetErrors();
        contact.setDisabled(contact.submit, !isValid());
    }

    !isValid() && emitter.emit('email:validation', { email: contact.email });
});

emitter.on<{ address: string; }>('address:validation', input =>
{

    const address = input?.address || order.address;
    const isValid = () => app.paymentState.isValid && app.addressState.isValid;

    if(!app.isAddressValid(address))
    {
        app.addressState.isValid = false;
        app.errors.push(app.addressState.errorMessage);

        order.errors = app.errors;
        order.setDisabled(order.submit, true);

    } else
    {
        app.order.address = input.address;
        app.addressState.isValid = true;
        app.resetErrors();

        order.resetErrors();
        order.setDisabled(order.submit, false);

        !isValid() && emitter.emit('order:payment');
    }

    !isValid() && order.setDisabled(order.submit, true);
});

emitter.on('order:submit', () =>
{
    app.resetOrderFormState();
    app.resetErrors();

    order.resetErrors();
    order.resetPayment();
    order.resetForm();
    order.setDisabled(order.submit, true);

    modal.render([ contact.content ]);

    contact.setDisabled(contact.submit, true);
});

emitter.on('contacts:submit', () =>
{
    const validItemId = app.basketList
        .filter(item => item.price)
        .map(item => item.id);

    page.counter = 0;

    app.resetContactFormState();
    app.resetErrors();
    app.basketList = [];

    if(!validItemId.length)
    {
        success.onInit(0);

        modal.render([ success.content ]);

        app.order = {
            payment: '',
            address: '',
            phone: '',
            email: '',
            items: [],
            total: 0
        };

        return;
    }

    api
        .postOrder({
            ...app.order,
            items: validItemId
        })
        .then(order =>
        {
            contact.setDisabled(contact.submit, true);

            success.onInit(order.total);

            modal.render([ success.content ]);

            app.order = {
                payment: '',
                address: '',
                phone: '',
                email: '',
                items: [],
                total: 0
            };
        })
        .catch(console.log);
});

emitter.on('order:done', () =>
{
    modal.close();

    success.onInit(0);
});
