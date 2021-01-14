import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getStaked, getMasterChefContract } from '../chm/utils'
import useChm from './useChm'
import useBlock from './useBlock'

const useStakedBalance = (pid: number) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account }: { account: string } = useWallet()
  const chm = useChm()
  const masterChefContract = getMasterChefContract(chm)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getStaked(masterChefContract, pid, account)
    setBalance(new BigNumber(balance))
  }, [account, pid, chm])

  useEffect(() => {
    if (account && chm) {
      fetchBalance()
    }
  }, [account, pid, setBalance, block, chm])

  return balance
}

export default useStakedBalance
