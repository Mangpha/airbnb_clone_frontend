import {
	Box,
	Button,
	Container,
	FormControl,
	Heading,
	Input,
	VStack,
	useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useHostOnlyPage } from '../components/HostOnlyPage';
import { ProtectedPage } from '../components/ProtectedPage';
import { useMutation } from '@tanstack/react-query';
import { createPhoto, getUploadURL, uploadImage } from '../api';

interface IFileUploadForm {
	file: FileList;
}

export const UploadPhotos = () => {
	const { register, handleSubmit, watch, reset } = useForm<IFileUploadForm>();
	const { roomPk } = useParams();
	const toast = useToast();
	const createPhotoMutation = useMutation({
		mutationFn: createPhoto,
		onSuccess: () => {
			toast({
				status: 'success',
				title: 'Image uploaded',
			});
			reset();
		},
	});
	const uploadImageMutation = useMutation({
		mutationFn: uploadImage,
		onSuccess: ({ result }: any) => {
			if (roomPk)
				createPhotoMutation.mutate({
					description: 'js',
					file: `https://imagedelivery.net/EpkSpMvAX5De7Zp3B5Tg_A/${result.id}/public`,
					roomPk,
				});
		},
		onError: (error) => {
			console.log(error);
		},
	});
	const uploadUrlMutation = useMutation({
		mutationFn: getUploadURL,
		onSuccess: (data: any) => {
			uploadImageMutation.mutate({
				uploadUrl: data.result.uploadURL,
				file: watch('file'),
			});
		},
	});

	const onSubmit = (data: any) => {
		uploadUrlMutation.mutate();
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
						<Button
							isLoading={
								createPhotoMutation.isPending ||
								uploadImageMutation.isPending ||
								uploadUrlMutation.isPending
							}
							w="full"
							type={'submit'}
							colorScheme={'red'}
						>
							Upload photos
						</Button>
					</VStack>
				</Container>
			</Box>
		</ProtectedPage>
	);
};
