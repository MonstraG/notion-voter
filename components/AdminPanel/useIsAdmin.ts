import useSWRImmutable from "swr/immutable";
import { useSession } from "next-auth/react";

const useIsAdmin = (): boolean => {
	const { status } = useSession({ required: false });

	const authenticated = status === "authenticated";
	const { data: isAdminResponse } = useSWRImmutable<boolean | null>(
		authenticated ? "/api/auth/isAdmin/" : null
	);

	return isAdminResponse ?? false;
};

export default useIsAdmin;
