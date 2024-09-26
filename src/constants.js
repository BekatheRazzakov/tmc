export const apiUrl = 'http://10.1.2.168:8001/api/';

export const productTypes = [
  { en: 'Cable', ru: 'Кабель' },
  { en: 'Adapter', ru: 'Адаптер' },
  { en: 'Router', ru: 'Маршрутизатор' },
  { en: 'Clamp', ru: 'Зажим' },
  { en: 'Media Converter', ru: 'Медиаконвертер' },
  { en: 'ODF', ru: 'ODF' },
  { en: 'ONU', ru: 'ONU' },
  { en: 'Patch Cord', ru: 'Патч-корд' },
  { en: 'Set Top Box', ru: 'Приставка' },
  { en: 'SFP Module', ru: 'SFP Модуль' },
  { en: 'Splitter', ru: 'Сплиттер' },
  { en: 'Straight Bracket', ru: 'Прямой кронштейн' },
  { en: 'UTP Cable', ru: 'UTP Кабель' },
];

export const goodStatuses = [
  {
    name: 1,
    value: 'на складе',
    color: 'primary',
    isAvailable: true,
    className: 'status-in-storage',
  },
  {
    name: 2,
    value: 'у начальника участка',
    color: 'secondary',
    isAvailable: true,
    className: 'status-nu',
  },
  {
    name: 3,
    value: 'у сервис инженера',
    color: 'warning',
    isAvailable: true,
    className: 'status-si',
  },
  {
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
  },
  {
    name: 2,
    value: 'принят',
    color: 'success',
  },
  {
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
