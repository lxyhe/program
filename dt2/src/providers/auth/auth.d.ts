declare module auth {
	
	
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
		SessionLoginSend: SessionLoginSendBuilder;
		LoginRetRecv: LoginRetRecvBuilder;
		WechatAuthSend: WechatAuthSendBuilder;
		RegAuthSend: RegAuthSendBuilder;
		LoginAuthSend: LoginAuthSendBuilder;
		AuthRetRecv: AuthRetRecvBuilder;
		GetPassCodeSend: GetPassCodeSendBuilder;
		PassCodeRetRecv: PassCodeRetRecvBuilder;
		Item: ItemBuilder;
		ListRetRecv: ListRetRecvBuilder;
		GetUserInfoSend: GetUserInfoSendBuilder;
		SetPublisherSend: SetPublisherSendBuilder;
		SetPublisherRecv: SetPublisherRecvBuilder;
		Groups: Groups;
		UserSex: UserSex;
		
}
}

declare module auth {
	
	export interface SessionLoginSend {
	
		

GWSRPCID?: string;
		




SessionID?: string;
		




}
	
	export interface SessionLoginSendMessage extends SessionLoginSend {
	toArrayBuffer(): ArrayBuffer;
	encode(): ByteBuffer;
	encodeJSON(): string;
	toBase64(): string;
	toString(): string;
}

export interface SessionLoginSendBuilder {
	new(data?: SessionLoginSend): SessionLoginSendMessage;
	decode(buffer: ArrayBuffer) : SessionLoginSendMessage;
	decode(buffer: ByteBuffer) : SessionLoginSendMessage;
	decode64(buffer: string) : SessionLoginSendMessage;
	
}
	
}


declare module auth {
	
	export interface LoginRetRecv {
	
		

SessionID?: string;
		




Group?: Groups;
		




Nickname?: string;
		




Sex?: UserSex;
		




Country?: string;
		




Province?: string;
		




City?: string;
		




Headimgurl?: string;
		




}
	
	export interface LoginRetRecvMessage extends LoginRetRecv {
	toArrayBuffer(): ArrayBuffer;
	encode(): ByteBuffer;
	encodeJSON(): string;
	toBase64(): string;
	toString(): string;
}

export interface LoginRetRecvBuilder {
	new(data?: LoginRetRecv): LoginRetRecvMessage;
	decode(buffer: ArrayBuffer) : LoginRetRecvMessage;
	decode(buffer: ByteBuffer) : LoginRetRecvMessage;
	decode64(buffer: string) : LoginRetRecvMessage;
	
}
	
}


declare module auth {
	
	export interface WechatAuthSend {
	
		

GWSRPCID?: string;
		




Code?: string;
		




}
	
	export interface WechatAuthSendMessage extends WechatAuthSend {
	toArrayBuffer(): ArrayBuffer;
	encode(): ByteBuffer;
	encodeJSON(): string;
	toBase64(): string;
	toString(): string;
}

export interface WechatAuthSendBuilder {
	new(data?: WechatAuthSend): WechatAuthSendMessage;
	decode(buffer: ArrayBuffer) : WechatAuthSendMessage;
	decode(buffer: ByteBuffer) : WechatAuthSendMessage;
	decode64(buffer: string) : WechatAuthSendMessage;
	
}
	
}


declare module auth {
	
	export interface RegAuthSend {
	
		

GWSRPCID?: string;
		




Username?: string;
		




Password?: string;
		




Nickname?: string;
		




Sex?: UserSex;
		




Country?: string;
		




Province?: string;
		




City?: string;
		




}
	
	export interface RegAuthSendMessage extends RegAuthSend {
	toArrayBuffer(): ArrayBuffer;
	encode(): ByteBuffer;
	encodeJSON(): string;
	toBase64(): string;
	toString(): string;
}

export interface RegAuthSendBuilder {
	new(data?: RegAuthSend): RegAuthSendMessage;
	decode(buffer: ArrayBuffer) : RegAuthSendMessage;
	decode(buffer: ByteBuffer) : RegAuthSendMessage;
	decode64(buffer: string) : RegAuthSendMessage;
	
}
	
}


declare module auth {
	
	export interface LoginAuthSend {
	
		

GWSRPCID?: string;
		




Username?: string;
		




Password?: string;
		




}
	
	export interface LoginAuthSendMessage extends LoginAuthSend {
	toArrayBuffer(): ArrayBuffer;
	encode(): ByteBuffer;
	encodeJSON(): string;
	toBase64(): string;
	toString(): string;
}

export interface LoginAuthSendBuilder {
	new(data?: LoginAuthSend): LoginAuthSendMessage;
	decode(buffer: ArrayBuffer) : LoginAuthSendMessage;
	decode(buffer: ByteBuffer) : LoginAuthSendMessage;
	decode64(buffer: string) : LoginAuthSendMessage;
	
}
	
}


declare module auth {
	
	export interface AuthRetRecv {
	
		

UserID?: string;
		




SessionID?: string;
		




Group?: Groups;
		




Nickname?: string;
		




Sex?: UserSex;
		




Country?: string;
		




Province?: string;
		




City?: string;
		




Headimgurl?: string;
		




}
	
	export interface AuthRetRecvMessage extends AuthRetRecv {
	toArrayBuffer(): ArrayBuffer;
	encode(): ByteBuffer;
	encodeJSON(): string;
	toBase64(): string;
	toString(): string;
}

export interface AuthRetRecvBuilder {
	new(data?: AuthRetRecv): AuthRetRecvMessage;
	decode(buffer: ArrayBuffer) : AuthRetRecvMessage;
	decode(buffer: ByteBuffer) : AuthRetRecvMessage;
	decode64(buffer: string) : AuthRetRecvMessage;
	
}
	
}


declare module auth {
	
	export interface GetPassCodeSend {
	
		

GWSRPCID?: string;
		




SessionID?: string;
		




Salt?: string;
		




}
	
	export interface GetPassCodeSendMessage extends GetPassCodeSend {
	toArrayBuffer(): ArrayBuffer;
	encode(): ByteBuffer;
	encodeJSON(): string;
	toBase64(): string;
	toString(): string;
}

export interface GetPassCodeSendBuilder {
	new(data?: GetPassCodeSend): GetPassCodeSendMessage;
	decode(buffer: ArrayBuffer) : GetPassCodeSendMessage;
	decode(buffer: ByteBuffer) : GetPassCodeSendMessage;
	decode64(buffer: string) : GetPassCodeSendMessage;
	
}
	
}


declare module auth {
	
	export interface PassCodeRetRecv {
	
		

PassCode?: string;
		




}
	
	export interface PassCodeRetRecvMessage extends PassCodeRetRecv {
	toArrayBuffer(): ArrayBuffer;
	encode(): ByteBuffer;
	encodeJSON(): string;
	toBase64(): string;
	toString(): string;
}

export interface PassCodeRetRecvBuilder {
	new(data?: PassCodeRetRecv): PassCodeRetRecvMessage;
	decode(buffer: ArrayBuffer) : PassCodeRetRecvMessage;
	decode(buffer: ByteBuffer) : PassCodeRetRecvMessage;
	decode64(buffer: string) : PassCodeRetRecvMessage;
	
}
	
}


declare module auth {
	
	export interface Item {
	
		

ID?: string;
		




Nickname?: string;
		




Sex?: UserSex;
		




Country?: string;
		




Province?: string;
		




City?: string;
		




Headimgurl?: string;
		




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


declare module auth {
	
	export interface ListRetRecv {
	
		

FailReason?: string;
		




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


declare module auth {
	
	export interface GetUserInfoSend {
	
		

GWSRPCID?: string;
		




UserIDs?: string[];
		




}
	
	export interface GetUserInfoSendMessage extends GetUserInfoSend {
	toArrayBuffer(): ArrayBuffer;
	encode(): ByteBuffer;
	encodeJSON(): string;
	toBase64(): string;
	toString(): string;
}

export interface GetUserInfoSendBuilder {
	new(data?: GetUserInfoSend): GetUserInfoSendMessage;
	decode(buffer: ArrayBuffer) : GetUserInfoSendMessage;
	decode(buffer: ByteBuffer) : GetUserInfoSendMessage;
	decode64(buffer: string) : GetUserInfoSendMessage;
	
}
	
}


declare module auth {
	
	export interface SetPublisherSend {
	
		

GWSRPCID?: string;
		




SessionID?: string;
		




UserID?: string;
		




}
	
	export interface SetPublisherSendMessage extends SetPublisherSend {
	toArrayBuffer(): ArrayBuffer;
	encode(): ByteBuffer;
	encodeJSON(): string;
	toBase64(): string;
	toString(): string;
}

export interface SetPublisherSendBuilder {
	new(data?: SetPublisherSend): SetPublisherSendMessage;
	decode(buffer: ArrayBuffer) : SetPublisherSendMessage;
	decode(buffer: ByteBuffer) : SetPublisherSendMessage;
	decode64(buffer: string) : SetPublisherSendMessage;
	
}
	
}


declare module auth {
	
	export interface SetPublisherRecv {
	
		

FailReason?: string;
		




}
	
	export interface SetPublisherRecvMessage extends SetPublisherRecv {
	toArrayBuffer(): ArrayBuffer;
	encode(): ByteBuffer;
	encodeJSON(): string;
	toBase64(): string;
	toString(): string;
}

export interface SetPublisherRecvBuilder {
	new(data?: SetPublisherRecv): SetPublisherRecvMessage;
	decode(buffer: ArrayBuffer) : SetPublisherRecvMessage;
	decode(buffer: ByteBuffer) : SetPublisherRecvMessage;
	decode64(buffer: string) : SetPublisherRecvMessage;
	
}
	
}


declare module auth {
	export const enum Groups {
		NoneGroup = 0,
		AdminGroup = 1,
		PublisherGroup = 2,
		
}
}

declare module auth {
	export const enum UserSex {
		Unknow = 0,
		Man = 1,
		Woman = 2,
		
}
}


