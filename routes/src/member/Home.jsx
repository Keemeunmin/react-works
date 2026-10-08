
import { useState } from 'react'

import chiikawa1 from '../assets/chiikawa.png'
import chiikawa2 from '../assets/chiikawa2.png'
import chiikawa3 from '../assets/chiikawa3.png'

function Home() {
  const images = [chiikawa1, chiikawa2, chiikawa3]

  const [imageIndex, setImageIndex] = useState(0)

  const changeImage = () => {
    setImageIndex((prev) => (prev + 1) % images.length)
  }

  return (
    <div className="home">
      <h1>로그인 성공! 🩷</h1>
      <p>우와와 우와 우와와 타쿠타쿠 챠오!</p>

      <img
        src={images[imageIndex]}
        alt="치이카와"
        className="chiikawa-img"
        onClick={changeImage}
      />

      <p className="image-guide">
        사진을 클릭해 보세요! 💗
      </p>
    </div>
  )
}

export default Home
