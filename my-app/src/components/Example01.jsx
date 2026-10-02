// 외부 컴포넌트 생성 
// 조건부 렌더링 

const Example01 = () => {
    const isLoggedIn = true;

    let result = " ";
    if(isLoggedIn){
        result = "로그인 상태입니다.";
    }else{
        result = "로그아웃 상태입니다.";
    }
    

    return(
        <div>
            <h2>조건부 렌더링</h2>
            <p>{result}</p>
            { isLoggedIn ? 
            <p>로그인 상태입니다.</p> : 
            <p>로그아웃 상태입니다.</p>}
        </div>
    )
}


// 내보내기 
export default Example01;