"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = routes;
async function routes(app) {
    app.get("/", async () => ({
        message: "CopiFit API (TypeScript) is running 🚀",
    }));
}
