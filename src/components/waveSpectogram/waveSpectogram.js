import Lottie from 'react-lottie';
import waveAnimation from '../../assets/animations/orangeWave.json';

export default function WaveSpectogram({ width, height }) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: waveAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div>
      <Lottie options={defaultOptions} height={height} width={width} />
    </div>
  );
}
