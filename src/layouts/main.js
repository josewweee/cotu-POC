import styles from './main.module.css';
import Recorder from '../components/recorder';
import Video from '../components/video';
import { submitSample, getSampleResults } from '../api/arCloud';
import { useEffect, useState } from 'react';
import { videoIds } from '../data/ids';
import { getProducts, getProductTags } from '../api/products';
import { ProductsView } from '../components/productsView';

const MainLayout = () => {
  const [fileId, setFileId] = useState(null);
  const [videoName, setVideoName] = useState('Nothing yet');
  const [videoResult, setVideoResult] = useState(null);
  const [products, setProducts] = useState([]);
  const [videoTags, setVideoTags] = useState([]);
  const [videoTime, setVideoTime] = useState(0);

  const getFile = async (file) => {
    const fileId = await submitSample(file);
    setVideoName('Loading...');
    setTimeout(async () => {
      let videoTagsLocal;
      let products;
      let timeFrames;
      // results
      const sampleResults = await getSampleResults(fileId.data.id);
      setVideoResult(sampleResults);
      //get id
      const videoId = videoIds[sampleResults?.title];
      setVideoName(videoId ?? 'Not found');

      //get products and tags based on id
      if (videoId !== 'Not found' && videoId != null) {
        videoTagsLocal = await getProductTags(videoId);
        console.dir(videoTagsLocal);
        setVideoTags(videoTagsLocal);
        products = await getProducts(videoId);
        //Create an array with all the timeFrames
        timeFrames = generateTimeFramesArray(products, videoTagsLocal);
      }

      //initial time and timeout for increasing time
      let time = (sampleResults?.db_end_time_offset_ms ?? 0) / 1000;
      setVideoTime(time);
      if (timeFrames) {
        setInterval(() => {
          time += 1;
          setVideoTime(time);
          // return an array with the ids
          const timeFramesInRange = timeFrames.map((frame) => {
            if (frame.time <= time && time <= frame.time + frame.duration) {
              return frame.id;
            }
          });
          setProducts(
            products.filter((product) => {
              if (timeFramesInRange.includes(Number(product.id)))
                return product;
            })
          );
        }, 1000);

        //initial products
        const timeFramesInRange = timeFrames.map((frame) => {
          if (frame.time <= time && time <= frame.time + frame.duration) {
            return frame.id;
          }
        });
        setProducts(
          products.filter((product) => {
            if (timeFramesInRange.includes(product.id)) return product;
          })
        );
      }
    }, 1000);
  };

  function generateTagsMap(tags) {
    let tagsMap = new Map();
    Object.values(tags)?.map((tag) => {
      tagsMap.set(Number(tag.id), [tag]);
    });
    return tagsMap;
  }

  function generateTimeFramesArray(products, tags) {
    // Create a map with all the tags, key = tag/product id
    const tagsMap = generateTagsMap(tags);
    let timeFramesArray = [];
    // return 1 array with all timeFrames
    for (let product of Object.values(products)) {
      tagsMap.get(Number(product.id))?.[0]?.timeFrames?.map((frame) => {
        timeFramesArray.push({
          id: Number(product.id),
          time: frame?.start || -1,
          duration: frame?.end || 0,
        });
      });
    }
    return timeFramesArray;
  }

  return (
    <div className={styles.main}>
      <Recorder returnFile={getFile} />
      <Video name={videoName} />
      <span>{`${videoTime} Seconds`}</span>
      <ProductsView data={products} />
      <button onClick={() => getProducts('7788')}>get products 7788</button>
      <button onClick={() => getProductTags('7788')}>get tags tags 7788</button>
    </div>
  );
};

export default MainLayout;
