const e = React.createElement;
const { useState, useEffect } = React;

function App() {
  const [userId, setUserId] = useState(null);
  const [wallet, setWallet] = useState(null);
  let tonConnect;

  useEffect(() => {
    const tg = window.Telegram?.WebApp;

    if (tg && tg.initDataUnsafe?.user) {
      setUserId(tg.initDataUnsafe.user.id);
      tg.ready();
      tg.expand();
    } else {
      setUserId('❌ Mini App відкрито не в Telegram!');
    }

    // Ініціалізація TonConnect
    tonConnect = new window.TonConnect({
      manifestUrl: 'https://maksymsuper.github.io/ton-wallet-mini-app/tonconnect-manifest.json'
    });

    window.tonConnect = tonConnect;

    tonConnect.restoreConnection().then(() => {
      const connectedWallet = tonConnect.account;
      if (connectedWallet) {
        setWallet(connectedWallet.address);
      }
    });
  }, []);

  const handleConnect = async () => {
    const result = await window.tonConnect.connect();
    if (result && result.account) {
      setWallet(result.account.address);
    }
  };

  return e('div', { style: { padding: 20, fontFamily: 'Arial, sans-serif' } },
    e('h2', null, '👛 TON Wallet Mini App'),
    e('div', null, 'Ваш Telegram ID: ', e('b', null, userId)),
    wallet
      ? e('div', { style: { marginTop: 10 } }, '🔗 Підключено до гаманця: ', e('b', null, wallet))
      : e('button', {
          onClick: handleConnect,
          style: { marginTop: 20, padding: '10px 20px', fontSize: '16px' }
        }, '🔗 Підключити гаманець')
  );
}

const domContainer = document.querySelector('#root');
ReactDOM.render(e(App), domContainer);
