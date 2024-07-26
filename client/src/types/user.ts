export interface User {
     _id: string;
     firstname: string;
     lastname: string;
     email: string;
     avatar: string;
     isOnline: boolean;
}

export interface ContactItemType {
     _id: string;
     avatar: string;
     firstname: string;
     lastname: string;
     lastMessage?: string;
     isOnline: boolean;
}
