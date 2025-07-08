const e = React.createElement;
const { useState, useEffect } = React;

function App() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initDataUnsafe) {
      const user = window.Telegram.WebApp.initDataUnsafe.user;
      if (user) {
        setUserId(user.id);
      }
    }
  }, []);

  return e('div', { style: { padding: 20, fontFamily: 'Arial, sans-serif' } },
    e('h2', null, '👛 TON Wallet Mini App'),
    userId 
      ? e('div', null, 'Ваш Telegram User ID: ', e('b', null, userId))
      : e('div', null, 'User ID не знайдено. Відкрийте в Telegram.')
  );
}

const domContainer = document.querySelector('#root');
ReactDOM.render(e(App), domContainer);

