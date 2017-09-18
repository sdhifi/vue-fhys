import {
  RECORD_ADDRESS,
  RECORD_CITY,
  TOGGLE_LOADING,
  SET_ACCOUNT,
  RECORD_SEARCH_VALUE,
  SHOW_CERTIFICATE,
  SET_CERTIFICATE
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
  [TOGGLE_LOADING](state, isloading) {
    state.isloading = isloading;
  },
  [SET_ACCOUNT](state, account) {
    state.account = account;
  },
  [RECORD_SEARCH_VALUE](state, searchValue) {
    state.searchValue = searchValue;
  },
  [SHOW_CERTIFICATE](state,showCertificate){
    state.showCertificate = showCertificate;
  },
  [SET_CERTIFICATE](state,status){
    state.certificateStatus = status;
  }
}
