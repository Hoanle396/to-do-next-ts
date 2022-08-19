import { toast, TypeOptions } from 'react-toastify';

interface IToastEmit {
  type: TypeOptions;
  message: string;
}

export const toastEmit = ({ type, message }: IToastEmit) => {
  toast(message, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    type,
  });
};