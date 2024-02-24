import { Box, Button, Divider, HStack, Text, VStack } from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';
import { RiKakaoTalkFill } from 'react-icons/ri';

const SocialLogin = () => {
	return (
		<Box mb={4}>
			<HStack my={8}>
				<Divider />
				<Text
					textTransform={'uppercase'}
					color={'gray.400'}
					fontSize={'small'}
					as={'b'}
				>
					Or
				</Text>
				<Divider />
			</HStack>
			<VStack>
				<Button w={'100%'} leftIcon={<FaGithub />} colorScheme={'blue'}>
					Continue with Github
				</Button>
				<Button
					w={'100%'}
					leftIcon={<RiKakaoTalkFill />}
					colorScheme={'yellow'}
				>
					Continue with Kakao
				</Button>
			</VStack>
		</Box>
	);
};

export default SocialLogin;