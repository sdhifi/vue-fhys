import {
  RECORD_BANK_CARD,
  RECORD_BANK_List
} from './mutation-types'
import {
  myBanks
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
        }
      }
    })
  }
}
