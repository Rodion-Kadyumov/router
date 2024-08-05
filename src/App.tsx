import React from 'react';
import styles from "./components/Site.module.css";
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { S } from './components/pages/_styles';
import { Link } from 'react-router-dom';

const PATH = {
  ADIDAS: '/adidas',
  PUMA: '/puma',
  ABIBAS: '/abibas',
  PRICES: '/prices',
  PROTECTED: "/:protected",
} as const

function App() {

  const navigate = useNavigate()

  const navigateBackHandler = () => {
    navigate(-1)
  }

  const navigateForwardHandler = () => {
    navigate(+1)
  }

  return (
    <div>
      <div className={styles.header}><h1>HEADER</h1></div>
      <div className={styles.body}>
        <div className={styles.nav}>
          <S.NavWrapper><NavLink to={PATH.ADIDAS}>Adidas</NavLink></S.NavWrapper>
          <S.NavWrapper><NavLink to={PATH.PUMA}>Puma</NavLink></S.NavWrapper>
          <S.NavWrapper><NavLink to={PATH.ABIBAS}>Abibas</NavLink></S.NavWrapper>
          <S.NavWrapper><NavLink to={PATH.PRICES}>Цены для оптовиков</NavLink></S.NavWrapper>
          <S.NavWrapper><NavLink to={PATH.PROTECTED}>Защищённая страница</NavLink></S.NavWrapper>
        </div>
        <div className={styles.content}>
          <div className={styles.HorizontalNavigation}>
            <button onClick={navigateBackHandler} className={styles.ButtonLikeLink}>Back</button>
            <a href={PATH.ADIDAS} className={styles.LinkLikeButton}>Main</a>
            <button onClick={navigateForwardHandler} className={styles.ButtonLikeLink}>Forward</button>
          </div>
          <Outlet />
        </div>
      </div>
      <div className={styles.footer}>abibas 2023</div>
    </div>
  );
}

export default App;