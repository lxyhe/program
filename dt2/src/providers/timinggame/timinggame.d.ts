declare module timinggame {
	
	
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
		PublishTimingGameSend: PublishTimingGameSendBuilder;
		GetTimingGameSend: GetTimingGameSendBuilder;
		GetTimingGameListByIDSend: GetTimingGameListByIDSendBuilder;
		IdRetRecv: IdRetRecvBuilder;
		TimingGameRetRecv: TimingGameRetRecvBuilder;
		OperateTimingGameSend: OperateTimingGameSendBuilder;
		FailReason: FailReasonBuilder;
		JoinTimingGameSend: JoinTimingGameSendBuilder;
		GetUserTimingGameListSend: GetUserTimingGameListSendBuilder;
		GetTimingGameListSend: GetTimingGameListSendBuilder;
		GameType: GameType;
		GameCateType: GameCateType;
		GameFarmhouseType: GameFarmhouseType;
		GameEntertainmentType: GameEntertainmentType;
		GameTourType: GameTourType;
		GameOutdoorType: GameOutdoorType;
		TimingState: TimingState;
		
}
}

declare module timinggame {
	
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


declare module timinggame {
	
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


declare module timinggame {
	
	export interface Item {
	
		

ID?: string;
		




Img?: string;
		




Title?: string;
		




Address?: string;
		




Lng?: number;
		




Lat?: number;
		




State?: TimingState;
		




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


declare module timinggame {
	
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


declare module timinggame {
	
	export interface PublishTimingGameSend {
	
		

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
		




Phone?: string;
		




Price?: number;
		




Details?: string[];
		




MainType?: GameType;
		




CateType?: GameCateType;
		




FarmhouseType?: GameFarmhouseType;
		




EntertainmentType?: GameEntertainmentType;
		




TourType?: GameTourType;
		




OutdoorType?: GameOutdoorType;
		




}
	
	export interface PublishTimingGameSendMessage extends PublishTimingGameSend {
	toArrayBuffer(): ArrayBuffer;
	encode(): ByteBuffer;
	encodeJSON(): string;
	toBase64(): string;
	toString(): string;
}

export interface PublishTimingGameSendBuilder {
	new(data?: PublishTimingGameSend): PublishTimingGameSendMessage;
	decode(buffer: ArrayBuffer) : PublishTimingGameSendMessage;
	decode(buffer: ByteBuffer) : PublishTimingGameSendMessage;
	decode64(buffer: string) : PublishTimingGameSendMessage;
	
}
	
}


declare module timinggame {
	
	export interface GetTimingGameSend {
	
		

GWSRPCID?: string;
		




ID?: string;
		




Type?: TimingState;
		




}
	
	export interface GetTimingGameSendMessage extends GetTimingGameSend {
	toArrayBuffer(): ArrayBuffer;
	encode(): ByteBuffer;
	encodeJSON(): string;
	toBase64(): string;
	toString(): string;
}

export interface GetTimingGameSendBuilder {
	new(data?: GetTimingGameSend): GetTimingGameSendMessage;
	decode(buffer: ArrayBuffer) : GetTimingGameSendMessage;
	decode(buffer: ByteBuffer) : GetTimingGameSendMessage;
	decode64(buffer: string) : GetTimingGameSendMessage;
	
}
	
}


declare module timinggame {
	
	export interface GetTimingGameListByIDSend {
	
		

GWSRPCID?: string;
		




ID?: string;
		




Type?: TimingState;
		




}
	
	export interface GetTimingGameListByIDSendMessage extends GetTimingGameListByIDSend {
	toArrayBuffer(): ArrayBuffer;
	encode(): ByteBuffer;
	encodeJSON(): string;
	toBase64(): string;
	toString(): string;
}

export interface GetTimingGameListByIDSendBuilder {
	new(data?: GetTimingGameListByIDSend): GetTimingGameListByIDSendMessage;
	decode(buffer: ArrayBuffer) : GetTimingGameListByIDSendMessage;
	decode(buffer: ByteBuffer) : GetTimingGameListByIDSendMessage;
	decode64(buffer: string) : GetTimingGameListByIDSendMessage;
	
}
	
}


declare module timinggame {
	
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


declare module timinggame {
	
	export interface TimingGameRetRecv {
	
		

UserID?: string;
		




Img?: string;
		




Title?: string;
		




Address?: string;
		




Place?: string;
		




Lng?: number;
		




Lat?: number;
		




Zoom?: number;
		




Pcode?: string;
		




Phone?: string;
		




Price?: number;
		




Details?: string[];
		




JoinID?: string[];
		




}
	
	export interface TimingGameRetRecvMessage extends TimingGameRetRecv {
	toArrayBuffer(): ArrayBuffer;
	encode(): ByteBuffer;
	encodeJSON(): string;
	toBase64(): string;
	toString(): string;
}

export interface TimingGameRetRecvBuilder {
	new(data?: TimingGameRetRecv): TimingGameRetRecvMessage;
	decode(buffer: ArrayBuffer) : TimingGameRetRecvMessage;
	decode(buffer: ByteBuffer) : TimingGameRetRecvMessage;
	decode64(buffer: string) : TimingGameRetRecvMessage;
	
}
	
}


declare module timinggame {
	
	export interface OperateTimingGameSend {
	
		

GWSRPCID?: string;
		




Salt?: string;
		




UserID?: string;
		




PassCode?: string;
		




ContentID?: string;
		




From?: TimingState;
		




To?: TimingState;
		




}
	
	export interface OperateTimingGameSendMessage extends OperateTimingGameSend {
	toArrayBuffer(): ArrayBuffer;
	encode(): ByteBuffer;
	encodeJSON(): string;
	toBase64(): string;
	toString(): string;
}

export interface OperateTimingGameSendBuilder {
	new(data?: OperateTimingGameSend): OperateTimingGameSendMessage;
	decode(buffer: ArrayBuffer) : OperateTimingGameSendMessage;
	decode(buffer: ByteBuffer) : OperateTimingGameSendMessage;
	decode64(buffer: string) : OperateTimingGameSendMessage;
	
}
	
}


declare module timinggame {
	
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


declare module timinggame {
	
	export interface JoinTimingGameSend {
	
		

GWSRPCID?: string;
		




Salt?: string;
		




UserID?: string;
		




PassCode?: string;
		




ContentID?: string;
		




Pcode?: string;
		




}
	
	export interface JoinTimingGameSendMessage extends JoinTimingGameSend {
	toArrayBuffer(): ArrayBuffer;
	encode(): ByteBuffer;
	encodeJSON(): string;
	toBase64(): string;
	toString(): string;
}

export interface JoinTimingGameSendBuilder {
	new(data?: JoinTimingGameSend): JoinTimingGameSendMessage;
	decode(buffer: ArrayBuffer) : JoinTimingGameSendMessage;
	decode(buffer: ByteBuffer) : JoinTimingGameSendMessage;
	decode64(buffer: string) : JoinTimingGameSendMessage;
	
}
	
}


declare module timinggame {
	
	export interface GetUserTimingGameListSend {
	
		

GWSRPCID?: string;
		




UserID?: string;
		




}
	
	export interface GetUserTimingGameListSendMessage extends GetUserTimingGameListSend {
	toArrayBuffer(): ArrayBuffer;
	encode(): ByteBuffer;
	encodeJSON(): string;
	toBase64(): string;
	toString(): string;
}

export interface GetUserTimingGameListSendBuilder {
	new(data?: GetUserTimingGameListSend): GetUserTimingGameListSendMessage;
	decode(buffer: ArrayBuffer) : GetUserTimingGameListSendMessage;
	decode(buffer: ByteBuffer) : GetUserTimingGameListSendMessage;
	decode64(buffer: string) : GetUserTimingGameListSendMessage;
	
}
	
}


declare module timinggame {
	
	export interface GetTimingGameListSend {
	
		

GWSRPCID?: string;
		




State?: TimingState;
		




}
	
	export interface GetTimingGameListSendMessage extends GetTimingGameListSend {
	toArrayBuffer(): ArrayBuffer;
	encode(): ByteBuffer;
	encodeJSON(): string;
	toBase64(): string;
	toString(): string;
}

export interface GetTimingGameListSendBuilder {
	new(data?: GetTimingGameListSend): GetTimingGameListSendMessage;
	decode(buffer: ArrayBuffer) : GetTimingGameListSendMessage;
	decode(buffer: ByteBuffer) : GetTimingGameListSendMessage;
	decode64(buffer: string) : GetTimingGameListSendMessage;
	
}
	
}


declare module timinggame {
	export const enum GameType {
		Other = 0,
		Cate = 1,
		Farmhouse = 2,
		Entertainment = 3,
		Tour = 4,
		Outdoor = 5,
		
}
}

declare module timinggame {
	export const enum GameCateType {
		OtherCate = 0,
		HotPot = 1,
		Buffet = 2,
		Bbq = 3,
		Snack = 4,
		HomeCooking = 5,
		
}
}

declare module timinggame {
	export const enum GameFarmhouseType {
		OtherFarmhouse = 0,
		PickingGarden = 1,
		FarmTown = 2,
		Village = 3,
		BungeeJumping = 4,
		WaterPark = 5,
		
}
}

declare module timinggame {
	export const enum GameEntertainmentType {
		OtherEntertainment = 0,
		TableTopGame = 1,
		Bar = 2,
		Disco = 3,
		Indoor = 4,
		Ktv = 5,
		
}
}

declare module timinggame {
	export const enum GameTourType {
		OtherTour = 0,
		Oneday = 1,
		Vacational = 2,
		TravelAround = 3,
		Park = 4,
		ScenicSpots = 5,
		
}
}

declare module timinggame {
	export const enum GameOutdoorType {
		OtherOutdoor = 0,
		DiyTour = 1,
		DrivingTour = 2,
		Camping = 3,
		Ski = 4,
		Camp = 5,
		
}
}

declare module timinggame {
	export const enum TimingState {
		REVIEWT = 0,
		DENYT = 1,
		OPEN = 2,
		CLOSE = 3,
		FINISHT = 4,
		
}
}


