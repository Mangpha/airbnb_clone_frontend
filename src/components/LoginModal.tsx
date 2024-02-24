import {
	Box,
	Button,
	Input,
	InputGroup,
	InputLeftElement,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	VStack,
} from '@chakra-ui/react';
import { FaLock, FaUser } from 'react-icons/fa';
import SocialLogin from './SocialLogin';

interface LoginModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Log In</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<VStack>
						<InputGroup>
							<InputLeftElement
								children={
									<Box color={'gray.500'}>
										<FaUser />
									</Box>
								}
							/>
							<Input variant={'filled'} placeholder="Username" />
						</InputGroup>
						<InputGroup>
							<InputLeftElement
								children={
									<Box color={'gray.500'}>
										<FaLock />
									</Box>
								}
							/>
							<Input variant={'filled'} placeholder="Password" />
						</InputGroup>
					</VStack>
					<Button mt={4} w={'100%'} colorScheme="red">
						Log In
					</Button>
					<SocialLogin />
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default LoginModal;