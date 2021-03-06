import products from '../data/products.json';
import tempProducts from '../data/tempProducts.json';
import tags from '../data/tags.json';
import axios from 'axios';

const COTU_URL = 'https://preproduction.cotu.tv/api/v1';
const config = {
  headers: { Authorization: `Bearer ${process.env.REACT_APP_COTU_BEARER}` },
};
const USE_MOCK = false;
const TEMP_PRODUCTS = false;

export const getProducts = async (id) => {
  if (USE_MOCK) {
    return TEMP_PRODUCTS ? tempProducts.data : products.data;
  } else {
    const response = await axios.get(
      `${COTU_URL}/videos/${id}/products`,
      config
    );
    console.log(response.data.data);
    return response.data.data;
  }
};

export const getProductTags = async (id) => {
  const PRODUCTS_SLOT = 2;
  if (USE_MOCK) {
    return tags[PRODUCTS_SLOT];
  } else {
    const response = await axios.get(`${COTU_URL}/videos/${id}/tags`, config);
    console.log(response.data.data);
    return response.data.data[PRODUCTS_SLOT];
  }
};
