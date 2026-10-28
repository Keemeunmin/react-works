import { useState } from 'react'

const LikeButton = () => {
  const [count, setCount] = useState(0)

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        좋아요 {count}
      </button>
    </div>
  )
}

export default LikeButton
