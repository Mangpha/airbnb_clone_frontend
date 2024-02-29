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
	useToast,
} from '@chakra-ui/react';
import { FaLock, FaUser } from 'react-icons/fa';
import { SocialLogin } from './SocialLogin';
import { useForm } from 'react-hook-form';
import {
	ICommonLogin,
	ICommonLoginFail,
	ICommonLoginSuccess,
	commonLogin,
} from '../api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface LoginModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ICommonLogin>();
	const toast = useToast();
	const queryClient = useQueryClient();
	const mutation = useMutation<
		ICommonLoginSuccess,
		ICommonLoginFail,
		ICommonLogin
	>({
		mutationFn: commonLogin,
		onMutate: () => {
			console.log('mutation starting');
		},
		onSuccess: (data) => {
			toast({
				title: 'Welcome',
				description: 'welcome back.',
				position: 'top',
				isClosable: true,
				status: 'success',
			});
			onClose();
			queryClient.refetchQueries({
				queryKey: ['me'],
			});
		},
		onError: (error) => {
			console.log('mutation error');
		},
	});
	const onSubmit = ({ username, password }: ICommonLogin) => {
		mutation.mutate({ username, password });
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
					<Button
						isLoading={mutation.isPending}
						type={'submit'}
						mt={4}
						w={'100%'}
						colorScheme="red"
					>
						Log In
					</Button>
					<SocialLogin />
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
