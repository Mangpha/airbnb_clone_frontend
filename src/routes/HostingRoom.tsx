import {
	Box,
	Button,
	Checkbox,
	Container,
	FormControl,
	FormHelperText,
	FormLabel,
	Grid,
	Heading,
	Input,
	InputGroup,
	InputLeftAddon,
	Select,
	Text,
	Textarea,
	VStack,
	useToast,
} from '@chakra-ui/react';
import { useHostOnlyPage } from '../components/HostOnlyPage';
import { ProtectedPage } from '../components/ProtectedPage';
import { FaBed, FaDollarSign, FaToilet } from 'react-icons/fa';
import { useMutation, useQuery } from '@tanstack/react-query';
import { IHostRoomVar, getAmenities, getCategories, hostRoom } from '../api';
import { IAmenity, ICategory, IRoomDetail } from '../types';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export const HostingRoom = () => {
	const toast = useToast();
	const navigate = useNavigate();
	const { data: amenitiesData } = useQuery<IAmenity[]>({
		queryKey: ['amenities'],
		queryFn: getAmenities,
	});
	const { data: categoriesData } = useQuery<ICategory[]>({
		queryKey: ['categories'],
		queryFn: getCategories,
	});

	const { register, handleSubmit } = useForm<IHostRoomVar>();
	const mutation = useMutation({
		mutationFn: hostRoom,
		onSuccess: (data: IRoomDetail) => {
			toast({
				status: 'success',
				title: 'Room created.',
				position: 'top',
				isClosable: true,
			});
			navigate(`/rooms/${data.pk}`);
		},
	});
	const onSubmit = (data: IHostRoomVar) => {
		mutation.mutate(data);
	};

	useHostOnlyPage();
	return (
		<ProtectedPage>
			<Box
				pb={40}
				mt={10}
				px={{
					base: 10,
					lg: 40,
				}}
			>
				<Container>
					<Heading textAlign={'center'}>Hosting Room</Heading>
					<VStack
						spacing={10}
						as={'form'}
						mt={5}
						onSubmit={handleSubmit(onSubmit)}
					>
						<FormControl>
							<FormLabel>Name</FormLabel>
							<Input
								{...register('name', { required: true })}
								required
								type={'text'}
							/>
							<FormHelperText>Write name of your room</FormHelperText>
						</FormControl>
						<FormControl>
							<FormLabel>Country</FormLabel>
							<Input
								{...register('country', { required: true })}
								required
								type={'text'}
							/>
						</FormControl>
						<FormControl>
							<FormLabel>City</FormLabel>
							<Input
								{...register('city', { required: true })}
								required
								type={'text'}
							/>
						</FormControl>
						<FormControl>
							<FormLabel>Address</FormLabel>
							<Input
								{...register('address', { required: true })}
								required
								type={'text'}
							/>
						</FormControl>
						<FormControl>
							<FormLabel>Price</FormLabel>
							<InputGroup>
								<InputLeftAddon children={<FaDollarSign />} />
								<Input
									{...register('price', { required: true })}
									type={'number'}
									min={0}
								/>
							</InputGroup>
						</FormControl>
						<FormControl>
							<FormLabel>Rooms</FormLabel>
							<InputGroup>
								<InputLeftAddon children={<FaBed />} />
								<Input
									{...register('rooms', { required: true })}
									type={'number'}
									min={0}
								/>
							</InputGroup>
						</FormControl>
						<FormControl>
							<FormLabel>Toilets</FormLabel>
							<InputGroup>
								<InputLeftAddon children={<FaToilet />} />
								<Input
									{...register('toilets', { required: true })}
									type={'number'}
									min={0}
								/>
							</InputGroup>
						</FormControl>
						<FormControl>
							<FormLabel>Description</FormLabel>
							<Textarea {...register('description', { required: true })} />
						</FormControl>
						<FormControl>
							<Checkbox {...register('pet_friendly', { required: true })}>
								Pet friendly?
							</Checkbox>
						</FormControl>
						<FormControl>
							<FormLabel>Kind of room</FormLabel>
							<Select
								{...register('kind', { required: true })}
								placeholder={'Choose a kind'}
							>
								<option value={'entire_place'}>Entire Place</option>
								<option value={'private_room'}>Private Room</option>
								<option value={'shared_room'}>Shared Room</option>
							</Select>
							<FormHelperText>
								What kind of room are you renting?
							</FormHelperText>
						</FormControl>
						<FormControl>
							<FormLabel>Category</FormLabel>
							<Select
								{...register('category', { required: true })}
								placeholder={'Choose a kind'}
							>
								{categoriesData?.map((category, idx) => (
									<option key={category.pk} value={category.pk}>
										{category.name}
									</option>
								))}
							</Select>
							<FormHelperText>
								What category describes your room?
							</FormHelperText>
						</FormControl>
						<FormControl>
							<FormLabel>Amenities</FormLabel>
							<Grid templateColumns={'1fr 1fr'} gap={5}>
								{amenitiesData?.map((amenity, idx) => (
									<Box key={amenity.pk}>
										<Checkbox value={amenity.pk} {...register('amenities')}>
											{amenity.name}
										</Checkbox>
										<FormHelperText>{amenity.description}</FormHelperText>
									</Box>
								))}
							</Grid>
						</FormControl>
						{mutation.isError ? (
							<Text color={'red.500'}>Something went wrong.</Text>
						) : null}
						<Button
							type={'submit'}
							isLoading={mutation.isPending}
							colorScheme={'red'}
							size={'lg'}
							w={'100%'}
						>
							Hosting Room!
						</Button>
					</VStack>
				</Container>
			</Box>
		</ProtectedPage>
	);
};
