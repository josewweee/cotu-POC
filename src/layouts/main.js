import styles from './main.module.css';
import Recorder from '../components/recorderButton/recorder';
import { submitSample, getSampleResults } from '../api/arCloud';
import { useState, memo, useEffect } from 'react';
import { videoIds } from '../data/ids';
import { getProducts, getProductTags } from '../api/products';
import { ProductsView } from '../components/productViews/productsView';
import WavesSpectogram from '../components/icons/WavesSpectogram';
import ResultHeader from '../components/resultHeader/ResultHeader';
import AllProductsList from '../components/allProductsList/AllProductsList';
import NavBar from '../components/navBar/NavBar';
import { NO_VIDEO, NO_PRODUCTS } from '../utils/constants';
import InformativeText from '../components/informativeText/InformativeText';

const MainLayout = () => {
  const [videoName, setVideoName] = useState('Nothing yet');
  const [videoResult, setVideoResult] = useState(null);
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [videoTags, setVideoTags] = useState([]);
  const [videoTime, setVideoTime] = useState(0);
  const [timeInterval, setTimeInterval] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [processingAudio, setProcessingAudio] = useState(false);
  const MemoAllProductsList = memo(AllProductsList);

  const getFile = async (file) => {
    clearInterval(timeInterval);
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
      setVideoName(sampleResults?.title ?? 'Not found');
      //get products and tags based on id
      if (sampleResults?.title && videoId != null) {
        videoTagsLocal = await getProductTags(videoId);
        console.dir(videoTagsLocal);
        setVideoTags(videoTagsLocal);
        products = await getProducts(videoId);
        setAllProducts(products);
        setProducts(products);
        //Create an array with all the timeFrames
        timeFrames = generateTimeFramesArray(products, videoTagsLocal);
        //initial time and timeout for increasing time
        let time = (sampleResults?.db_end_time_offset_ms ?? 0) / 1000;
        setVideoTime(time);
        if (timeFrames.length > 0) {
          setTimeInterval(
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
            }, 1000)
          );

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
        } else {
          setVideoResult(NO_PRODUCTS);
        }
      } else {
        setVideoResult(NO_VIDEO);
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
    if (products) {
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
    } else {
      return null;
    }
  }

  useEffect(() => {
    if (isRecording) {
      setProcessingAudio(true);
    }
  }, [isRecording]);

  useEffect(() => {
    if (isRecording) {
      setProcessingAudio(true);
    }
  }, [isRecording]);

  useEffect(() => {
    if (videoResult != null) {
      setProcessingAudio(false);
    }
  }, [videoResult]);

  return (
    <div className={styles.container}>
      <NavBar />
      <div className={styles.main}>
        {videoResult === null && processingAudio && (
          <div className={styles.waveSpectogram}>
            <WavesSpectogram />
          </div>
        )}
        {videoResult === NO_PRODUCTS && (
          <span className={styles.errorText}>
            Sorry, we did not find products associated with this video{' '}
          </span>
        )}
        {videoResult === NO_VIDEO && (
          <span className={styles.errorText}>
            Sorry, we did not find the video associated with this audio
          </span>
        )}
        {videoResult != null && videoResult.title != null && (
          <>
            <ResultHeader videoName={videoName} videoTime={videoTime} />
            <div className={styles.products}>
              <ProductsView data={products} />
            </div>
            <div className={styles.allProductsList}>
              <MemoAllProductsList data={allProducts} />
            </div>
          </>
        )}
        {processingAudio && <InformativeText />}
        <div onClick={() => !isRecording && setVideoResult(null)}>
          <Recorder
            returnFile={getFile}
            scanningFirstTime={
              videoResult === null ||
              videoResult === NO_VIDEO ||
              videoResult === NO_PRODUCTS
                ? true
                : false
            }
            recordingStatus={setIsRecording}
          />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
