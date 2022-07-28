import { PrismaClient } from "@prisma/client";
import { compare, hash } from "bcrypt";

import Util from "../utils/Util";
import AuthUtil from "../utils/AuthUtil";
import { SALT_ROUNDS } from "../utils/config";

class AuthService {
	static async getSecret(): Promise<string> {
		return process.env.TOKEN_SECRET;
	}

	static async login(email: string, password: string): Promise<string> {
		const prisma = new PrismaClient();
		const user = await prisma.user.findUnique({ where: { email } });
		if (!user) return undefined;
		const result = await compare(password, user.password_hash);
		if (!result) return undefined;
		const { user_id, role, first_name, last_name } = user;
		const payload = { user: { user_id, role, first_name, last_name, email } };
		const secret = await AuthService.getSecret();
		const token = AuthUtil.generateAccessToken(payload, secret);
		return token;
	}

	static async createUser(
		email: string,
		password: string,
		role: string,
		first_name: string,
		last_name: string
	) {
		const user_id = Util.generateId();
		const password_hash = await hash(password, SALT_ROUNDS);
		const prisma = new PrismaClient();
		const result = prisma.user.create({
			data: { user_id, email, password_hash, role, first_name, last_name },
		});
		return result;
	}
}

export default AuthService;
