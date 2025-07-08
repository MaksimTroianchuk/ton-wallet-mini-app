const e = React.createElement;
const { useState, useEffect } = React;
const { TonConnect } = window;

function App() {
  const [address, setAddress] = useState('Не підключено');
  const [tokens, setTokens] = useState([]);
  const [tonConnect, setTonConnect] = useState(null);

  useEffect(() => {
    const tc = new TonConnect();
    setTonConnect(tc);

    tc.onStatusChange((wallet) => {
      if (wallet) {
        setAddress(wallet.account.address);
        setTokens(['TON', 'USDT', 'NFT']); // Поки що статично
      } else {
        setAddress('Не підключено');
        setTokens([]);
      }
    });

    // Автоматична спроба підключення
    tc.connect();
  }, []);

  return e('div', { style: { padding: 20, fontFamily: 'Arial, sans-serif' } },
    e('h2', null, '👛 TON Wallet Mini App'),
    e('div', null, 'Адреса: ', e('b', null, address)),
    e('div', { style: { marginTop: 10 } }, 'Монети: ', tokens.join(' | ')),
    tonConnect && !address.includes('EQC') && e('button', {
      onClick: () => tonConnect.connect(),
      style: { marginTop: 20, padding: '10px 20px', fontSize: '16px' }
    }, 'Підключити гаманець')
  );
}

const domContainer = document.querySelector('#root');
ReactDOM.render(e(App), domContainer);
