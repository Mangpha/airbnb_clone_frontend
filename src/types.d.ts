export interface IRoomPhoto {
	pk: number;
	file: string;
}

export interface IRoomList {
	pk: number;
	name: string;
	country: string;
	city: string;
	price: number;
	rating: number;
	is_owner: boolean;
	photos: IRoomPhoto[];
}

export interface IRoomOwner {
	name: string;
	avatar: string;
	username: string;
}

export interface IRoomReview {
	user: IRoomOwner;
	payload: string;
	rating: number;
}

export interface IAmenity {
	pk: number;
	name: string;
	description: string;
}

export interface ICategory {
	pk: number;
	name: string;
	kind: string;
}

export interface IRoomDetail extends IRoomList {
	created_at: string;
	updated_at: string;
	rooms: number;
	toilets: number;
	description: string;
	address: string;
	pet_friendly: boolean;
	kind: string;
	is_owner: boolean;
	is_liked: boolean;
	category: ICategory;
	owner: IRoomOwner;
	amenities: IAmenity[];
}

export interface IUser {
	last_login: string;
	username: string;
	email: string;
	date_joined: string;
	avatar: string;
	name: string;
	is_host: boolean;
	gender: string;
	language: string;
	currency: string;
}
