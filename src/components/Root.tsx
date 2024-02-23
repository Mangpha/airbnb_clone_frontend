import {
	Box,
	Button,
	HStack,
	IconButton,
	Input,
	InputGroup,
	InputLeftElement,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	VStack,
	useDisclosure,
} from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { FaAirbnb, FaLock, FaMoon, FaUser } from 'react-icons/fa';

const Root = () => {
	const { isOpen, onClose, onOpen } = useDisclosure();

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
					<IconButton
						variant="ghost"
						aria-label="Toggle dark mode"
						icon={<FaMoon />}
					/>
					<Button onClick={onOpen}>Log In</Button>
					<Button colorScheme="red">Sign Up</Button>
				</HStack>
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
						</ModalBody>
					</ModalContent>
				</Modal>
			</HStack>
			<Outlet />
		</Box>
	);
};

export default Root;
