import React from 'react';
import { DatePicker, Input, Radio } from 'antd';
import { user } from 'store';
import { InputI } from './types';
import {
  validateRepeatNewPassword,
  validatePassword,
  validateUserName,
} from './validators';

export const getFormItem = (type: string) => {
  const items: { [key: string]: React.ReactNode } = {
    input: <Input className='input' size='small' />,
    radio: (
      <Radio.Group>
        <Radio value='male'>Мужчина</Radio>
        <Radio value='female'>Женщина</Radio>
        <Radio value='notSelected'>Не выбрано</Radio>
      </Radio.Group>
    ),
    datePicker: <DatePicker allowClear={false} />,
    password: <Input.Password className='input' size='small' />,
  };

  return items[type];
};

export const inputs: InputI[] = [
  {
    title: 'Email',
    name: 'email',
    inputType: 'input',
    rules: [
      { required: true, message: 'Укажите email' },
      {
        type: 'email',
        message: 'Введите корректный Email',
      },
    ],
  },
  { title: 'Город', name: 'city', inputType: 'input' },
  {
    title: 'ФИО',
    name: 'name',
    inputType: 'input',
    rules: [{ required: true, message: 'Укажите ФИО' }],
  },
  { title: 'Страна', name: 'country', inputType: 'input' },
  {
    title: 'Дата рождения',
    name: 'birthDate',
    inputType: 'datePicker',
    rules: [{ required: true, message: 'Укажите дату рождения' }],
  },
  { title: 'Пол', name: 'gender', inputType: 'radio' },
  {
    title: 'Username',
    name: 'userName',
    inputType: 'input',
    rules: [
      { validator: validateUserName },
      { required: true, message: 'Укажите username' },
    ],
  },
  {
    title: 'Текущий пароль',
    name: 'password',
    inputType: 'password',
    rules: [validatePassword('newPassword')],
  },
  {
    title: 'Новый пароль',
    name: 'newPassword',
    inputType: 'password',
    rules: [validatePassword('password')],
  },
  {
    title: 'Повторите новый пароль',
    name: 'repeatNewPassword',
    inputType: 'password',
    rules: [validateRepeatNewPassword],
  },
];
