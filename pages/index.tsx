import type { GetStaticProps, NextPage } from "next";
import { useSession } from "next-auth/react";
import type { ThisUser } from "types/User";
import IndexPage from "components/IndexPage";

type Props = {
	vercel: boolean;
	fallbackInfo: ThisUser | null;
};

const Home: NextPage<Props> = ({ vercel, fallbackInfo }) => {
	const { status, data } = useSession({
		required: vercel
	});

	if (!vercel && fallbackInfo) {
		return <IndexPage user={fallbackInfo} isFallback />;
	}

	if (status !== "authenticated") {
		return null;
	}

	return <IndexPage user={data?.user as ThisUser} />;
};

export const getStaticProps: GetStaticProps = () => {
	const vercel = Boolean(process.env.VERCEL);
	return {
		props: {
			vercel,
			fallbackInfo: !vercel ? JSON.parse(process.env.FALLBACK_USER_INFO!) : null
		}
	};
};

export default Home;
