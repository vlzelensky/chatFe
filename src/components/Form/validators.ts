import { FormRule } from 'antd';

export const validatePassword = (isSignUp: boolean) => (_: FormRule, value: string) => {
  if (isSignUp) {
    const pattern = new RegExp(
      /(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[A-Z])(?=.*[0-9])(?=.{8,}).*$/g
    );
    if (!value || (value.length > 8 && pattern.test(value))) {
      return Promise.resolve();
    }
    return Promise.reject(
      new Error('Только латинские буквы, 8 символов, 1 цифра и 1 заглавная буква')
    );
  }
  return Promise.resolve();
};

export const validateRepeatPassword = ({
  getFieldValue,
}: {
  getFieldValue: (name: string) => string;
}) => ({
  validator(_: FormRule, value: string) {
    if (!value || getFieldValue('password') === value) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('Пароли не совпадают'));
  },
});

export const validateUserName = (_: FormRule, value: string) => {
  if (value && value.indexOf(' ') >= 0) {
    return Promise.reject(
      new Error('Должен состоять из одного слова и не начинаться с пробелов')
    );
  }
  return Promise.resolve();
};
