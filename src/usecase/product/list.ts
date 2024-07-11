import { Product } from "../../domain/product/entity/product";
import { ProductGateway } from "../../domain/product/gateway/product_gateway";
import { Usecase } from "../usecase";

export type ListProductInputDTO = void

export type ListProductOutputDTO = {
    products: {
        id: string;
        name: string;
        price: number;
        quantity: number;
    }[]
}

export class ListProductUsecase implements Usecase<ListProductInputDTO, ListProductOutputDTO> {
    private constructor(private readonly productGateway: ProductGateway) { }

    public static create(productGateway: ProductGateway) {
        return new ListProductUsecase(productGateway);
    }

    public async execute(): Promise<ListProductOutputDTO> {
        const products = await this.productGateway.list();

        const output = this.presentOutput(products);

        return output;
    }

    private presentOutput(products: Product[]): ListProductOutputDTO {
        return {
            products: products.map(product => ({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: product.quantity
            }))
        }
    }
}