import products from '../data/products.json';
import tags from '../data/tags.json';
import axios from 'axios';

const COTU_URL = 'https://preproduction.cotu.tv/api/v1';
const config = {
  headers: { Authorization: `Bearer ${process.env.REACT_APP_COTU_BEARER}` },
};
export const getProducts = async (id) => {
  const response = await axios.get(`${COTU_URL}/videos/${id}/products`, config);
  console.log(response.data.data);
  return response.data.data;
  // return products.data;
};

export const getProductTags = async (id) => {
  const PRODUCTS_SLOT = 2;
  const response = await axios.get(`${COTU_URL}/videos/${id}/tags`, config);
  console.log(response.data.data);
  return response.data.data[PRODUCTS_SLOT];
  // return tags[PRODUCTS_SLOT];
};
//
