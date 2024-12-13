import { useState } from "react";
import style from "./App.module.less";
import axios from "axios";

interface Hobby {
  // Hobby 데이터의 타입 정의
  name: string;
  id: number;
  age: number;
  hobby: string;
  phoneNumber: string;
  email: string;
  withMe: string;
}

function App() {
  // 상태 선언: 취미 정보, 사용자 입력값을 관리하는 상태들
  const [hobbys, setHobbys] = useState<Hobby[]>([]); // db.json에서 가져온 취미 정보 저장
  const [name, setName] = useState<string>(""); // 이름 상태
  const [id, setId] = useState<number>(0); // ID 상태
  const [age, setAge] = useState<number>(0); // 나이 상태
  const [hobby, setHobby] = useState<string>(""); // 취미 상태
  const [phoneNumber, setPhoneNumber] = useState<string>(""); // 전화번호 상태
  const [email, setEmail] = useState<string>(""); // 이메일 상태
  const [withMe, setWithMe] = useState<string>(""); // 같이 즐길 사람 상태

  // 취미 정보를 서버에서 가져오는 비동기 함수
  const getHobby = async () => {
    try {
      const response = await axios.get("http://localhost:3000/Hobby"); // Hobby 데이터를 GET 요청으로 가져옴
      if (response.status === 200) {
        // 요청이 성공했으면
        console.log(response.data); // 가져온 데이터 콘솔에 출력
        setHobbys(response.data); // 상태에 데이터 저장
      }
    } catch (error) {
      // 오류가 발생한 경우
      console.error(error); // 오류 메시지 콘솔에 출력
    }
  };

  // 새로운 취미 데이터를 서버에 추가하는 함수
  const postHobby = async () => {
    try {
      const response = await axios.post("http://localhost:3000/Hobby", {
        // POST 요청으로 새로운 취미 데이터 전송
        name: name,
        id: id,
        age: age,
        hobby: hobby,
        phoneNumber: phoneNumber,
        email: email,
        withMe: withMe,
      });
      if (response.status === 200) {
        // 요청이 성공했으면
        console.log(response.data); // 응답 데이터 콘솔에 출력
      }
    } catch (error) {
      // 오류가 발생한 경우
      console.error(error); // 오류 메시지 콘솔에 출력
    }
  };

  // 특정 취미 데이터를 수정하는 함수
  const putHobby = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/Hobby/${id}`, {
        // PUT 요청으로 특정 ID의 데이터를 수정
        name: name,
        id: id,
        age: age,
        hobby: hobby,
        phoneNumber: phoneNumber,
        email: email,
        withMe: withMe,
      });
      if (response.status === 200) {
        // 요청이 성공했으면
        console.log(response.data); // 개발자 도구 콘솔에 출력
      }
    } catch (error) {
      // 오류가 발생한 경우
      console.error(error); // 오류 메시지를 개발자 도구 콘솔에 출력
    }
  };

  // 특정 취미 데이터를 삭제하는 함수
  const deleteHobby = async () => {
    try {
      const response = await axios.delete(`http://localhost:3000/Hobby/${id}`); // DELETE 요청으로 특정 ID의 데이터 삭제
      if (response.status === 200) {
        // 요청이 성공했으면
        console.log(response.data); // 응답 데이터 콘솔에 출력
      }
    } catch (error) {
      // 오류가 발생한 경우
      console.error(error); // 오류 메시지 콘솔에 출력
    }
  };

  return (
    <>
      <div className={style.container}>
        // 전체 컨테이너 div //
        <div className={style.header}>
          <button onClick={getHobby}>업데이트</button>
        </div>
        <div className={style.body}>
          <div className={style.left}>
            <ul>
              {hobbys.map((hobby) => (
                <li key={hobby.id}>
                  <p>Name: {hobby.name}</p>
                  <p>Age: {hobby.age}</p>
                  <p>Hobby: {hobby.hobby}</p>
                  <p>Phone: {hobby.phoneNumber}</p>
                  <p>Email: {hobby.email}</p>
                  <p>With Me: {hobby.withMe}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className={style.right}>
            <input
              type="number"
              value={id}
              onChange={(e) => setId(Number(e.target.value))} // ID 값 변경 시 setId 함수 실행
              placeholder="ID를 입력하세요!"
            />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)} // 이름 값 변경 시 setName 함수 실행
              placeholder="이름을 입력하세요!"
            />
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))} // 나이 값 변경 시 setAge 함수 실행
              placeholder="나이를 입력하세요!"
            />
            <input
              type="text"
              value={hobby}
              onChange={(e) => setHobby(e.target.value)} // 취미 값 변경 시 setHobby 함수 실행
              placeholder="취미를 입력하세요!"
            />
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // 이메일 값 변경 시 setEmail 함수 실행
              placeholder="이메일을 입력하세요!"
            />
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)} // 전화번호 값 변경 시 setPhoneNumber 함수 실행
              placeholder="전화번호를 입력하세요!"
            />
            <input
              type="text"
              value={withMe}
              onChange={(e) => setWithMe(e.target.value)} // 같이 즐길 사람 값 변경 시 setWithMe 함수 실행
              placeholder="같이 즐길 사람을 구할 건가요? ( O / X )"
            />
            <button onClick={postHobby}>추가</button>
            <button onClick={putHobby}>수정</button>
            <button onClick={deleteHobby}>삭제</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App; // App 컴포넌트를 export
