import { Control, UseFormReturn } from "react-hook-form";

export interface ContactItemType {
  _id: string;
  avatar: string;
  firstname: string;
  lastname: string;
  lastMessage?: string;
  isOnline: boolean;
}

export interface ContactListProps {
  contacts: ContactItemType[];
  selectedContact: ContactItemType | null;
  onSelectedContact: (contact: ContactItemType) => void;
}

export interface ContactItemProps {
  contactItem: ContactItemType;
  selectedContact: ContactItemType | null;
  onSelectedContact: (contact: ContactItemType) => void;
}

export interface BaseTextFieldControllerProps {
  type?: string;
  control: Control<any>;
  name: string;
  label: string;
  endIcon?: React.ReactNode;
  placeholder?: string;
  errorMessage?: string;
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface RegisterFormValues {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
}

export interface LoginFormProps {
  form: UseFormReturn<LoginFormValues>;
  onSubmitLogin: (data: LoginFormValues) => void;
}

export interface RegisterFormProps {
  form: UseFormReturn<RegisterFormValues>;
  onSubmitRegister: (data: RegisterFormValues) => void;
}

export interface AppState {
  openChatDetail: boolean;
}

export interface User {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  avatar: string;
  isOnline: boolean;
}

export interface authStateType {
  userInfo: User | null;
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
}

export interface CredentialResponse {
  status: string;
  message: string;
  data: User;
  accessToken: string | null;
  refreshToken: string | null;
}

export interface GetMeResponse {
  status: string;
  message: string;
  data: User;
}

export interface SearchUserResponse {
  status: string;
  message: string;
  data: User[];
}

export interface CurrentConversationPayload {
  limit: number;
  senderId: string;
  recepientId: string;
  conversationType?: "SINGLE" | "GROUP";
}

export interface ConversationState {
  contacts: ContactItemType[];
  currentConversation: Conversation | null;
  selectedContact: User | null;
  chatDetail: MessageGroup[];
}

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

export interface MessageProps {
  message: Message;
}

export interface Conversation {
  _id: string;
  createtorId: string;
  paticipants: User[];
  conversationType?: "SINGLE" | "GROUP";
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
  messages?: Message[];
}
export interface ConversationResponse {
  status: string;
  message: string;
  data: Conversation;
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

export interface ConversationDetailResponse {
  status: string;
  message: string;
  data: MessageGroup[];
}
