import { FastifyInstance, FastifyPluginOptions } from "fastify";
import {
  createUser,
  deleteUser,
  getUser,
  updateUser,
} from "../services/user.service";

interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
}

interface GetUserRouteOptions {
  Body: User;
}
interface CreateUserRouteOptions {
  Body: User;
}
interface UpdateUserRouteOptions {
  Body: { id: number; data: any };
}
interface DeleteUserRouteOptions {
  Body: { id: number };
}

async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  // Get a user
  fastify.get<GetUserRouteOptions>("/", async (request, response) => {
    await getUser(request.body);
    response.send("Get User");
  });

  // create a user
  fastify.post<CreateUserRouteOptions>("/", async (request, response) => {
    await createUser(request.body);
    response.send("Create User");
  });

  // update a user
  fastify.put<UpdateUserRouteOptions>("/", async (request, response) => {
    const updatedUser = await updateUser(
      { id: request.body.id },
      request.body.data
    );
    response.send(updatedUser);
  });

  // delete a user
  fastify.delete<DeleteUserRouteOptions>("/", async (request, response) => {
    await deleteUser({ id: request.body.id });
    response.send(`Deleted User with id ${request.body.id}`);
  });
}

export default routes;
