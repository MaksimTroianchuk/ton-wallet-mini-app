// Проста версія без збірки, React через CDN
const e = React.createElement;
const { useState, useEffect } = React;

function App() {
  const [address, setAddress] = useState('Завантаження...');
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    // Тут треба додати підключення через TonConnect SDK,
    // але для простоти — симулюємо
    setTimeout(() => {
      setAddress('EQC12345ABCDEF');
      setTokens(['TON', 'USDT', 'NFT']);
    }, 1000);
  }, []);

  return e('div', { style: { padding: 20, fontFamily: 'Arial, sans-serif' } },
    e('h2', null, '👛 TON Wallet Mini App'),
    e('div', null, 'Адреса: ', e('b', null, address)),
    e('div', { style: { marginTop: 10 } }, 'Монети: ', tokens.join(' | '))
  );
}

const domContainer = document.querySelector('#root');
ReactDOM.render(e(App), domContainer);
