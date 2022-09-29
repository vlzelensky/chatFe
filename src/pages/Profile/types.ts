import { FormRule } from 'antd';

export interface InputI {
  title: string;
  name:
    | 'email'
    | 'name'
    | 'birthDate'
    | 'userName'
    | 'city'
    | 'country'
    | 'gender'
    | 'password'
    | 'newPassword'
    | 'repeatNewPassword';
  inputType: 'input' | 'radio' | 'datePicker' | 'password';
  rules?: FormRule[];
}
