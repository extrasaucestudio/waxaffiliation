const EventEmitter = require('events');
let eventNotifier = new EventEmitter();

const { Api, JsonRpc, RpcError } = require('eosjs');
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig');      // development only
global.nativeFetch = require('node-fetch')
global.fetch = (url, args = {}) => {
  args.headers = args.headers || {}
  args.headers['user-agent'] = 'WakaBot - wax bridge. discord : Wapaca#6735';
  return nativeFetch(url, args)
}

global.WebSocket = require('ws')
const { TextEncoder, TextDecoder } = require('util');                   // node only; native TextEncoder/Decoder

const defaultPrivateKey = "5J44zzZ5AD66c9AJufaebB1W9gAdnS3A9ADHcnHyMKhC41SH6TD"; // bob
const signatureProvider = new JsSignatureProvider([defaultPrivateKey]);

const rpc = new JsonRpc('https://wax.greymass.com', { fetch });
const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });

function precise (x, y = 4) {
  return Number.parseFloat(x).toFixed(y);
}

var config = {
  'wallet' : 'remixplayer1', // wallet that will distribute token
};

const getBalance = async(contract, ticker) => {
  let bal = await rpc.get_currency_balance(contract, config.wallet, ticker)

  if(bal.length) {
    bal = bal[0].split(' ') // remove ticker
    bal = bal[0]
    return bal
  }

  return null
}

const claimRMX = async (contract, ticker, amount) => {
  try {
    const result = await api.transact({
      actions: [{
        account: 'freecitygamx',
        name: 'claimstake',
        authorization: [{
          actor: config.wallet,
          permission: 'active',
        }],
        data: {
          wallet: config.wallet,
        },
      }]
    }, {
      blocksBehind: 3,
      expireSeconds: 30,
    });
    console.dir(result);
  } catch (e) {
    console.log(e);
    //console.log('\nCaught exception: ' + e);
    if (e instanceof RpcError)
      console.log(JSON.stringify(e.json, null, 2));
  }
}


const main = async() => {
  claimRMX()
}

main();