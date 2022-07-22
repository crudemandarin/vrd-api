import { Prisma } from "@prisma/client";

import logger from "./logger/logger";

interface ErrorResult {
	code: number;
	message: string;
}

class PrismaUtil {
	static handleError(err: unknown): ErrorResult {
		if (err instanceof Prisma.PrismaClientKnownRequestError) {
			return { code: 400, message: err.message };
		} else if (err instanceof Prisma.PrismaClientUnknownRequestError) {
			return { code: 400, message: err.message };
		} else if (err instanceof Prisma.PrismaClientRustPanicError) {
			return { code: 500, message: err.message };
		} else if (err instanceof Prisma.PrismaClientInitializationError) {
			return { code: 500, message: err.message };
		} else if (err instanceof Prisma.PrismaClientValidationError) {
			return { code: 400, message: err.message };
		}

		logger.warn(`Unrecognized Error: ${JSON.stringify(err)}`);

		return { code: 500, message: "Internal Server Error" };
	}
}

export default PrismaUtil;
