import { Product } from "../../domain/product/entity/product";
import { ProductGateway } from "../../domain/product/gateway/product_gateway";
import { Usecase } from "../usecase"

export type CreateProductInputDTO = {
    name: string;
    price: number;
}

export type CreateProductOutputDTO = {
    id: string;
}

export class CreateProductUsecase implements Usecase<CreateProductInputDTO, CreateProductOutputDTO> {
    private constructor(private readonly productGateway: ProductGateway) { }

    public static create(productGateway: ProductGateway) {
        return new CreateProductUsecase(productGateway);
    }

    public async execute({ name, price }: CreateProductInputDTO): Promise<CreateProductOutputDTO> {
        const product = await Product.create(
            name,
            price
        );

        await this.productGateway.save(product);

        const output = this.presentOutput(product);

        return output;
    }

    private presentOutput(product: Product): CreateProductOutputDTO {
        return {
            id: product.id
        }
    }
}