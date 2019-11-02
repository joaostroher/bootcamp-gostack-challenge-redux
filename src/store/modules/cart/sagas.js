import { call, put, all, takeLatest } from 'redux-saga/effects';

import api from '../../../services/api';

import { addToCartSuccess } from './actions';
import { formatPrice } from '../../../util/format';

function* addToCart({ id }) {
  const response = yield call(api.get, `/products/${id}`);

  const data = {
    ...response.data,
    amount: 1,
    priceFormatted: formatPrice(response.data.price),
  };
  yield put(addToCartSuccess(data));
}

export default all([takeLatest('@cart/ADD_REQUEST', addToCart)]);
