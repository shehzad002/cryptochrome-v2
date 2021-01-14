import { useContext } from 'react'
import { Context } from '../contexts/ChmProvider'

const useChm = () => {
  const { chm } = useContext(Context)
  return chm
}

export default useChm
