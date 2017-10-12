import {
  RECORD_BANK_CARD,
  RECORD_BANK_List,
  RECORD_ADDRESS_List,
  RECORD_DEFAULT_ADDRESS,
  RECORD_CART_LIST,
} from './mutation-types'
import {
  myBanks,
  getMyAddress,
  myCart,
} from '../api/index'
export default {
  getBankList({
    commit,
    state
  }) {
    mui.ajax({
      url: myBanks,
      type: 'post',
      headers: {
        'app-version': 'v1.0'
      },
      data: {
        account: state.account,
        token: md5(`myBanks${state.account}`)
      },
      success(res) {
        let bankList = res.result;
        if (bankList.length) {
          let defaultBankCard = bankList[0];
          commit(RECORD_BANK_List, bankList);
          commit(RECORD_BANK_CARD, defaultBankCard);
        } else {
          commit(RECORD_BANK_List, []);
          commit(RECORD_BANK_CARD, null);
        }
      }
    })
  },
  getAddressList({
    commit,
    state
  }) {
    mui.ajax({
      url: getMyAddress,
      type: 'post',
      headers: {
        'app-version': 'v1.0'
      },
      data: {
        account: state.account,
        token: md5('getMyAddress')
      },
      success(res) {
        let _result = res.result;
        if (_result.length) {
          _result.forEach((item, index) => {
            if (item.isDefault == '1') {
              commit('RECORD_DEFAULT_ADDRESS', item)
            }
          })
          commit('RECORD_ADDRESS_List', _result)
        }
      }
    })
  },
  getCartList({
    commit,
    state
  }) {
    mui.ajax({
      url: myCart,
      type: 'post',
      headers: {
        'app-version': 'v1.0'
      },
      data: {
        account: state.account,
        token: md5(`myCart${state.account}`)
      },
      success(res) {
        let _result = res.result;
        _result.forEach((item,index)=>{
          item.close= true;
        })
        commit(RECORD_CART_LIST, _result);
      }
    })
  }
}
