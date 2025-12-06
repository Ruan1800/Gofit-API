import { FastifyInstance } from "fastify";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userRepository } from "./user.repository";

export function userService(app: FastifyInstance) {
    const repo = userRepository(app);

    return {
        getUsers: async () => {
            return await repo.findAll();
        },

        getUserById: async (id: string) => {
            const user = await repo.findById(id);
            if (!user) throw new Error("Usuário não encontrado");
            return user;
        },

        getUserByName: async (name: string) => {
            const user = await repo.findByName(name);
            return user;
        },

        register: async (input: { name: string; email: string; password: string }) => {
            const exists = await repo.findByEmail(input.email);
            if (exists) throw new Error("Email já está em uso");

            const hashed = await bcrypt.hash(input.password, 10);

            const user = await repo.create({
                name: input.name,
                email: input.email,
                password: hashed,
                role: "USER",
            });

            const token = jwt.sign(
                { id: user.id, email: user.email },
                process.env.JWT_SECRET as string,
                { expiresIn: "1d" }
            );

            return { user, token };
        },

        deleteUser: async (id: string) => {
            const user = await repo.findById(id);
            if (!user) throw new Error("Usuário não encontrado");

            await repo.delete(id);
            return { message: "Usuário deletado com sucesso" };
        }
    };
}
