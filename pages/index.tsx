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
		return <IndexPage voter={fallbackInfo} />;
	}

	if (status !== "authenticated") {
		return null;
	}

	return <IndexPage voter={data?.user as ThisUser} />;
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
