import { useSelector, shallowEqual } from 'react-redux'

import { Img } from 'react-image'
import { IoRadioButtonOn } from 'react-icons/io5'

import Wallet from '../../wallet'

export default function Networks({ handleDropdownClick }) {
  const { chains, chains_status } = useSelector(state => ({ chains: state.chains, chains_status: state.chains_status }), shallowEqual)
  const { chains_status_data } = { ...chains_status }
  const { chains_data } = { ...chains }

  return (
    <>
      <div className="dropdown-title">Select Network</div>
      <div className="flex flex-wrap pb-1">
        {chains_data?.filter(item => !item.menu_hidden).map((item, i) => (
          item.disabled ?
            <div
              key={i}
              title="Disabled"
              className="dropdown-item w-1/2 cursor-not-allowed flex items-center justify-start font-medium space-x-1 p-2"
            >
              <IoRadioButtonOn size={12} className="text-gray-400 dark:text-gray-600" />
              <Img
                src={item.image}
                alt=""
                className="w-5 h-5 rounded-full"
              />
              <span className="leading-4 text-2xs font-medium">{item.title}</span>
            </div>
            :
            <Wallet
              key={i}
              chainIdToConnect={item.chain_id}
              onChangeNetwork={handleDropdownClick}
              buttonDisconnectTitle={<>
                <IoRadioButtonOn size={12} className={`min-w-max ${!chains_status_data || chains_status_data?.find(_chain => _chain?.id === item.id)?.synced ? 'text-green-600 dark:text-green-500' : 'text-red-500 dark:text-red-600'}`} />
                <Img
                  src={item.image}
                  alt=""
                  className="w-5 h-5 rounded-full"
                />
                <span className="leading-4 text-2xs font-medium text-left">{item.title}</span>
              </>}
              buttonDisconnectClassName="dropdown-item w-1/2 flex items-center justify-start space-x-1 p-2"
            />
        ))}
      </div>
    </>
  )
}