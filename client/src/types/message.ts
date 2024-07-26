import { User } from "~/types/user";

export interface Message {
     _id: string;
     conversationId: string;
     senderId: User;
     messageType: "TEXT" | "IMAGE" | "FILE" | "LINK";
     messageContent: string;
     fileType?: "UNKNOWN" | "DOC" | "ZIP";
     isSeen?: boolean;
     isDeleted?: boolean;
     createdAt?: string;
     updatedAt?: string;
}

export interface MessageResponse {
     status: string;
     message: string;
     data: Message;
}

export interface MessageGroup {
     count: number;
     messages: Message[];
     messageType: "TEXT" | "IMAGE" | "FILE" | "LINK";
}
