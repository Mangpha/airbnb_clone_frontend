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

const Room = () => {
	const gray = useColorModeValue('gray.600', 'gray.300');
	return (
		<VStack alignItems={'flex-start'}>
			<Box position={'relative'} overflow={'hidden'} mb={2} rounded={'3xl'}>
				<Image
					minH={280}
					src="https://a0.muscache.com/im/pictures/miso/Hosting-53505989/original/607235e0-45d3-4450-b507-b9b0477d68d9.jpeg?im_w=720"
				/>
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
				<Grid templateColumns={'5fr 1fr'}>
					<Text as={'b'} noOfLines={1} fontSize={'md'}>
						Cheomdangwahak-ro, Jeongeup-si, North Jeolla Province, South Korea
					</Text>
					<HStack spacing={1}>
						<FaStar size={15} />
						<Text>5.0</Text>
					</HStack>
				</Grid>
				<Text fontSize={'sm'} color={gray}>
					Seoul, S. Korea
				</Text>
			</Box>
			<Text fontSize={'sm'} color={gray}>
				<Text as="b">$72</Text> / night
			</Text>
		</VStack>
	);
};

export default Room;
