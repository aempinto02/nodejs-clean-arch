import { PrismaClient } from "@prisma/client";
import { Product } from "../../domain/product/entity/product";

export class ProductRepository {
    private constructor(private readonly prismaClient: PrismaClient) {
    }

    public static create(prismaClient: PrismaClient) {
        return new ProductRepository(prismaClient);
    }

    public async save(product: Product): Promise<void> {
        const data = {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: product.quantity
        };

        await this.prismaClient.product.create({ data });
    }

    public async list(): Promise<Product[]> {
        const products = await this.prismaClient.product.findMany();

        const productsList = products.map(prod => {
            const product = Product.with({
                id: prod.id,
                name: prod.name,
                price: prod.price,
                quantity: prod.quantity
            });

            return product;
            });
        
            return productsList;
    }
}