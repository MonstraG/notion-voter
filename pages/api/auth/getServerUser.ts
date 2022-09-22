import { authOptions } from "pages/api/auth/[...nextauth].api";
import { unstable_getServerSession } from "next-auth";
import type { NextApiRequest, NextApiResponse } from "next";
import type { ThisUser } from "types/next-auth";

const debugMode = !Boolean(process.env.VERCEL);
const fallbackUser = JSON.parse(process.env.FALLBACK_USER_INFO!);

export const getServerUser = (req: NextApiRequest, res: NextApiResponse): Promise<ThisUser> => {
	if (debugMode) return Promise.resolve(fallbackUser);

	return unstable_getServerSession(req, res, authOptions).then(
		(session) => session.user as ThisUser
	);
};
