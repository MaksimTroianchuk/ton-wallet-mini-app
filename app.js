const e = React.createElement;
const { useState, useEffect } = React;
const { TonConnect } = window;

function App() {
  const [address, setAddress] = useState('Завантаження...');
  const [tokens, setTokens] = useState([]);
  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    const tonConnect = new TonConnect();

    tonConnect.onStatusChange((wallet) => {
      if (wallet) {
        setWallet(wallet);
        setAddress(wallet.account.address);
        // Тут ти можеш отримати список токенів з API або симулювати:
        setTokens(['TON', 'USDT', 'NFT']);
      } else {
        setWallet(null);
        setAddress('Не підключено');
        setTokens([]);
      }
    });

    tonConnect.connect(); // Запитує підключення гаманця
  }, []);

  return e('div', { style: { padding: 20, fontFamily: 'Arial, sans-serif' } },
    e('h2', null, '👛 TON Wallet Mini App'),
    e('div', null, 'Адреса: ', e('b', null, address)),
    e('div', { style: { marginTop: 10 } }, 'Монети: ', tokens.join(' | ')),
    !wallet && e('button', {
      onClick: () => {
        const tonConnect = new TonConnect();
        tonConnect.connect();
      },
      style: { marginTop: 20, padding: '10px 20px' }
    }, 'Підключити гаманець')
  );
}

const domContainer = document.querySelector('#root');
ReactDOM.render(e(App), domContainer);

