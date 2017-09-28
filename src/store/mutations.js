import {
  RECORD_ADDRESS,
  RECORD_CITY,
  SET_ACCOUNT,
  RECORD_SEARCH_VALUE,
  SHOW_CERTIFICATE,
  SET_CERTIFICATE,
  RECORD_STOREID,
  RECORD_BALANCE_MONEY,
  RECORD_BANK_CARD,
  RECORD_BANK_List
} from './mutation-types'
export default {
  [RECORD_ADDRESS](state, {
    latitude,
    longitude
  }) {
    state.latitude = latitude;
    state.longitude = longitude;
  },
  [RECORD_CITY](state, city) {
    state.city = city;
  },
  [SET_ACCOUNT](state, account) {
    state.account = account;
  },
  [RECORD_SEARCH_VALUE](state, searchValue) {
    state.searchValue = searchValue;
  },
  [SHOW_CERTIFICATE](state, showCertificate) {
    state.showCertificate = showCertificate;
  },
  [SET_CERTIFICATE](state, status) {
    state.certificateStatus = status;
  },
  [RECORD_STOREID](state, id) {
    state.storeId = id;
  },
  [RECORD_BALANCE_MONEY](state, m) {
    state.balanceMoney = m;
  },
  [RECORD_BANK_CARD](state, bankcard) {
    state.defaultBankCard = bankcard;
  },
  [RECORD_BANK_List](state, list) {
    state.bankList = list;
  }
}
