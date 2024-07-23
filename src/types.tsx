export type User = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  startDate: string;

  street: string;
  city: string;
  state: string;
  zipCode: string;
  department: string;
};

export type Users = User[];

export type Toast = {
  id: number;
  text: React.ReactNode;
};

export type ToastContextProps = {
  toasts: Toast[];
  showToast: (text: React.ReactNode) => void;
  hideToast: (id: number) => void;
};
