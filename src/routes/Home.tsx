import {
	Box,
	Grid,
	HStack,
	Heading,
	Image,
	Text,
	VStack,
} from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';

const Home = () => {
	return (
		<Grid
			mt={10}
			px={40}
			columnGap={4}
			rowGap={8}
			templateColumns={'repeat(5, 1fr)'}
		>
			<VStack alignItems={'flex-start'}>
				<Box overflow={'hidden'} mb={2} rounded={'3xl'}>
					<Image
						h={240}
						src="https://a0.muscache.com/im/pictures/miso/Hosting-53505989/original/607235e0-45d3-4450-b507-b9b0477d68d9.jpeg?im_w=720"
					/>
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
					<Text fontSize={'sm'} color={'gray.600'}>
						Seoul, S. Korea
					</Text>
				</Box>
				<Text fontSize={'sm'} color={'gray.600'}>
					<Text as="b">$72</Text> / night
				</Text>
			</VStack>
		</Grid>
	);
};

export default Home;
