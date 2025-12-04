import { buildApp } from "./app";
import { env } from "./config/env";

const app = buildApp();

app.listen({ port: Number(env.PORT), host: "0.0.0.0" }).then(() => {
  console.log(`🚀 Server running on port ${env.PORT}`);
});