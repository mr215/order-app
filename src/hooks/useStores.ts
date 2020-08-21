import { useContext } from 'react'
import StoresContext from 'contexts/StoresContext'

const useStores = () => useContext(StoresContext)

export default useStores
