import {useCallback} from 'react'

import useChm from './useChm'
import {useWallet} from 'use-wallet'
import {provider} from 'web3-core'
import {
  approve,
  getChmContract,
  getXChmStakingContract
} from '../chm/utils'

const useApproveStaking = () => {
  const {account}: { account: string; ethereum: provider } = useWallet()
  const chm = useChm()
  const lpContract = getChmContract(chm)
  const contract = getXChmStakingContract(chm)

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, contract, account)
      return tx
    } catch (e) {
      return false
    }
  }, [account, lpContract, contract])

  return {onApprove: handleApprove}
}

export default useApproveStaking
