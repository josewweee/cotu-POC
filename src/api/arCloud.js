import axios from 'axios';

const URL = 'https://api-v2.acrcloud.com/api';
const CONTAINER_ID = process.env.REACT_APP_CONTAINER_ID;
const config = {
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_ARC_CLOUD_BEARER}`,
  },
};
export const submitSample = async (file) => {
  let bodyFormData = new FormData();
  bodyFormData.append('data_type', 'audio');
  bodyFormData.append('file', file);
  const result = await axios.post(
    `${URL}/fs-containers/${CONTAINER_ID}/files`,
    bodyFormData,
    config
  );
  return result.data;
  // return { data: { id: '7788' } };
};

export const getSampleResults = async (sampleId) => {
  const result = await axios.get(
    `${URL}/fs-containers/${CONTAINER_ID}/files/${sampleId}`,
    config
  );
  return result?.data?.data?.[0]?.results?.custom_files?.[0]?.result;
  /* return {
    title: 'lhotse',
    db_end_time_offset_ms: 10000,
  }; */
};
