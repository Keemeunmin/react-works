import { Link } from 'react-router-dom'

function Board() {
  return (
    <div className="home">
      <h1>게시판 💗</h1>
      <p>보고 싶은 게시글을 선택하세요!</p>

      <div className="board-list">
        <Link to="/board/1">1번 글 - 치이카와 소개</Link>
        <Link to="/board/2">2번 글 - 오늘의 치이카와</Link>
        <Link to="/board/3">3번 글 - 치이카와와 친구들</Link>
      </div>
    </div>
  )
}

export default Board