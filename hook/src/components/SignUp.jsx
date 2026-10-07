import { useState } from "react";

const SignUp = () => {
    const [formData, setFormData] = useState({
        name: "",
        job: "회사원",
        gender: "male",
        memo: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("제출 데이터:", formData);

        setFormData({
            name: "",
            job: "회사원",
            gender: "male",
            memo: ""
        });
    };

    return (
        <div className="sign-up">
            <h2>회원 가입</h2>

            <form onSubmit={handleSubmit}>
                <ul>
                    <li>
                        <label>이름</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                    </li>

                    <li>
                        <label>직업</label>
                        <select
                            name="job"
                            value={formData.job}
                            onChange={handleInputChange}
                        >
                            <option value="employee">회사원</option>
                            <option value="student">학생</option>
                            <option value="freelancer">프리랜서</option>
                        </select>
                    </li>

                    <li>
                        <label>성별</label>

                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="male"
                                checked={formData.gender === "male"}
                                onChange={handleInputChange}
                            />
                            남자
                        </label>

                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="female"
                                checked={formData.gender === "female"}
                                onChange={handleInputChange}
                            />
                            여자
                        </label>
                    </li>

                    <li>
                        <label>자기소개</label>
                        <textarea
                            name="memo"
                            rows={5}
                            cols={20}
                            value={formData.memo}
                            onChange={handleInputChange}
                        />
                    </li>

                    <li>
                        <button type="submit">가입</button>
                    </li>
                </ul>
            </form>
        </div>
    );
};

export default SignUp;