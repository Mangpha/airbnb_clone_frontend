import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getRoom } from '../api';
import { IRoomDetail } from '../types';
import {
	Box,
	Grid,
	GridItem,
	Heading,
	Image,
	Skeleton,
} from '@chakra-ui/react';

export const RoomDetail = () => {
	const { roomPk } = useParams();
	const { isLoading, data } = useQuery<IRoomDetail>({
		queryKey: ['rooms', roomPk],
		queryFn: getRoom,
	});

	return (
		<Box
			mt={10}
			px={{
				base: 10,
				lg: 40,
			}}
		>
			<Skeleton height={'43px'} width={'100%'} isLoaded={!isLoading}>
				<Heading>{data?.name}</Heading>
			</Skeleton>
			<Grid
				mt={6}
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
						{data?.photos[idx] ? (
							<Skeleton isLoaded={!isLoading} h={'100%'} w={'100%'}>
								<Image
									w={'100%'}
									h={'100%'}
									objectFit={'cover'}
									src={data?.photos[idx]?.file}
								/>
							</Skeleton>
						) : null}
					</GridItem>
				))}
			</Grid>
		</Box>
	);
};
