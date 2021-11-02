import styles from './navBar.module.css';
import BackArrow from '../icons/BackArrow';
import avatarImg from '../../assets/avatar.png';
const NavBar = () => {
  return (
    <div className={styles.container}>
      <BackArrow />
      <div className={styles.avatar}>
        <img src={avatarImg} alt="profile" className={styles.avatar} />
      </div>
    </div>
  );
};

export default NavBar;
