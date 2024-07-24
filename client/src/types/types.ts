import { Control, UseFormReturn } from "react-hook-form";

export interface ContactItemType {
  _id: string;
  avatar: string;
  firstName: string;
  lastName: string;
  lastMessage: string;
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
  confirmPassword: string;
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

export interface UserDataResponse {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  avatar: string;
  isOnline: boolean;
}

export interface authStateType {
  userInfo: UserDataResponse | null;
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
}

export interface LoginResponse {
  status: string;
  message: string;
  data: UserDataResponse;
  accessToken: string | null;
  refreshToken: string | null;
}
