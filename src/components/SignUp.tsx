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
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import { MdDriveFileRenameOutline } from 'react-icons/md';
import { SocialLogin } from './SocialLogin';

interface SignUpModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export const SignUpModal = ({ isOpen, onClose }: SignUpModalProps) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Sign Up</ModalHeader>
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
							<Input variant={'filled'} placeholder="Name" />
						</InputGroup>
						<InputGroup>
							<InputLeftElement
								children={
									<Box color={'gray.500'}>
										<MdDriveFileRenameOutline />
									</Box>
								}
							/>
							<Input variant={'filled'} placeholder="Username" />
						</InputGroup>
						<InputGroup>
							<InputLeftElement
								children={
									<Box color={'gray.500'}>
										<FaEnvelope />
									</Box>
								}
							/>
							<Input variant={'filled'} placeholder="Email" />
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
						Sign Up
					</Button>
					<SocialLogin />
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
