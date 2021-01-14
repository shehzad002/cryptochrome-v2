import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getEarned, getMasterChefContract } from '../chm/utils'
import useChm from './useChm'
import useBlock from './useBlock'

const useEarnings = (pid: number) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const {
    account,
    ethereum,
  }: { account: string; ethereum: provider } = useWallet()
  const chm = useChm()
  const masterChefContract = getMasterChefContract(chm)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getEarned(masterChefContract, pid, account)
    setBalance(new BigNumber(balance))
  }, [account, masterChefContract, chm])

  useEffect(() => {
    if (account && masterChefContract && chm) {
      fetchBalance()
    }
  }, [account, block, masterChefContract, setBalance, chm])

  return balance
}

export default useEarnings
