import axios from 'axios';
import mock from '../utils/mockDecorator';

const URL = 'https://api-v2.acrcloud.com/api';
const CONTAINER_ID = process.env.REACT_APP_CONTAINER_ID;
const config = {
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_ARC_CLOUD_BEARER}`,
  },
};
const USE_MOCK = false;

// @mock('submitSample', true)
export const submitSample = async (file) => {
  if (USE_MOCK) {
    return { data: { id: '7788' } };
  } else {
    let bodyFormData = new FormData();
    bodyFormData.append('data_type', 'audio');
    bodyFormData.append('file', file);
    const result = await axios.post(
      `${URL}/fs-containers/${CONTAINER_ID}/files`,
      bodyFormData,
      config
    );
    return result.data;
  }
};

// @mock('getSampleResults', true)
export const getSampleResults = async (sampleId) => {
  if (USE_MOCK) {
    return {
      title: 'lhotse',
      db_end_time_offset_ms: 10000,
    };
  } else {
    const result = await axios.get(
      `${URL}/fs-containers/${CONTAINER_ID}/files/${sampleId}`,
      config
    );
    return result?.data?.data?.[0]?.results?.custom_files?.[0]?.result;
  }
};
