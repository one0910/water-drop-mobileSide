import { Outlet } from 'react-router-dom';
import Bottom from './components/Bottom';
import styles from './App.module.less';
import Header from './components/Header';

function App() {

  return (
    <div className={styles.container}>
      <Header />
      <Outlet />
      <Bottom />
    </div>
  )
}

export default App
