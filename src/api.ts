import { QueryFunctionContext } from '@tanstack/react-query';
import axios from 'axios';

const instance = axios.create({
	baseURL: 'http://localhost:8000/api/v1/',
});

export const getRooms = () =>
	instance
		.get('rooms/')
		.then((res) => res.data)
		.catch((err) => console.log(err));

export const getRoom = ({ queryKey }: QueryFunctionContext) => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_, roomPk] = queryKey;
	return instance
		.get(`rooms/${roomPk}`)
		.then((res) => res.data)
		.catch((err) => console.log(err));
};
