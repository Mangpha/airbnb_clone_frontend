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
	Text,
	VStack,
} from '@chakra-ui/react';
import { FaLock, FaUser } from 'react-icons/fa';
import { SocialLogin } from './SocialLogin';
import { useForm } from 'react-hook-form';

interface LoginModalProps {
	isOpen: boolean;
	onClose: () => void;
}

interface ILoginForm {
	username: string;
	password: string;
}

export const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ILoginForm>();
	const onSubmit = (data: ILoginForm) => {
		console.log('submitted');
	};
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Log In</ModalHeader>
				<ModalCloseButton />
				<ModalBody as={'form'} onSubmit={handleSubmit(onSubmit)}>
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
								isInvalid={Boolean(errors.username?.message)}
								variant={'filled'}
								placeholder="Username"
								{...register('username', {
									required: 'Username is required.',
								})}
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
								isInvalid={Boolean(errors.password?.message)}
								variant={'filled'}
								type={'password'}
								placeholder="Password"
								{...register('password', {
									required: 'Password is required.',
								})}
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
