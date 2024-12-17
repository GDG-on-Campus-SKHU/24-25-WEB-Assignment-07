import axios from "axios";
import { useState } from "react";

// 인터페이스 정의 (Center 객체가 가져야하는 속성 및 타입)
interface Center {
  id: number; //아이디 (센터 식별용/숫자 타입)
  centerName: string; //센터이름 (문자열 타입)
  instaAccount: string; //인스타계정 (문자열 타입)
  centerLocation: string; //센터 위치(문자열 타입)
}

function App() {
  //각 배열의 초기값으로 빈 배열,문자열을 설정한다.
  const [data, setData] = useState<Center[]>([]); // data 상태 변수에 센터정보 저장(배열)
  const [name, setName] = useState<string>(""); // 문자열 변수에 센터 이름 저장
  const [instaAccount, setinstaAccount] = useState<string>("");
  const [centerLocation, setcenterLocation] = useState<string>("");
  const [id, setId] = useState<number | null>(null);

  // firstPost: GET요청 함수 (상태 업데이트)
  const firstGet = async () => {
    try {
      const response = await axios.get('http://localhost:3000/Center');
      if (response.status === 200) {
        //응답코드가 200(요청 성공)일 때만 처리
        console.log(response);
        console.log(response.data);
        // response.data가 배열이 맞는지 확인
        // 이때 respont.data는 서버로부터 받은 데이터이다.
        setData(response.data); // 데이터 구조가 배열이라면 그대로 사용
      }
    } catch (error) {
      // 요청이 실패하면 콘솔창에 errop 출력
      console.error(error);
    }
  };

  // firstPost: Post 요청 함수 (데이터 추가)
  const firstPost = async () => {
    try {
      const response = await axios.post('http://localhost:3000/Center', {
        centerName: name,
        instaAccount: instaAccount,
        centerLocation: centerLocation,
        id: id,
      });
      if (response.status === 201) {
        // 응답코드가 201일 때 요청 처리
        // firstGet()이 실행이 안되길래 상태코드를 202로 바꿔줌
        console.log(response.data);
        firstGet();
        // GET 함수도 호출하여 자동으로 최신 데이터를 유지시킴
      }
    } catch (error) {
      console.error(error);
      // 에러뜨면 콘솔창에 출력
      // ex. 네트워크 오류나 서버응답 실패(개발자도구에서 확인하기)
    }
  };

  // firstPut: Put 요청 함수 (데이터 전체 수정)
  const firstPut = async () => {

      // id가 없는 경우 알림창 표시
  if (!id) {
    alert("아이디를 입력하세요.");
    return;
  }

    if (!name || !instaAccount || !centerLocation) {
      alert("모든 필드를 입력하세요.");
      // 모든 필드가 채워지지 않았으면 알림창 출력
      return;
    }

    
    // try-catch 문
    try {
      const response = await axios.put(`http://localhost:3000/Center/${id}`, {
        // 계속 오류가 뜨던 부분
        // URL에서 백틱을 사용하여 id를 동적으로 포함시킴
        centerName: name,
        instaAccount: instaAccount,
        centerLocation: centerLocation,
      });
      if (response.status >= 200 && response.status < 300) {
        // 상태코드가 200이상 300미만이면 함수 처리
        // HTTP 프로토콜에서 표준적으로 정의된 규칙(클라이언트의 요청이 성공적으로 처리되었다는 뜻)
        console.log("수정 성공", response.data);
        firstGet();
        // GET 함수도 호출하여 자동으로 최신 데이터를 유지시킴
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Put과 Patch
  // https://www.notion.so/solnamu218/11-26-CRUD-14acab964f2c803a939ff66c3cd1aacb
  // 공부하면서 노션에 정리해놨습니다

  // firstDelete: Delete 요청 함수 (데이터 삭제)
  const firstDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:3000/Center/${id}`);
      // 해당 id 데이터를 삭제 요청을 보냄

      if (response.status === 200) {
        // 상태코드가 200일 때 삭제
        console.log(response.data);
        firstGet();
        //최신 목록 업데이트
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    // 더미서버로 연결
    <div>
      <div>
        <h2> 클라이밍 센터 </h2>
      </div>
      <ul>
        {data.map((Center) => (
          <li key={Center.id}>
            <p>업소명: {Center.centerName}</p>
            <p>인스타계정: {Center.instaAccount}</p>
            <p>위치: {Center.centerLocation}</p>
            <p>아이디: {Center.id}</p>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="업소명"
      />
      <input
        type="text"
        value={instaAccount}
        onChange={(e) => setinstaAccount(e.target.value)}
        placeholder="인스타계정"
      />
      <input
        type="text"
        value={centerLocation}
        onChange={(e) => setcenterLocation(e.target.value)}
        placeholder="위치"
      />
      <input
        type="text"
        value={id||''} //id가 null일 경우 빈문자열로 처리
        onChange={(e) => setId(Number(e.target.value))}
        placeholder="아이디"
      ></input>
      <br></br>

      <button onClick={firstGet}>조회</button>
      <button onClick={firstPost}>추가</button>
      <button onClick={firstDelete}>삭제</button>
      <button onClick={firstPut}>변경</button>
    </div>
  );
}

export default App;
