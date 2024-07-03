export const apiUrl = 'http://10.1.2.75:8000/api/';

export const categories = [
  {
    name: 'cable', value: 'кабель',
  }, {
    name: 'adapter', value: 'адаптер',
  }, {
    name: 'clamp', value: 'зажим',
  }, {
    name: 'media_converter', value: 'медиа конвертер',
  }, {
    name: 'odf', value: 'ODF',
  }, {
    name: 'onu', value: 'ONU',
  }, {
    name: 'patch_cord', value: 'пач корд',
  }, {
    name: 'set_top_box', value: 'приставка',
  }, {
    name: 'sfp_module', value: 'модуль SFP',
  }, {
    name: 'splitter', value: 'разделитель',
  }, {
    name: 'straight_bracket', value: 'кронштейн',
  }, {
    name: 'utp_cable', value: 'UTP кабель',
  },
];

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
