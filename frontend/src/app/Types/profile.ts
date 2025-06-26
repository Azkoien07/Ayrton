import { DashboardProps } from './dashboard';

export interface ProfileData {
  id: number;
  name: string;
  lastname: string;
  email: string;
  numberPhone: string;
  role: string;
  document: string;
  department?: string;
  position?: string;
  joinDate?: string;
  lastLogin?: string;
  address?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
}

export interface ValidationErrors {
  email: string;
  numberPhone: string;
  emergencyPhone: string;
  general?: string;
}

export interface NotificationState {
  show: boolean;
  type: 'success' | 'error' | 'info';
  message: string;
  details?: string;
}

export const roleOptions = {

};

export const roleOptionsMap = {
 
};
const ProfileData = {
  name: '',
  email: '',
  username: '',
  password: '',
  phone: '',
  bio: '',
  location: '',
  company: '',
  role: '',
  profileImage: ''
};
