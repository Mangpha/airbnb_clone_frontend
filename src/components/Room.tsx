import {
	Box,
	Button,
	Grid,
	HStack,
	Image,
	Text,
	VStack,
	useColorModeValue,
} from '@chakra-ui/react';
import { FaRegHeart, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface IRoomComponentProps {
	pk: number;
	imgUrl: string;
	name: string;
	rating: number;
	city: string;
	country: string;
	price: number;
}

export const Room = ({
	pk,
	imgUrl,
	name,
	rating,
	city,
	country,
	price,
}: IRoomComponentProps) => {
	const gray = useColorModeValue('gray.600', 'gray.300');
	return (
		<Link to={`/rooms/${pk}`}>
			<VStack alignItems={'flex-start'}>
				<Box position={'relative'} overflow={'hidden'} mb={2} rounded={'3xl'}>
					<Image minH={280} src={imgUrl} />
					<Button
						variant={'unstyled'}
						position={'absolute'}
						top={3}
						right={0}
						color={'white'}
					>
						<FaRegHeart size={25} />
					</Button>
				</Box>
				<Box>
					<Grid templateColumns={'9fr 1fr'}>
						<Text as={'b'} noOfLines={1} fontSize={'md'}>
							{name}
						</Text>
						<HStack spacing={1}>
							<FaStar size={15} />
							<Text>{rating}</Text>
						</HStack>
					</Grid>
					<Text fontSize={'sm'} color={gray}>
						{city}, {country}
					</Text>
				</Box>
				<Text fontSize={'sm'} color={gray}>
					<Text as="b">${price}</Text> / night
				</Text>
			</VStack>
		</Link>
	);
};
