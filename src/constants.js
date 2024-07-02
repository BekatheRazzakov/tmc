export const apiUrl = 'http://10.1.2.89:8000/api/';

export const categories = [
  {
    name: 'cable',
    value: 'кабель',
    createManufactureName: 'cable_manufactures',
    createModelName: 'cable_models',
  }, {
    name: 'adapter',
    value: 'адаптер',
    createManufactureName: 'adapters_manufactures',
    createModelName: 'adapters_models',
  }, {
    name: 'clamp',
    value: 'зажим',
    createManufactureName: 'clamps_manufactures',
    createModelName: 'clamps_models',
  }, {
    name: 'media_converter',
    value: 'медиа конвертер',
    createManufactureName: 'media_converters_manufactures',
    createModelName: 'media_converters_models',
  }, {
    name: 'odf',
    value: 'ODF',
    createManufactureName: 'odf_manufactures',
    createModelName: 'odf_models',
  }, {
    name: 'onu',
    value: 'ONU',
    createManufactureName: 'onu_manufactures',
    createModelName: 'onu_models',
  }, {
    name: 'patch_cord',
    value: 'пач корд',
    createManufactureName: 'patch_cord_manufactures',
    createModelName: 'patch_cord_models',
  }, {
    name: 'set_top_box',
    value: 'приставка',
    createManufactureName: 'set_top_box_manufactures',
    createModelName: 'set_top_box_models',
  }, {
    name: 'sfp_module',
    value: 'модуль SFP',
    createManufactureName: 'sfp_module_manufactures',
    createModelName: 'sfp_module_models',
  }, {
    name: 'splitter',
    value: 'разделитель',
    createManufactureName: 'splitter_manufactures',
    createModelName: 'splitter_models',
  }, {
    name: 'straight_bracket',
    value: 'кронштейн',
    createManufactureName: 'straight_bracket_manufactures',
    createModelName: 'straight_bracket_models',
  }, {
    name: 'utp_cable',
    value: 'UTP кабель',
    createManufactureName: 'utp_cable_manufactures',
    createModelName: 'utp_cable_models',
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
