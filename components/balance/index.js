import { useSelector, shallowEqual } from 'react-redux'
import { RotatingSquare } from 'react-loader-spinner'

import { number_format, equals_ignore_case, loader_color } from '../../lib/utils'

export default ({
  chainId,
  asset,
  contractAddress,
  symbol,
  className = '',
}) => {
  const { preferences, assets, wallet, balances } = useSelector(state => ({ preferences: state.preferences, assets: state.assets, wallet: state.wallet, balances: state.balances }), shallowEqual)
  const { theme } = { ...preferences }
  const { assets_data } = { ...assets }
  const { wallet_data } = { ...wallet }
  const { web3_provider } = { ...wallet_data }
  const { balances_data } = { ...balances }

  const asset_data = assets_data?.find(a => a?.id === asset)
  const contract_data = asset_data?.contracts?.find(c => c?.chain_id === chainId)
  const balance = balances_data?.[chainId]?.find(b => equals_ignore_case(b?.contract_address, contractAddress || contract_data?.contract_address))
  const amount = balance && Number(balance.amount)
  symbol = symbol || contract_data?.symbol || asset_data?.symbol

  return chainId && asset && (
    <div className={`flex items-center justify-center text-slate-600 dark:text-white text-xs space-x-1 ${className}`}>
      {typeof amount === 'number' ?
        <>
          <span className="font-bold">
            {number_format(
              amount,
              amount > 10000 ?
                '0,0' :
                amount > 100 ?
                  '0,0.00' :
                  '0,0.000000',
              true,
            )}
          </span>
          <span className="hidden sm:block font-semibold">
            {symbol}
          </span>
        </> :
        typeof amount === 'string' ?
          <span>
            n/a
          </span> :
          web3_provider && (
            <RotatingSquare
              color={loader_color(theme)}
              width="16"
              height="16"
            />
          )
      }
    </div>
  )
}