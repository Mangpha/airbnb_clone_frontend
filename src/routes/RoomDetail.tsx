import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { checkBooking, getRoom, getRoomReviews } from '../api';
import { IRoomDetail, IRoomReview } from '../types';
import {
	Avatar,
	Box,
	Button,
	Container,
	Grid,
	GridItem,
	HStack,
	Heading,
	Image,
	Skeleton,
	Text,
	VStack,
} from '@chakra-ui/react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FaStar } from 'react-icons/fa';
import { useEffect, useState } from 'react';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

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
	const [dates, setDates] = useState<Value>(new Date());
	const isDatesValid = () => {
		if (dates) {
			const [check_in, check_out] = dates
				.toString()
				.split(',')
				.map((date) => {
					const [check] = new Date(date).toJSON().split('T');
					return check;
				});
			return check_in !== undefined && check_out !== undefined;
		}
		return false;
	};
	const { data: checkBookingDates, isLoading: isCheckBookingDates } = useQuery({
		queryKey: ['check', roomPk, dates],
		queryFn: checkBooking,
		enabled: isDatesValid(),
		gcTime: 0,
	});
	console.log(checkBookingDates?.ok, isCheckBookingDates);

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
								{roomData.photos && roomData.photos.length > 0 ? (
									<Image
										w={'100%'}
										h={'100%'}
										objectFit={'cover'}
										src={roomData?.photos[idx]?.file}
									/>
								) : null}
							</Skeleton>
						) : null}
					</GridItem>
				))}
			</Grid>
			<Grid gap={10} templateColumns={'2fr 1fr'}>
				<Box>
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
										{roomData?.toilets} toilet
										{roomData?.toilets === 1 ? '' : 's'}
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
					<Skeleton isLoaded={!reviewsDataLoading} w={'30%'} mt={10}>
						<Heading mb={8} fontSize={'2xl'}>
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
					<Container my={15} maxW={'container.lg'} marginX={'none'}>
						<Grid gap={10} templateColumns={'1fr 1fr'}>
							{reviewsData?.map((review, idx) => (
								<VStack key={idx} alignItems={'flex-start'}>
									<HStack>
										<Avatar
											name={review.user.name}
											src={review.user.avatar}
											size={'md'}
										/>
										<VStack spacing={0} alignItems={'flex-start'}>
											<Heading fontSize={'md'}>{review.user.name}</Heading>
											<HStack spacing={2}>
												<FaStar size={'12px'} />
												<Text>{review.rating}</Text>
											</HStack>
										</VStack>
									</HStack>
									<Text>{review.payload}</Text>
								</VStack>
							))}
						</Grid>
					</Container>
				</Box>
				<Box>
					<Calendar
						value={dates}
						onChange={setDates}
						minDate={new Date()}
						minDetail={'month'}
						prev2Label={null}
						next2Label={null}
						maxDate={new Date(Date.now() + 60 * 60 * 24 * 7 * 4 * 6 * 1000)}
						selectRange
					/>
					<Button
						isLoading={isCheckBookingDates}
						isDisabled={
							!checkBookingDates?.ok || checkBookingDates !== undefined
						}
						my={5}
						w={'100%'}
						colorScheme={'red'}
					>
						Make Booking
					</Button>
					{!checkBookingDates?.ok ||
					(checkBookingDates !== undefined && !isCheckBookingDates) ? (
						<Text color={'red.500'}>Can't book on those dates</Text>
					) : null}
				</Box>
			</Grid>
		</Box>
	);
};
