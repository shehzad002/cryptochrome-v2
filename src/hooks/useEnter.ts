import {useCallback} from 'react'

import useChm from './useChm'
import {useWallet} from 'use-wallet'

import {enter, getXChmStakingContract} from '../chm/utils'

const useEnter = () => {
  const {account} = useWallet()
  const chm = useChm()

  const handle = useCallback(
    async (amount: string) => {
      const txHash = await enter(
        getXChmStakingContract(chm),
        amount,
        account,
      )
      console.log(txHash)
    },
    [account, chm],
  )

  return {onEnter: handle}
}

export default useEnter
