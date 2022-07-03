import type { GetStaticProps, NextPage } from "next";
import { useSession } from "next-auth/react";
import type { ThisUser } from "types/User";
import IndexPage from "components/IndexPage";
import { useEffect } from "react";
import userStore from "components/userStore";
import Loader from "components/Loader";

type Props = {
	vercel: boolean;
	fallbackInfo: ThisUser | null;
};

const Home: NextPage<Props> = ({ vercel, fallbackInfo }) => {
	const { status, data } = useSession({
		required: vercel
	});

	useEffect(() => {
		if (status == "authenticated") {
			userStore.setState({
				user: data.user as ThisUser,
				fallback: false
			});
		} else if (vercel && fallbackInfo) {
			userStore.setState({
				user: fallbackInfo,
				fallback: true
			});
		}
	}, [vercel, fallbackInfo, data, status]);

	if (!vercel && fallbackInfo) {
		return <IndexPage isFallback />;
	}

	if (status !== "authenticated") {
		return <Loader />;
	}

	return <IndexPage />;
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
