import { Request, Response } from "express";
import { CreateProductInputDTO, CreateProductUsecase } from "../../../../../usecase/product/create";
import { HttpMethod, Route } from "../routes";

export type CreateProductResponseDTO = {
    id: string;
}

export class CreateProductRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly createProductService: CreateProductUsecase) { }

    public static create(createProductService: CreateProductUsecase) {
        return new CreateProductRoute('/products', HttpMethod.POST, createProductService);
    }

    public getHandler() {
        return async (request: Request, response: Response) => {
            const { name, price } = request.body;

            const input: CreateProductInputDTO = {
                name,
                price
            }

            const output = await this.createProductService.execute(input);

            const responseBody = this.present(output);

            response.status(201).json(responseBody);
        }
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        return this.method;
    }

    private present(input: CreateProductResponseDTO): CreateProductResponseDTO {
        const response = { id: input.id}

        return response;
    }
}