export const apiUrl = 'http://10.1.2.75:8000/api/';

export const goodStatuses = [
  {
    name: 1,
    value: 'на складе',
    color: 'primary',
    isAvailable: true,
    className: 'status-in-storage',
  }, {
    name: 2,
    value: 'у НУ',
    color: 'secondary',
    isAvailable: true,
    className: 'status-nu',
  }, {
    name: 3,
    value: 'у СИ',
    color: 'warning',
    isAvailable: true,
    className: 'status-si',
  }, {
    name: 4,
    value: 'у абонента',
    color: 'success',
    isAvailable: false,
    className: 'status-at-abon',
  },
];

export const tradeStatuses = [
  {
    name: 1,
    value: 'в ожидании',
    color: 'warning',
  }, {
    name: 2,
    value: 'принят',
    color: 'success',
  }, {
    name: 3,
    value: 'отклонён',
    color: 'error',
  },
];

export const formatDate = (date) => {
  const newDate = new Date(date);
  const pad = (num, size) => num.toString().padStart(size, '0');
  
  const year = newDate.getFullYear();
  const month = pad(newDate.getMonth() + 1, 2);
  const day = pad(newDate.getDate(), 2);
  const hours = pad(newDate.getHours(), 2);
  const minutes = pad(newDate.getMinutes(), 2);
  
  return `${day}.${month}.${year}  ${hours}:${minutes}`;
};
