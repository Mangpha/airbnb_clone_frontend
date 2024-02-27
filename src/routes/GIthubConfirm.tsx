import { Heading, Spinner, Text, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { githubLogin } from '../api';

export const GithubConfirm = () => {
	const { search } = useLocation();
	const confirmLogin = async () => {
		const params = new URLSearchParams(search);
		const code = params.get('code');
		if (code) await githubLogin(code);
	};
	useEffect(() => {
		confirmLogin();
	}, []);
	return (
		<VStack justifyContent={'center'} mt={60}>
			<Heading>Processing log in ...</Heading>
			<Text>Don't go anywhere</Text>
			<Spinner mt={10} size={'xl'} />
		</VStack>
	);
};
