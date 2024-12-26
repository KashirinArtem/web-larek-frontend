import { IApiOrderResponse, ILarekApi, IOrder, IProduct } from '../types';
import { Api, ApiListResponse } from './base/api';

export class LarekApi extends Api implements ILarekApi
{
    constructor (
        baseUrl: string,
        protected _cdn: string,
        options?: RequestInit,)
    {
        super(baseUrl, options);
    }
    public getAllProducts(): Promise<IProduct[]>
    {
        return this
            .get('/product')
            .then(({ items }: ApiListResponse<IProduct>): IProduct[] =>
            {
                return items.map((item: IProduct): IProduct =>
                {
                    return {
                        ...item,
                        image: this._cdn + item.image
                    };
                });
            });
    }

    public postOrder(order: IOrder): Promise<IApiOrderResponse>
    {
        return this.post('/order', order).then(order => order as IApiOrderResponse);
    }
}