import React, { createContext, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'

import { Chm } from '../../chm'

export interface ChmContext {
  chm?: typeof Chm
}

export const Context = createContext<ChmContext>({
  chm: undefined,
})

declare global {
  interface Window {
    chmsauce: any
  }
}

const ChmProvider: React.FC = ({ children }) => {
  const { ethereum }: { ethereum: any } = useWallet()
  const [chm, setChm] = useState<any>()

  // @ts-ignore
  window.chm = chm
  // @ts-ignore


  useEffect(() => {
    if (ethereum) {
      const chainId = Number(ethereum.chainId)
      const chmLib = new Chm(ethereum, chainId, false, {
        defaultAccount: ethereum.selectedAddress,
        defaultConfirmations: 1,
        autoGasMultiplier: 1.5,
        testing: false,
        defaultGas: '6000000',
        defaultGasPrice: '1000000000000',
        accounts: [],
        ethereumNodeTimeout: 10000,
      })
      setChm(chmLib)
      window.chmsauce = chmLib
    }
  }, [ethereum])

  return <Context.Provider value={{ chm }}>{children}</Context.Provider>
}

export default ChmProvider
