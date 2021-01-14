import {useCallback} from 'react'

import useChm from './useChm'
import {useWallet} from 'use-wallet'

import {leave, getXChmStakingContract} from '../chm/utils'

const useLeave = () => {
  const {account} = useWallet()
  const chm = useChm()

  const handle = useCallback(
    async (amount: string) => {
      const txHash = await leave(
        getXChmStakingContract(chm),
        amount,
        account,
      )
      console.log(txHash)
    },
    [account, chm],
  )

  return {onLeave: handle}
}

export default useLeave
