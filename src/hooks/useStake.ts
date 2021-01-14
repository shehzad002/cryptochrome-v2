import { useCallback } from 'react'

import useChm from './useChm'
import { useWallet } from 'use-wallet'

import { stake, getMasterChefContract } from '../chm/utils'

const useStake = (pid: number) => {
  const { account } = useWallet()
  const chm = useChm()

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stake(
        getMasterChefContract(chm),
        pid,
        amount,
        account,
      )
      console.log(txHash)
    },
    [account, pid, chm],
  )

  return { onStake: handleStake }
}

export default useStake
