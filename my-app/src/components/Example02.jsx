// 리스트 렌더링 

const Example02 = () => {
    const items = ["사과", "바나나", "딸기"];

    return (
        <div>
            <h2>리스트 렌더링</h2>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    )
}

export default Example02;