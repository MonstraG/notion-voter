import useSWRImmutable from "swr/immutable";
import { useSession } from "next-auth/react";

const useIsAdmin = (): boolean => {
	const { status } = useSession();

	const authenticated = status === "authenticated";
	const { data: isAdminResponse } = useSWRImmutable<boolean | null>(
		authenticated ? "/api/admin/isAdmin" : null
	);

	return isAdminResponse ?? false;
};

export default useIsAdmin;
