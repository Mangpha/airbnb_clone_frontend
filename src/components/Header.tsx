import {
	Box,
	Button,
	HStack,
	IconButton,
	LightMode,
	Stack,
	useColorMode,
	useColorModeValue,
	useDisclosure,
} from '@chakra-ui/react';
import { FaAirbnb, FaMoon, FaSun } from 'react-icons/fa';
import LoginModal from './LoginModal';
import SignUpModal from './SignUp';

const Header = () => {
	const {
		isOpen: isLoginOpen,
		onClose: onLoginClose,
		onOpen: onLoginOpen,
	} = useDisclosure();
	const {
		isOpen: isSignUpOpen,
		onClose: onSignUpClose,
		onOpen: onSignUpOpen,
	} = useDisclosure();
	const { toggleColorMode } = useColorMode();
	const logoColor = useColorModeValue('red.500', 'red.200');
	const Icon = useColorModeValue(FaMoon, FaSun);

	return (
		<Stack
			justifyContent={'space-between'}
			alignItems={'center'}
			py={5}
			px={10}
			direction={{
				sm: 'column',
				md: 'row',
			}}
			spacing={{
				sm: 3,
				md: 0,
			}}
			borderBottomWidth={1}
		>
			<Box color={logoColor}>
				<FaAirbnb size={48} />
			</Box>
			<HStack spacing={2}>
				<IconButton
					onClick={toggleColorMode}
					variant="ghost"
					aria-label="Toggle dark mode"
					icon={<Icon />}
				/>
				<Button onClick={onLoginOpen}>Log In</Button>
				<LightMode>
					<Button onClick={onSignUpOpen} colorScheme="red">
						Sign Up
					</Button>
				</LightMode>
			</HStack>
			<LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
			<SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
		</Stack>
	);
};

export default Header;
