import { useQuery } from '@tanstack/react-query';
import { getMe } from '../api';

export const useUser = () => {
	const { isLoading, data, isError } = useQuery({
		queryKey: ['me'],
		queryFn: getMe,
		retry: false,
	});

	return {
		userLoading: isLoading,
		user: data,
		isLoggedIn: !isError,
	};
};
