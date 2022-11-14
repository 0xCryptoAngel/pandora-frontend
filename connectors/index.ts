import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'


const RPC = {
    MAINNET: 'https://eth-mainnet.alchemyapi.io/v2/WA2AXzOrXOj664de25fmJr7dSzsQXx42',
    ROPSTEN: 'https://eth-ropsten.alchemyapi.io/v2/cidKix2Xr-snU3f6f6Zjq_rYdalKKHmW',
    RINKEBY: 'https://eth-rinkeby.alchemyapi.io/v2/2bsCK-9_nnvL-mWAuXGF1DoDx5KhtyGU',
    GÖRLI: 'https://eth-goerli.alchemyapi.io/v2/Dkk5d02QjttYEoGmhZnJG37rKt8Yl3Im',
    KOVAN: 'https://eth-kovan.alchemyapi.io/v2/fRJBkIBRRgoyjPZZfZIO3mUcNgraMh5e',
    FANTOM: 'https://rpcapi.fantom.network',
    FANTOM_TESTNET: 'https://rpc.testnet.fantom.network',
    MATIC: 'https://rpc-mainnet.maticvigil.com',
    MATIC_TESTNET: 'https://rpc-mumbai.matic.today',
    XDAI: 'https://rpc.xdaichain.com',
    BSC: 'https://bsc-dataseed.binance.org/',
    BSC_TESTNET: 'https://data-seed-prebsc-2-s3.binance.org:8545',
    MOONBASE: 'https://rpc.testnet.moonbeam.network',
    AVALANCHE: 'https://api.avax.network/ext/bc/C/rpc',
    FUJI: 'https://api.avax-test.network/ext/bc/C/rpc',
    HECO: 'https://http-mainnet.hecochain.com',
    HECO_TESTNET: 'https://http-testnet.hecochain.com',
    HARMONY: 'https://explorer.harmony.one',
    HARMONY_TESTNET: 'https://explorer.pops.one'
}


// testnet only
export const walletconnect = new WalletConnectConnector({
    rpc: { 1: RPC.MAINNET, 5: RPC.GÖRLI, 137: RPC.MATIC },
    bridge: 'https://bridge.walletconnect.org',
    qrcode: true,
})

export const injected = new InjectedConnector({
    supportedChainIds: [
        1, // mainnet
        3, // ropsten
        4, // rinkeby
        5, // goreli
        42, // kovan
        250, // fantom
        4002, // fantom testnet
        137, // matic
        80001, // matic testnet
        100, // xdai
        56, // binance smart chain
        97, // binance smart chain testnet
        1287, // moonbase
        43114, // avalanche
        43113, // fuji
        128, // heco
        256, // heco testnet
        1666600000, // harmony
        1666700000 // harmony testnet
    ]
})
