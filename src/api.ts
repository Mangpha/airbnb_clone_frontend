import { QueryFunctionContext } from '@tanstack/react-query';
import Cookie from 'js-cookie';
import axios from 'axios';

const instance = axios.create({
	baseURL: 'http://localhost:8000/api/v1/',
	withCredentials: true,
});

export const getRooms = async () => {
	try {
		const res = await instance.get('rooms/');
		return res.data;
	} catch (err) {
		return console.log(err);
	}
};

export const getRoom = async ({ queryKey }: QueryFunctionContext) => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_, roomPk] = queryKey;
	try {
		const res = await instance.get(`rooms/${roomPk}/`);
		return res.data;
	} catch (err) {
		console.error(err);
	}
};

export const getRoomReviews = async ({ queryKey }: QueryFunctionContext) => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_, roomPk] = queryKey;
	try {
		const res = await instance.get(`rooms/${roomPk}/reviews/`);
		return res.data;
	} catch (err) {
		console.error(err);
	}
};

export const getMe = async () => (await instance.get('users/me/')).data;

export const logOut = async () =>
	(
		await instance.post('users/logout/', null, {
			headers: {
				'X-CSRFToken': Cookie.get('csrftoken') || '',
			},
		})
	).data;
