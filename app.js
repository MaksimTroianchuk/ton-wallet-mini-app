const e = React.createElement;
const { useState, useEffect } = React;

function App() {
  const [userId, setUserId] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;

    if (!tg) {
      setError('❌ Відкрий Mini App через Telegram!');
      return;
    }

    if (!tg.initDataUnsafe?.user) {
      setError('❌ Користувач не знайдений. Відкрий Mini App через бота!');
      return;
    }

    setUserId(tg.initDataUnsafe.user.id);
    tg.ready();
    tg.expand();

    window.tonConnect = new window.TonConnect({
      manifestUrl: 'https://MaksimTroianchuk.github.io/ton-wallet-mini-app/tonconnect-manifest.json'
    });

    window.tonConnect.restoreConnection().then(() => {
      const acct = window.tonConnect.account;
      if (acct) setWallet(acct.address);
    }).catch(() => {
      // Ігноруємо помилки підключення на цьому етапі
    });
  }, []);

  const handleConnect = async () => {
    try {
      const r = await window.tonConnect.connect();
      if (r?.account) setWallet(r.account.address);
    } catch {
      setError('❌ Не вдалося підключити гаманець.');
    }
  };

  if (error) {
    return e('div', { style: { padding: 20, fontFamily: 'Arial', color: 'red' } }, error);
  }

  return e('div', { style: { padding: 20, fontFamily: 'Arial, sans-serif' } },
    e('h2', null, '👛 TON Wallet Mini App'),
    e('div', null, 'Telegram ID: ', e('b', null, userId)),
    wallet
      ? e('div', { style: { marginTop: 10 } }, 'Гаманець: ', e('b', null, wallet))
      : e('button', {
          onClick: handleConnect,
          style: { marginTop: 20, padding: '10px 20px', fontSize: '16px' }
        }, '🔗 Підключити гаманець')
  );
}

const dom = document.querySelector('#root');
ReactDOM.render(e(App), dom);


