const e = React.createElement;
const { useState, useEffect } = React;

function App() {
  const [userId, setUserId] = useState(null);
  const [wallet, setWallet] = useState(null);

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
    window.tonConnect = new window.TonConnect({
      manifestUrl: 'https://maksymsuper.github.io/ton-wallet-mini-app/tonconnect-manifest.json'
    });

    // Якщо вже підключено — показати адресу
    window.tonConnect.restoreConnection().then(() => {
      const connected = window.tonConnect.account;
      if (connected) {
        setWallet(connected.address);
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
      ? e('div', { style: { marginTop: 10 } }, '🔗 Гаманець підключено: ', e('b', null, wallet))
      : e('button', {
          onClick: handleConnect,
          style: { marginTop: 20, padding: '10px 20px', fontSize: '16px' }
        }, '🔗 Підключити гаманець')
  );
}

const domContainer = document.querySelector('#root');
ReactDOM.render(e(App), domContainer);

