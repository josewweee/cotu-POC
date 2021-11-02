import styles from './allProductsList.module.css';

export const AllProductsList = ({ data }) => {
  return (
    <>
      {data?.map((prod) => (
        <>
          <div className={styles.container}>
            <img src={prod?.src} alt="Prod img" className={styles.image} />
            <div className={styles.texts}>
              <span>{prod?.name}</span>
              <span className={styles.subtitle}>{prod?.brand?.name}</span>
            </div>
          </div>
        </>
      ))}
    </>
  );
};

export default AllProductsList;
