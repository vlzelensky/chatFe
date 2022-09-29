import { FormRule } from 'antd';

export const validateRepeatNewPassword = ({
  getFieldValue,
}: {
  getFieldValue: (name: string) => string;
}) => ({
  validator(_: FormRule, value: string) {
    if (getFieldValue('newPassword') === value) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('Пароли не совпадают'));
  },
});

export const validatePassword =
  (name: string) =>
  ({ getFieldValue }: { getFieldValue: (name: string) => string }) => ({
    validator(_: FormRule, value: string) {
      if (getFieldValue(name) && !value) {
        return Promise.reject(
          new Error(
            name === 'newPassword'
              ? 'Введите текущий пароль'
              : 'Введите новый пароль'
          )
        );
      }
      return Promise.resolve();
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
