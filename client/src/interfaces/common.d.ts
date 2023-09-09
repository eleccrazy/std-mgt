import { HubData } from './student';

export interface CustomButtonProps {
  type?: string;
  title: string;
  backgroundColor: string;
  color: string;
  fullWidth?: boolean;
  icon?: ReactNode;
  disabled?: boolean;
  handleClick?: () => void;
}

export interface ProfileProps {
  type: string;
  name: string;
  avatar: string;
  email: string;
  properties: Array | undefined;
}

export interface PropertyProps {
  _id: string;
  title: string;
  description: string;
  location: string;
  price: string;
  photo: string;
  creator: string;
}

export interface StudentRegisterFormProps {
  register: any;
  onFinish: (
    values: FieldValues,
  ) => Promise<void | CreateResponse<BaseRecord> | UpdateResponse<BaseRecord>>;
  formLoading: boolean;
  handleSubmit: FormEventHandler<HTMLFormElement> | undefined;
  onFinishHandler: (data: FieldValues) => Promise<void> | void;
  programs: string[];
  hubs: string[];
  cohorts: string[];
  watch: UseFormWatch<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  errors: FieldErrors<FieldValues>;
}

export interface InfoCardProps {
  title: string;
  value: string;
  action?: React.ReactNode;
}

export interface ConfirmationDialogProps {
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
  dialogTitle: string;
  dialogDescription: string;
}
export interface CreateProgramDialogProps {
  isOpened: boolean;
  handleClose: () => void;
  isProgram: boolean;
  programId?: string;
}

export interface CreateHubDialogProps {
  isOpened: boolean;
  handleClose: () => void;
  updateHubs: (hub: HubType) => void;
}

export interface CreateAccountDialogProps {
  isOpened: boolean;
  handleClose: () => void;
  updateAccount: (account: AccountData) => void;
}

export interface ProgramType {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface EditDialogProps {
  id: string;
  isOpened: boolean;
  handleClose: () => void;
  isProgram: boolean;
  name: string;
}

export interface EditHubDialogProps {
  id: string;
  isOpened: boolean;
  handleClose: () => void;
  name: string;
}

export interface HubType {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AccountData {
  id?: string;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
  hub: HubType;
}
