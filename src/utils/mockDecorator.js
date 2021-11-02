import products from '../data/products.json';
import tags from '../data/tags.json';

export default function mock(type, active) {
  return function decorator(t, n, descriptor) {
    const original = descriptor.value;
    if (typeof original === 'function' && active === true) {
      // descriptor.value = function (...args) {
      switch (type) {
        case 'submitSample':
          return { data: { id: '7788' } };
        case 'getSampleResults':
          return {
            title: 'lhotse',
            db_end_time_offset_ms: 10000,
          };
        case 'getProducts':
          return products.data;
        case 'getProductTags':
          const PRODUCTS_SLOT = 2;
          return tags[PRODUCTS_SLOT];
        default:
          break;
      }
      /* try {
          const result = original.apply(this, args);
          console.log(`Result from ${name}: ${result}`);
          return result;
        } catch (e) {
          console.log(`Error from ${name}: ${e}`);
          throw e;
        } */
      // };
    }
    // return descriptor;
  };
}
