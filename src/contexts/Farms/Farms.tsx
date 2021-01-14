import React, { useCallback, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'
import useChm from '../../hooks/useChm'

import { bnToDec } from '../../utils'
import { getMasterChefContract, getEarned } from '../../chm/utils'
import { getFarms } from '../../chm/utils'

import Context from './context'
import { Farm } from './types'

const Farms: React.FC = ({ children }) => {
  const [unharvested, setUnharvested] = useState(0)

  const chm = useChm()
  const { account } = useWallet()

  const farms = getFarms(chm)

  return (
    <Context.Provider
      value={{
        farms,
        unharvested,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default Farms
