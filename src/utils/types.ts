export type PropType<TObj, TProp extends keyof TObj> = TObj[TProp];

export interface RoomProperty {
	idRoom: number;
	roomName: string;
	roomType: string;
	roomSize: number;
	capacity: number;
	availability: string;
	price: number;
	description: string;
}

export interface BookingData {
	idRoom: PropType<RoomProperty, 'idRoom'>;
	bookerName: string;
	reservedTime: Date;
}
