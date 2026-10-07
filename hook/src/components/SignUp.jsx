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

  return (
    <div>
      <h2>회원 가입</h2>

      <div>
        <label>이름</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </div>

      <div>
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
      </div>

      <div>
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
      </div>

      <div>
        <label>자기소개</label>
        <textarea
          name="memo"
          rows={5}
          cols={20}
          value={formData.memo}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default SignUp;