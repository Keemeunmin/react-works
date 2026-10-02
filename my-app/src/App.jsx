import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Example01 from './components/Example01'
import Example02 from './components/Example02'

function MyButton(){
  return(
    <button>목록보기</button>
  )

}

function App() {
  const season = "가을";

  return (
    <div>
      <h2>리엑트 시작하기</h2>
      <h3 className = "welcome">홈페이지 방문을 환영합니다.</h3>
      <section>
        {/* <p>현재 계절은 {season}입니다.</p>
        <img 
        src={heroImg}
        alt="메인이미지"
        width={250}
        />
      <MyButton/> */}
      {/* <Example01 /> */}
      <Example02 />
      </section>
    </div>
  )
}

export default App
