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
	const { status, data } = useSession({
		required: isVercel
	});

	useEffect(() => {
		if (fallbackInfo) {
			userStore.setState({
				user: fallbackInfo,
				fallback: true
			});
			return;
		}

		if (status == "authenticated") {
			userStore.setState({
				user: data.user as ThisUser,
				fallback: false
			});
		}
	}, [isVercel, fallbackInfo, data, status]);

	if (isVercel && status !== "authenticated") {
		return <Loader />;
	}

	return <IndexPage isFallback={Boolean(fallbackInfo)} />;
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
