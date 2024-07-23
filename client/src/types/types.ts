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
