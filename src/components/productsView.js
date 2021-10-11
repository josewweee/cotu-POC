import styles from './productsView.module.css';

export const ProductsView = ({ data }) => {
  console.log(data);
  return (
    <>
      {data?.map((prod) => (
        <>
          <div className={styles.video}>
            <img src={prod?.src} alt="Prod img" className={styles.image} />
            <h2>{prod?.name}</h2>
            <h2>{prod?.brand?.name}</h2>
          </div>
        </>
      ))}
    </>
  );
};
