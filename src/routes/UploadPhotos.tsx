import {
	Box,
	Button,
	Container,
	FormControl,
	Heading,
	Input,
	VStack,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useHostOnlyPage } from '../components/HostOnlyPage';
import { ProtectedPage } from '../components/ProtectedPage';
import { useMutation } from '@tanstack/react-query';
import { getUploadURL } from '../api';

interface IFileUploadForm {
	file: FileList;
}

export const UploadPhotos = () => {
	const { register, handleSubmit } = useForm<IFileUploadForm>();
	const { roomPk } = useParams();
	const mutation = useMutation({
		mutationFn: getUploadURL,
		onSuccess: (data: any) => {
			console.log(data);
		},
	});

	const onSubmit = (data: any) => {
		mutation.mutate();
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
					<Heading textAlign={'center'}>Upload a Photo</Heading>
					<VStack
						as={'form'}
						onSubmit={handleSubmit(onSubmit)}
						spacing={5}
						mt={10}
					>
						<FormControl>
							<Input {...register('file')} type="file" accept="image/*" />
						</FormControl>
						<Button w="full" type={'submit'} colorScheme={'red'}>
							Upload photos
						</Button>
					</VStack>
				</Container>
			</Box>
		</ProtectedPage>
	);
};
