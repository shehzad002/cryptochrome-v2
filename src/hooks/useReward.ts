import { useCallback } from 'react'

import useChm from './useChm'
import { useWallet } from 'use-wallet'

import { harvest, getMasterChefContract } from '../chm/utils'

const useReward = (pid: number) => {
  const { account } = useWallet()
  const chm = useChm()
  const masterChefContract = getMasterChefContract(chm)

  const handleReward = useCallback(async () => {
    const txHash = await harvest(masterChefContract, pid, account)
    console.log(txHash)
    return txHash
  }, [account, pid, chm])

  return { onReward: handleReward }
}

export default useReward
