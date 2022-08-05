import type { GetStaticProps, NextPage } from "next";
import { useSession } from "next-auth/react";
import type { ThisUser } from "types/User";
import IndexPage from "components/IndexPage";
import { useEffect } from "react";
import userStore from "components/userStore";
import Loader from "components/Loader";

type Props = {
	isVercel: boolean;
	fallbackInfo: ThisUser | null;
};

const Home: NextPage<Props> = ({ isVercel, fallbackInfo }) => {
	const { status, data } = useSession();
	useEffect(() => {
		if (status === "authenticated") {
			userStore.setState({
				user: data.user as ThisUser,
				fallback: false
			});
		}
	}, [data, status]);

	useEffect(() => {
		if (fallbackInfo) {
			userStore.setState({
				user: fallbackInfo,
				fallback: true
			});
		}
	}, [fallbackInfo]);

	if (isVercel && status !== "authenticated") {
		return <Loader />;
	}

	return <IndexPage />;
};

export const getStaticProps: GetStaticProps = () => {
	const isVercel = Boolean(process.env.VERCEL);
	return {
		props: {
			isVercel,
			fallbackInfo: !isVercel ? JSON.parse(process.env.FALLBACK_USER_INFO) : null
		}
	};
};

export default Home;
