import { Box, Button, HStack } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { FaAirbnb } from 'react-icons/fa';

const Root = () => {
	return (
		<Box>
			<HStack
				justifyContent={'space-between'}
				py={5}
				px={10}
				borderBottomWidth={1}
			>
				<Box color={'red.500'}>
					<FaAirbnb size={48} />
				</Box>
				<HStack spacing={2}>
					<Button>Log In</Button>
					<Button colorScheme="red">Sign Up</Button>
				</HStack>
			</HStack>
			<Outlet />
		</Box>
	);
};

export default Root;
