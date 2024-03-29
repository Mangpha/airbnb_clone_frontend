import { QueryFunctionContext } from '@tanstack/react-query';
import Cookie from 'js-cookie';
import axios from 'axios';

const instance = axios.create({
	baseURL:
		process.env.NODE_ENV === 'development'
			? 'http://localhost:8000/api/v1/'
			: 'https://airbnbclone-5rb6.onrender.com/api/v1/',
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

export const githubLogin = async (code: string) =>
	(
		await instance.post(
			'users/github/',
			{ code },
			{
				headers: {
					'X-CSRFToken': Cookie.get('csrftoken') || '',
				},
			}
		)
	).status;

export const kakaoLogin = async (code: string) =>
	(
		await instance.post(
			'users/kakao/',
			{ code },
			{
				headers: {
					'X-CSRFToken': Cookie.get('csrftoken') || '',
				},
			}
		)
	).status;

export interface ICommonLogin {
	username: string;
	password: string;
}

export interface ICommonLoginSuccess {
	ok: string;
}
export interface ICommonLoginFail {
	error: string;
}

export const commonLogin = ({ username, password }: ICommonLogin) =>
	instance
		.post(
			'users/login/',
			{ username, password },
			{
				headers: {
					'X-CSRFToken': Cookie.get('csrftoken') || '',
				},
			}
		)
		.then((res) => res.data);

export const getAmenities = () =>
	instance.get('rooms/amenities/').then((res) => res.data);

export const getCategories = () =>
	instance.get('categories/').then((res) => res.data);

export interface IHostRoomVar {
	name: string;
	country: string;
	city: string;
	price: number;
	rooms: number;
	toilets: number;
	description: string;
	address: string;
	pet_friendly: boolean;
	kind: string;
	amenities: number[];
	category: number;
}

export const hostRoom = (variables: IHostRoomVar) =>
	instance
		.post(`rooms/`, variables, {
			headers: {
				'X-CSRFToken': Cookie.get('csrftoken') || '',
			},
		})
		.then((res) => res.data);

export const getUploadURL = () =>
	instance
		.post(`medias/photos/get-url`, null, {
			headers: {
				'X-CSRFToken': Cookie.get('csrftoken') || '',
			},
		})
		.then((res) => res.data);

export interface IUploadImageVariables {
	file: FileList;
	uploadUrl: string;
}

export const uploadImage = ({ file, uploadUrl }: IUploadImageVariables) => {
	const form = new FormData();
	form.append('file', file[0]);
	return axios
		.post(uploadUrl, form, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
		.then((res) => res.data);
};

export interface ICreatePhotoVariables {
	description: string;
	file: string;
	roomPk: string;
}

export const createPhoto = ({
	description,
	file,
	roomPk,
}: ICreatePhotoVariables) =>
	instance
		.post(
			`rooms/${roomPk}/photos/`,
			{ description, file },
			{
				headers: {
					'X-CSRFToken': Cookie.get('csrftoken') || '',
				},
			}
		)
		.then((res) => res.data);

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export const checkBooking = ({
	queryKey,
}: QueryFunctionContext<[string, string?, Value?]>) => {
	const [_, roomPk, dates] = queryKey;
	if (dates) {
		const [check_in, check_out] = dates
			.toString()
			.split(',')
			.map((date) => {
				const setDate = new Date(date);
				const check = `${setDate.getFullYear()}-${
					setDate.getMonth() + 1
				}-${setDate.getDate()}`;
				return check;
			});
		return instance
			.get(
				`rooms/${roomPk}/bookings/check?check_in=${check_in}&check_out=${check_out}`
			)
			.then((res) => res.data);
	}
};
