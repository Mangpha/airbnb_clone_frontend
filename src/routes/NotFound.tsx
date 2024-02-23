import { Button, Heading, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const NotFound = () => {
	return (
		<VStack bg={'gray.100'} justifyContent={'center'} minH={'100vh'}>
			<Heading>Page not found.</Heading>
			<Text>It seems that you're lost.</Text>
			<Link to="/">
				<Button variant={'link'} colorScheme={'red'}>
					Go home &rarr;
				</Button>
			</Link>
		</VStack>
	);
};

export default NotFound;