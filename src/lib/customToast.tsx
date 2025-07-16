import { toast } from 'react-toastify';

export const toastDark = (message: string) =>
  toast(message, {
    style: {
      background: '#22272e',
      color: '#fff'
    },
    icon: <>🙈</>
  });
