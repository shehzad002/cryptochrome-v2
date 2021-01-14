import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getEarned, getMasterChefContract, getFarms } from '../chm/utils'
import useChm from './useChm'
import useBlock from './useBlock'

const useAllEarnings = () => {
  const [balances, setBalance] = useState([] as Array<BigNumber>)
  const { account }: { account: string; ethereum: provider } = useWallet()
  const chm = useChm()
  const farms = getFarms(chm)
  const masterChefContract = getMasterChefContract(chm)
  const block = useBlock()

  const fetchAllBalances = useCallback(async () => {
    const balances: Array<BigNumber> = await Promise.all(
      farms.map(({ pid }: { pid: number }) =>
        getEarned(masterChefContract, pid, account),
      ),
    )
    setBalance(balances)
  }, [account, masterChefContract, chm])

  useEffect(() => {
    if (account && masterChefContract && chm) {
      fetchAllBalances()
    }
  }, [account, block, masterChefContract, setBalance, chm])

  return balances
}

export default useAllEarnings
