import { useEffect } from 'react'

const Page = () => {
  useEffect(() => {
    console.log('페이지 로딩...')
  }, [])

  return <h2>페이지</h2>
}

export default Page