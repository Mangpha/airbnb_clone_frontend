import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getRoom, getRoomReviews } from '../api';
import { IRoomDetail, IRoomReview } from '../types';
import {
	Avatar,
	Box,
	Grid,
	GridItem,
	HStack,
	Heading,
	Image,
	Skeleton,
	Text,
	VStack,
} from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';

export const RoomDetail = () => {
	const { roomPk } = useParams();
	const { isLoading: roomDataLoading, data: roomData } = useQuery<IRoomDetail>({
		queryKey: ['rooms', roomPk],
		queryFn: getRoom,
	});
	const { isLoading: reviewsDataLoading, data: reviewsData } = useQuery<
		IRoomReview[]
	>({
		queryKey: ['rooms', roomPk, 'reviews'],
		queryFn: getRoomReviews,
	});

	return (
		<Box
			mt={10}
			px={{
				base: 10,
				lg: 40,
			}}
		>
			<Skeleton height={'43px'} width={'100%'} isLoaded={!roomDataLoading}>
				<Heading>{roomData?.name}</Heading>
			</Skeleton>
			<Grid
				my={6}
				gap={3}
				height={'60vh'}
				templateRows={'1fr 1fr'}
				templateColumns={'repeat(4, 1fr)'}
			>
				{[0, 1, 2, 3, 4].map((photo, idx) => (
					<GridItem
						rounded={'xl'}
						overflow={'hidden'}
						colSpan={idx === 0 ? 2 : 1}
						rowSpan={idx === 0 ? 2 : 1}
						key={idx}
					>
						{roomData?.photos[idx] ? (
							<Skeleton isLoaded={!roomDataLoading} h={'100%'} w={'100%'}>
								<Image
									w={'100%'}
									h={'100%'}
									objectFit={'cover'}
									src={roomData?.photos[idx]?.file}
								/>
							</Skeleton>
						) : null}
					</GridItem>
				))}
			</Grid>
			<HStack w={'50%'} justifyContent={'space-between'}>
				<VStack alignItems={'flex-start'}>
					<Skeleton isLoaded={!roomDataLoading} h={'30px'}>
						<Heading fontSize={'xl'}>
							House hosted by {roomData?.owner.username}
						</Heading>
					</Skeleton>
					<Skeleton isLoaded={!roomDataLoading}>
						<HStack justifyContent={'flex-start'} w={'100%'}>
							<Text>
								{roomData?.toilets} toilet{roomData?.toilets === 1 ? '' : 's'}
							</Text>
							<Text>•</Text>
							<Text>
								{roomData?.rooms} room{roomData?.rooms === 1 ? '' : 's'}
							</Text>
						</HStack>
					</Skeleton>
				</VStack>
				<Avatar
					name={roomData?.owner.name}
					size={'lg'}
					src={roomData?.owner.avatar}
				/>
			</HStack>
			<Box mt={10}>
				<Skeleton isLoaded={!reviewsDataLoading} w={'15%'}>
					<Heading fontSize={'2xl'}>
						<HStack>
							<FaStar />
							<Text>{roomData?.rating}</Text>
							<Text>•</Text>
							<Text>
								{reviewsData ? reviewsData.length : 0} review
								{reviewsData && reviewsData.length <= 1 ? '' : 's'}
							</Text>
						</HStack>
					</Heading>
				</Skeleton>
			</Box>
		</Box>
	);
};
