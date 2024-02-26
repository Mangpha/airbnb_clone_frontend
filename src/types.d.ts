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

export interface IAmenity {
	name: string;
	description: string;
}

export interface ICategory {
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
