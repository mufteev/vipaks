import LOADED_STATE from './load-state';
import ORDER_STATE from './order-state';

const intl = new Intl.DateTimeFormat('ru');
const sizes = ['B', 'KB', 'MB', 'GB'];

function toDate(str) {
  const date = new Date(str);
  return intl.format(date);
}

function bytesToSize(bytes) {
  if (bytes === 0) return '0 Byte';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const data = bytes / Math.pow(1024, i);

  return `${Math.round(data)} ${sizes[i]}`;
}

export {
  toDate,
  bytesToSize,
  ORDER_STATE,
  LOADED_STATE,
};
