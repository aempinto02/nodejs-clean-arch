import { ApiExpress } from "./infra/api/express/api.express";
import { CreateProductRoute } from "./infra/api/express/routes/product/create.express.route";
import { ListProductRoute } from "./infra/api/express/routes/product/list.express.route";
import { ProductRepository } from "./infra/repository/product";
import { prisma } from "./package/prisma/prisma";
import { CreateProductUsecase } from "./usecase/product/create";
import { ListProductUsecase } from "./usecase/product/list";

function main() {
    const repository = ProductRepository.create(prisma);

    const createProductUsecase = CreateProductUsecase.create(repository);
    const listProductUsecase = ListProductUsecase.create(repository);

    const createRoute = CreateProductRoute.create(createProductUsecase);
    const listRoute = ListProductRoute.create(listProductUsecase);

    const port = 8000;

    const api = ApiExpress.create([createRoute, listRoute]);

    api.start(port);
}

main();