import { useCallback } from 'react'

import useChm from './useChm'
import { useWallet } from 'use-wallet'

import { unstake, getMasterChefContract } from '../chm/utils'

const useUnstake = (pid: number) => {
  const { account } = useWallet()
  const chm = useChm()
  const masterChefContract = getMasterChefContract(chm)

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await unstake(masterChefContract, pid, amount, account)
      console.log(txHash)
    },
    [account, pid, chm],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstake
