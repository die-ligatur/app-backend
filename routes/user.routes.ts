import { FastifyInstance, FastifyPluginOptions } from "fastify";
import {
  createUser,
  deleteUser,
  getUser,
  updateUser,
} from "../services/user.service";

interface GetUserRoute {
  Params: {
    id: string;
  };
}

interface CreateUserRoute {
  Body: any;
}
interface UpdateUserRoute {
  Body: { id: number; data: any };
}
interface DeleteUserRoute {
  Body: { id: number };
}

async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  // Get a user
  fastify.get<GetUserRoute>("/:id", async (request, response) => {
    try {
      const user = await getUser(parseInt(request.params.id));
      if (!user) response.status(404).send("User not found");
      response.send(user);
    } catch (err) {
      response.status(500).send("An Error Occured");
    }
  });

  // todo create a user
  fastify.post<CreateUserRoute>("/", async (request, response) => {
    await createUser(request.body);
    response.send("Create User");
  });

  // todo update a user
  fastify.put<UpdateUserRoute>("/", async (request, response) => {
    const updatedUser = await updateUser(
      { id: request.body.id },
      request.body.data
    );
    response.send(updatedUser);
  });

  // todo delete a user
  fastify.delete<DeleteUserRoute>("/", async (request, response) => {
    await deleteUser({ id: request.body.id });
    response.send(`Deleted User with id ${request.body.id}`);
  });
}

export default routes;
