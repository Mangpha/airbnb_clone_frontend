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
import { SocialLogin } from './SocialLogin';
import React, { useState } from 'react';

interface LoginModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const onChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
		const { name, value } = event.currentTarget;
		if (name === 'username') setUsername(value);
		else if (name === 'password') setPassword(value);
	};
	const onSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log(username, password);
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Log In</ModalHeader>
				<ModalCloseButton />
				<ModalBody as={'form'} onSubmit={onSubmit as any}>
					<VStack>
						<InputGroup>
							<InputLeftElement
								children={
									<Box color={'gray.500'}>
										<FaUser />
									</Box>
								}
							/>
							<Input
								required
								name={'username'}
								value={username}
								onChange={onChange}
								variant={'filled'}
								placeholder="Username"
							/>
						</InputGroup>
						<InputGroup>
							<InputLeftElement
								children={
									<Box color={'gray.500'}>
										<FaLock />
									</Box>
								}
							/>
							<Input
								required
								name={'password'}
								value={password}
								onChange={onChange}
								variant={'filled'}
								type={'password'}
								placeholder="Password"
							/>
						</InputGroup>
					</VStack>
					<Button type={'submit'} mt={4} w={'100%'} colorScheme="red">
						Log In
					</Button>
					<SocialLogin />
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
