const e = React.createElement;
const { useState, useEffect } = React;

function App() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Telegram WebApp обʼєкт
    const tg = window.Telegram?.WebApp;

    if (tg && tg.initDataUnsafe?.user) {
      setUserId(tg.initDataUnsafe.user.id);
      tg.ready(); // Показує, що WebApp готовий
      tg.expand(); // Розгортає на весь екран
    } else {
      setUserId('❌ Mini App відкрито не в Telegram!');
    }
  }, []);

  return e('div', { style: { padding: 20, fontFamily: 'Arial, sans-serif' } },
    e('h2', null, '👛 TON Wallet Mini App'),
    e('div', null, 'Ваш Telegram ID: ', e('b', null, userId))
  );
}

const domContainer = document.querySelector('#root');
ReactDOM.render(e(App), domContainer);


