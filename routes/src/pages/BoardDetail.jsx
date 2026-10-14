import { Link, useParams } from 'react-router-dom'

function BoardDetail() {
  const { id } = useParams()

  return (
    <div className="home">
      <h1>게시글 상세 💕</h1>
      <p>{id}번 게시글입니다.</p>

      <Link to="/board">게시판으로 돌아가기</Link>
    </div>
  )
}

export default BoardDetail