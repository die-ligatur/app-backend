import fastify from "fastify";
import userRoutes from './routes/user.routes'

const app = fastify({logger: true});

app.register(userRoutes, {prefix: '/user'});

// Fallback Home-Route
app.get("/", (request, response) => {
  response.send("Ligatur API v1.0.0");
});

app.listen(3000, () => console.log("listening on http://localhost:3000/"));