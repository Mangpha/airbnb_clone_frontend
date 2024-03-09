import { Heading, Spinner, Text, VStack, useToast } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { githubLogin } from '../api';
import { useQueryClient } from '@tanstack/react-query';

export const GithubConfirm = () => {
	const { search } = useLocation();
	const toast = useToast();
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const confirmLogin = async () => {
		const params = new URLSearchParams(search);
		const code = params.get('code');
		if (code) {
			const status = await githubLogin(code);
			if (status === 200) {
				toast({
					status: 'success',
					title: 'Welcome',
					description: 'welcome back',
					position: 'top',
					isClosable: true,
				});
				queryClient.refetchQueries({
					queryKey: ['me'],
				});
				navigate('/');
			}
		}
	};
	useEffect(() => {
		confirmLogin();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<VStack justifyContent={'center'} mt={60}>
			<Heading>Processing log in ...</Heading>
			<Text>Don't go anywhere</Text>
			<Spinner mt={10} size={'xl'} />
		</VStack>
	);
};
