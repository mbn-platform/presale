const {web3, snapshot, rollback} = require('./web3');
const sources = {
  Deploy: require('../dist/deploy.json'),
  Presale: require('../dist/presale.json'),
  Token: require('../dist/token.json'),
  Treasure: require('../dist/treasure.json'),
};
const {getContracts, getAccounts} = require('../util/web3');

const {toWei, fromWei} = web3.utils;

module.exports = (test) => {
  test.define((async) => {
    return {
      web3,
      snapshot,
      rollback,
      toWei: web3.utils.toWei,
      fromWei: web3.utils.fromWei,
      getBalance: (address, units = 'ether') => web3.eth.getBalance(address)
      .then((balance) => web3.utils.fromWei(balance, units)),
    };
  });

  test.define(async({web3}) => {
    accounts = await getAccounts(web3, [
      'main',
      'member1',
      'member2',
      'member3',
      'member4',
      'user1',
      'user2',
      'user3',
      'user4',
    ]);

    contracts = await getContracts(web3, {
      deploy: sources.Deploy,
      presale: sources.Presale,
      token: sources.Token,
      treasure: sources.Treasure,
    });

    return {contracts, accounts};
  });

  require('./deploy.spec')(test);
  // require('./presale.spec')(test);
  require('./token.spec')(test);
  require('./treasure.spec')(test);
};
