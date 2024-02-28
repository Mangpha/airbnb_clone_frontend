import { Box, Button, Divider, HStack, Text, VStack } from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';
import { RiKakaoTalkFill } from 'react-icons/ri';

export const SocialLogin = () => {
	const kakaoParams = new URLSearchParams({
		client_id: '3ae32aa685159dd0cceb7bd786d13f10',
		redirect_uri: 'http://localhost:3000/social/kakao',
		response_type: 'code',
	}).toString();
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
				<Button
					as={'a'}
					href={
						'https://github.com/login/oauth/authorize?client_id=eeaab2f46b563afbd1bb&scope=read:user,user:email'
					}
					w={'100%'}
					leftIcon={<FaGithub />}
					colorScheme={'blue'}
				>
					Continue with Github
				</Button>
				<Button
					as={'a'}
					href={`https://kauth.kakao.com/oauth/authorize?${kakaoParams}`}
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
