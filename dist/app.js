"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildApp = buildApp;
const fastify_1 = __importDefault(require("fastify"));
const index_1 = __importDefault(require("./routes/index"));
function buildApp() {
    const app = (0, fastify_1.default)({
        logger: true,
    });
    app.register(index_1.default);
    return app;
}
