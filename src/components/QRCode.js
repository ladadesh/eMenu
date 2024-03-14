import { useSpring, animated } from 'react-spring';

const QRCode = () => {

const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    loop: { reverse: true },
    config: { duration: 2000 },
    });


  return (
    <div className="construction-container">
      <animated.div style={fadeIn} className="logo">
        <span role="img" aria-label="construction">
          🚧
        </span>
      </animated.div>
      <h1>QR Code Under Construction</h1>
      <p>We're working hard to bring you a better experience. Please check back soon!</p>
    </div>
  )
}
export default QRCode