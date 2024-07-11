import { Request, Response } from "express";
import { ListProductInputDTO, ListProductUsecase } from "../../../../../usecase/product/list";
import { HttpMethod, Route } from "../routes";

export type ListProductResponseDTO = {
    products: {
        id: string;
        name: string;
        price: number;
    }[];
}

export class ListProductRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly listProductService: ListProductUsecase) { }

    public static create(listProductService: ListProductUsecase) {
        return new ListProductRoute('/products', HttpMethod.GET, listProductService);
    }

    public getHandler() {
        return async (request: Request, response: Response) => {
            const output = await this.listProductService.execute();

            const responseBody = this.present(output);

            response.status(200).json(responseBody);
        }
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        return this.method;
    }

    private present(input: ListProductResponseDTO): ListProductResponseDTO {
        const response: ListProductResponseDTO = {
            products: input.products.map(product => ({
                id: product.id,
                name: product.name,
                price: product.price
            }))
        };

        return response;
    }
}
