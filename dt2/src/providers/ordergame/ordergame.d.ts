declare module ordergame {
	
	
	interface ProtoBufMapItem<KeyType, ValueType> {
		key : KeyType,
		value : ValueType
	}
	
	interface ProtoBufMap<KeyType, ValueType> {
		clear(): void;
		delete(key: KeyType): void;
		get(key: KeyType): ValueType;
		has(key: KeyType): boolean;
		set(key: KeyType, value: ValueType): void;
		forEach(fn: (value: ValueType, key?: KeyType) => void): void;
		size: number;
		map : { [key: string]: ProtoBufMapItem<KeyType, ValueType> }
	}
	
	export interface ProtoBufBuilder {
		VoidSend: VoidSendBuilder;
		SaltRetRecv: SaltRetRecvBuilder;
		Item: ItemBuilder;
		ListRetRecv: ListRetRecvBuilder;
		PublishOrderGameSend: PublishOrderGameSendBuilder;
		GetOrderGameSend: GetOrderGameSendBuilder;
		GetOrderGameListByIDSend: GetOrderGameListByIDSendBuilder;
		IdRetRecv: IdRetRecvBuilder;
		OrderGameRetRecv: OrderGameRetRecvBuilder;
		OperateOrderGameSend: OperateOrderGameSendBuilder;
		FailReason: FailReasonBuilder;
		JoinOrderGameSend: JoinOrderGameSendBuilder;
		GetUserOrderGameListSend: GetUserOrderGameListSendBuilder;
		GetOrderGameListSend: GetOrderGameListSendBuilder;
		GameType: GameType;
		GameCateType: GameCateType;
		GameFarmhouseType: GameFarmhouseType;
		GameEntertainmentType: GameEntertainmentType;
		GameTourType: GameTourType;
		GameOutdoorType: GameOutdoorType;
		OrderState: OrderState;
		
}
}

declare module ordergame {
	
	export interface VoidSend {
	
		

GWSRPCID?: string;
		




}
	
	export interface VoidSendMessage extends VoidSend {
	toArrayBuffer(): ArrayBuffer;
	encode(): ByteBuffer;
	encodeJSON(): string;
	toBase64(): string;
	toString(): string;
}

export interface VoidSendBuilder {
	new(data?: VoidSend): VoidSendMessage;
	decode(buffer: ArrayBuffer) : VoidSendMessage;
	decode(buffer: ByteBuffer) : VoidSendMessage;
	decode64(buffer: string) : VoidSendMessage;
	
}
	
}


declare module ordergame {
	
	export interface SaltRetRecv {
	
		

Salt?: string;
		




}
	
	export interface SaltRetRecvMessage extends SaltRetRecv {
	toArrayBuffer(): ArrayBuffer;
	encode(): ByteBuffer;
	encodeJSON(): string;
	toBase64(): string;
	toString(): string;
}

export interface SaltRetRecvBuilder {
	new(data?: SaltRetRecv): SaltRetRecvMessage;
	decode(buffer: ArrayBuffer) : SaltRetRecvMessage;
	decode(buffer: ByteBuffer) : SaltRetRecvMessage;
	decode64(buffer: string) : SaltRetRecvMessage;
	
}
	
}


declare module ordergame {
	
	export interface Item {
	
		

ID?: string;
		




Img?: string;
		




Title?: string;
		




Address?: string;
		




Lng?: number;
		




Lat?: number;
		




State?: OrderState;
		




Price?: number;
		




Time?: number;
		




MainType?: GameType;
		




CateType?: GameCateType;
		




FarmhouseType?: GameFarmhouseType;
		




EntertainmentType?: GameEntertainmentType;
		




TourType?: GameTourType;
		




OutdoorType?: GameOutdoorType;
		




}
	
	export interface ItemMessage extends Item {
	toArrayBuffer(): ArrayBuffer;
	encode(): ByteBuffer;
	encodeJSON(): string;
	toBase64(): string;
	toString(): string;
}

export interface ItemBuilder {
	new(data?: Item): ItemMessage;
	decode(buffer: ArrayBuffer) : ItemMessage;
	decode(buffer: ByteBuffer) : ItemMessage;
	decode64(buffer: string) : ItemMessage;
	
}
	
}


declare module ordergame {
	
	export interface ListRetRecv {
	
		

Items?: Item[];
		




}
	
	export interface ListRetRecvMessage extends ListRetRecv {
	toArrayBuffer(): ArrayBuffer;
	encode(): ByteBuffer;
	encodeJSON(): string;
	toBase64(): string;
	toString(): string;
}

export interface ListRetRecvBuilder {
	new(data?: ListRetRecv): ListRetRecvMessage;
	decode(buffer: ArrayBuffer) : ListRetRecvMessage;
	decode(buffer: ByteBuffer) : ListRetRecvMessage;
	decode64(buffer: string) : ListRetRecvMessage;
	
}
	
}


declare module ordergame {
	
	export interface PublishOrderGameSend {
	
		

GWSRPCID?: string;
		




Salt?: string;
		




UserID?: string;
		




PassCode?: string;
		




Img?: string;
		




Title?: string;
		




Address?: string;
		




Place?: string;
		




Lng?: number;
		




Lat?: number;
		




Zoom?: number;
		




Pcode?: string;
		




Starttime?: number;
		




Endtime?: number;
		




Phone?: string;
		




Maxnum?: number;
		




Minnum?: number;
		




Price?: number;
		




Details?: string[];
		




MainType?: GameType;
		




CateType?: GameCateType;
		




FarmhouseType?: GameFarmhouseType;
		




EntertainmentType?: GameEntertainmentType;
		




TourType?: GameTourType;
		




OutdoorType?: GameOutdoorType;
		




}
	
	export interface PublishOrderGameSendMessage extends PublishOrderGameSend {
	toArrayBuffer(): ArrayBuffer;
	encode(): ByteBuffer;
	encodeJSON(): string;
	toBase64(): string;
	toString(): string;
}

export interface PublishOrderGameSendBuilder {
	new(data?: PublishOrderGameSend): PublishOrderGameSendMessage;
	decode(buffer: ArrayBuffer) : PublishOrderGameSendMessage;
	decode(buffer: ByteBuffer) : PublishOrderGameSendMessage;
	decode64(buffer: string) : PublishOrderGameSendMessage;
	
}
	
}


declare module ordergame {
	
	export interface GetOrderGameSend {
	
		

GWSRPCID?: string;
		




ID?: string;
		




Type?: OrderState;
		




}
	
	export interface GetOrderGameSendMessage extends GetOrderGameSend {
	toArrayBuffer(): ArrayBuffer;
	encode(): ByteBuffer;
	encodeJSON(): string;
	toBase64(): string;
	toString(): string;
}

export interface GetOrderGameSendBuilder {
	new(data?: GetOrderGameSend): GetOrderGameSendMessage;
	decode(buffer: ArrayBuffer) : GetOrderGameSendMessage;
	decode(buffer: ByteBuffer) : GetOrderGameSendMessage;
	decode64(buffer: string) : GetOrderGameSendMessage;
	
}
	
}


declare module ordergame {
	
	export interface GetOrderGameListByIDSend {
	
		

GWSRPCID?: string;
		




ID?: string;
		




Type?: OrderState;
		




}
	
	export interface GetOrderGameListByIDSendMessage extends GetOrderGameListByIDSend {
	toArrayBuffer(): ArrayBuffer;
	encode(): ByteBuffer;
	encodeJSON(): string;
	toBase64(): string;
	toString(): string;
}

export interface GetOrderGameListByIDSendBuilder {
	new(data?: GetOrderGameListByIDSend): GetOrderGameListByIDSendMessage;
	decode(buffer: ArrayBuffer) : GetOrderGameListByIDSendMessage;
	decode(buffer: ByteBuffer) : GetOrderGameListByIDSendMessage;
	decode64(buffer: string) : GetOrderGameListByIDSendMessage;
	
}
	
}


declare module ordergame {
	
	export interface IdRetRecv {
	
		

ID?: string;
		




}
	
	export interface IdRetRecvMessage extends IdRetRecv {
	toArrayBuffer(): ArrayBuffer;
	encode(): ByteBuffer;
	encodeJSON(): string;
	toBase64(): string;
	toString(): string;
}

export interface IdRetRecvBuilder {
	new(data?: IdRetRecv): IdRetRecvMessage;
	decode(buffer: ArrayBuffer) : IdRetRecvMessage;
	decode(buffer: ByteBuffer) : IdRetRecvMessage;
	decode64(buffer: string) : IdRetRecvMessage;
	
}
	
}


declare module ordergame {
	
	export interface OrderGameRetRecv {
	
		

UserID?: string;
		




Img?: string;
		




Title?: string;
		




Address?: string;
		




Place?: string;
		




Lng?: number;
		




Lat?: number;
		




Zoom?: number;
		




Pcode?: string;
		




Starttime?: number;
		




Endtime?: number;
		




Phone?: string;
		




Maxnum?: number;
		




Minnum?: number;
		




Nownum?: number;
		




Price?: number;
		




Details?: string[];
		




JoinID?: string[];
		




}
	
	export interface OrderGameRetRecvMessage extends OrderGameRetRecv {
	toArrayBuffer(): ArrayBuffer;
	encode(): ByteBuffer;
	encodeJSON(): string;
	toBase64(): string;
	toString(): string;
}

export interface OrderGameRetRecvBuilder {
	new(data?: OrderGameRetRecv): OrderGameRetRecvMessage;
	decode(buffer: ArrayBuffer) : OrderGameRetRecvMessage;
	decode(buffer: ByteBuffer) : OrderGameRetRecvMessage;
	decode64(buffer: string) : OrderGameRetRecvMessage;
	
}
	
}


declare module ordergame {
	
	export interface OperateOrderGameSend {
	
		

GWSRPCID?: string;
		




Salt?: string;
		




UserID?: string;
		




PassCode?: string;
		




ContentID?: string;
		




From?: OrderState;
		




To?: OrderState;
		




}
	
	export interface OperateOrderGameSendMessage extends OperateOrderGameSend {
	toArrayBuffer(): ArrayBuffer;
	encode(): ByteBuffer;
	encodeJSON(): string;
	toBase64(): string;
	toString(): string;
}

export interface OperateOrderGameSendBuilder {
	new(data?: OperateOrderGameSend): OperateOrderGameSendMessage;
	decode(buffer: ArrayBuffer) : OperateOrderGameSendMessage;
	decode(buffer: ByteBuffer) : OperateOrderGameSendMessage;
	decode64(buffer: string) : OperateOrderGameSendMessage;
	
}
	
}


declare module ordergame {
	
	export interface FailReason {
	
		

Reason?: string;
		




}
	
	export interface FailReasonMessage extends FailReason {
	toArrayBuffer(): ArrayBuffer;
	encode(): ByteBuffer;
	encodeJSON(): string;
	toBase64(): string;
	toString(): string;
}

export interface FailReasonBuilder {
	new(data?: FailReason): FailReasonMessage;
	decode(buffer: ArrayBuffer) : FailReasonMessage;
	decode(buffer: ByteBuffer) : FailReasonMessage;
	decode64(buffer: string) : FailReasonMessage;
	
}
	
}


declare module ordergame {
	
	export interface JoinOrderGameSend {
	
		

GWSRPCID?: string;
		




Salt?: string;
		




UserID?: string;
		




PassCode?: string;
		




ContentID?: string;
		




Pcode?: string;
		




}
	
	export interface JoinOrderGameSendMessage extends JoinOrderGameSend {
	toArrayBuffer(): ArrayBuffer;
	encode(): ByteBuffer;
	encodeJSON(): string;
	toBase64(): string;
	toString(): string;
}

export interface JoinOrderGameSendBuilder {
	new(data?: JoinOrderGameSend): JoinOrderGameSendMessage;
	decode(buffer: ArrayBuffer) : JoinOrderGameSendMessage;
	decode(buffer: ByteBuffer) : JoinOrderGameSendMessage;
	decode64(buffer: string) : JoinOrderGameSendMessage;
	
}
	
}


declare module ordergame {
	
	export interface GetUserOrderGameListSend {
	
		

GWSRPCID?: string;
		




UserID?: string;
		




}
	
	export interface GetUserOrderGameListSendMessage extends GetUserOrderGameListSend {
	toArrayBuffer(): ArrayBuffer;
	encode(): ByteBuffer;
	encodeJSON(): string;
	toBase64(): string;
	toString(): string;
}

export interface GetUserOrderGameListSendBuilder {
	new(data?: GetUserOrderGameListSend): GetUserOrderGameListSendMessage;
	decode(buffer: ArrayBuffer) : GetUserOrderGameListSendMessage;
	decode(buffer: ByteBuffer) : GetUserOrderGameListSendMessage;
	decode64(buffer: string) : GetUserOrderGameListSendMessage;
	
}
	
}


declare module ordergame {
	
	export interface GetOrderGameListSend {
	
		

GWSRPCID?: string;
		




State?: OrderState;
		




}
	
	export interface GetOrderGameListSendMessage extends GetOrderGameListSend {
	toArrayBuffer(): ArrayBuffer;
	encode(): ByteBuffer;
	encodeJSON(): string;
	toBase64(): string;
	toString(): string;
}

export interface GetOrderGameListSendBuilder {
	new(data?: GetOrderGameListSend): GetOrderGameListSendMessage;
	decode(buffer: ArrayBuffer) : GetOrderGameListSendMessage;
	decode(buffer: ByteBuffer) : GetOrderGameListSendMessage;
	decode64(buffer: string) : GetOrderGameListSendMessage;
	
}
	
}


declare module ordergame {
	export const enum GameType {
		Other = 0,
		Cate = 1,
		Farmhouse = 2,
		Entertainment = 3,
		Tour = 4,
		Outdoor = 5,
		
}
}

declare module ordergame {
	export const enum GameCateType {
		OtherCate = 0,
		HotPot = 1,
		Buffet = 2,
		Bbq = 3,
		Snack = 4,
		HomeCooking = 5,
		
}
}

declare module ordergame {
	export const enum GameFarmhouseType {
		OtherFarmhouse = 0,
		PickingGarden = 1,
		FarmTown = 2,
		Village = 3,
		BungeeJumping = 4,
		WaterPark = 5,
		
}
}

declare module ordergame {
	export const enum GameEntertainmentType {
		OtherEntertainment = 0,
		TableTopGame = 1,
		Bar = 2,
		Disco = 3,
		Indoor = 4,
		Ktv = 5,
		
}
}

declare module ordergame {
	export const enum GameTourType {
		OtherTour = 0,
		Oneday = 1,
		Vacational = 2,
		TravelAround = 3,
		Park = 4,
		ScenicSpots = 5,
		
}
}

declare module ordergame {
	export const enum GameOutdoorType {
		OtherOutdoor = 0,
		DiyTour = 1,
		DrivingTour = 2,
		Camping = 3,
		Ski = 4,
		Camp = 5,
		
}
}

declare module ordergame {
	export const enum OrderState {
		REVIEW = 0,
		DENY = 1,
		READY = 2,
		START = 3,
		CANCEL = 4,
		FINISH = 5,
		
}
}


