import styles from './productsView.module.css';

export const ProductsView = ({ data }) => {
  return (
    <>
      {data?.map((prod) => (
        <>
          <div className={styles.container}>
            <img src={prod?.src} alt="Prod img" className={styles.image} />
            <span className={styles.title}>{prod?.name}</span>
            <span className={styles.subtitle}>{prod?.brand?.name}</span>
          </div>
        </>
      ))}
    </>
  );
};
