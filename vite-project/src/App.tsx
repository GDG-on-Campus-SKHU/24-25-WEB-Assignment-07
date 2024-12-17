import axios from "axios";
import { useState } from "react"; //useState 함수를 사용하기 위해서 react가 제공하는 내장함수를 사용해야한다.

// 야구선수로 지정
// 삼성라이온드 선수
// id: 타순
// name: 이름
// number: 등번호
// avg(average): 타율
// obp(on base perentage):출루율
// slg(slugging average): 장타율
// ops: abp + slg (출루율 + 장타율)

interface BaseballPlayer {
  id: number;
  name: string;
  number: number;
  game: number;
  avg: number;
  obp: number;
  slg: number;
  ops: number;
}

// 위에 주석을 달아서 따로 달지 않겠습니다.

// [data값, data를 변화시키는 값] 다음과 같이 구조를 분해해서 할당받는다.
// set~~에는 함수가 들어가게 된다.
function App() {
  // 상태 관리
  const [data, setData] = useState<BaseballPlayer[]>([]); // data는 BaseballPlayer(야구선수) 배열, 초기값은 빈 배열
  const [name, setName] = useState<string>(""); // name의 초기값 빈 문자열
  const [id, setId] = useState<number | null>(null); // id의 초기값은 null
  const [number, setNumber] = useState<number | null>(null); // number의 초기값은 null
  const [game, setGame] = useState<number | null>(null); // game의 초기값은 null
  const [avg, setAvg] = useState<number | null>(null); // avg의 초기값은 null
  const [obp, setObp] = useState<number | null>(null); // obp의 초기값은 null
  const [slg, setSlg] = useState<number | null>(null); // slg의 초기값은 null
  const [ops, setOps] = useState<number | null>(null); // ops의 초기값은 null

  // firstGet 함수 정의
  const firstGet = async () => {
    // async 키워드는 동기적인 함수를 비동기 함수로 변화시킨다.
    try {
      const response = await axios.get("http://localhost:3000/baseballplayer"); // await 키워드는 async키워드가 사용되었을 때 사용할 수 있으므로 뒤에 로컬을 받을 때까지 기다리는 역할을 한다.
      if (response.status === 200) {
        // 접근에 성공했을 때
        setData(response.data); // 성공했을 때  데이터를 상태에 저장
      }
    } catch (error) {
      // 200번대 데이터에 접근을 실패 했을 경우
      console.error("데이터를 가져오는 중 오류 발생:", error); // 다음 출력값을 콘솔로 찍는다.
    }
  };

  const firstPost = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/baseballplayer",
        {
          id,
          name,
          number,
          game,
          avg,
          obp,
          slg,
          ops,
        }
      );
      if (response.status === 200) {
        console.log(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  // 야구선수 김지찬 정보 수정하기
  const firstPut = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/baseballplayer/${id}`,
        // 백틱을 사용한 문자열에서 ${} 구문은 변수를 동적으로 삽입할 수 있게 도와준다.
        // 동적으로 삽입이 가능하다. ->  프로그램 실행 중에 변수나 값을 실시간으로 문자열에 삽입
        // 정적으로 삽입을 하는 경우 우리가 이전에 예제 코드로 사용했던 경우 ->"http://localhost:3000/baseballplayer/1" 다음과 같이 사용.
        {
          id: id,
          name: name,
          number: number,
          game: game,
          avg: avg,
          obp: obp,
          slg: slg,
          ops: ops,
        }
      );
      if (response.status === 200) {
        console.log(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  // 야구선수 김지찬 정보 삭제하기
  const firstDelete = async () => {
    try {
      const response = await axios.delete(
        "http://localhost:3000/baseballplayer/1"
      );
      if (response.status === 200) {
        console.log(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <h1>삼성 타순</h1>
      <button onClick={firstPost}>삼성 선수 등록하기</button>
      <div>
        <input
          type="number"
          placeholder="타순"
          onChange={(e) => setId(Number(e.target.value))}
          value={id || ""} // 초기값이 null 값이 들어오지 않으면 빈 문자열 , 아니면 숫자가 들어간다는 것을 알 수 있다.
        />
        <input
          type="text"
          placeholder="선수 이름"
          onChange={(e) => setName(e.target.value)}
          value={name} // 초기값이 null 값이 들어오지 않으면 빈 문자열 , 아니면 숫자가 들어간다는 것을 알 수 있다.
        />
        <input
          type="number"
          placeholder="등번호"
          onChange={(e) => setNumber(Number(e.target.value))}
          value={number || ""} // 초기값이 null 값이 들어오지 않으면 빈 문자열 , 아니면 숫자가 들어간다는 것을 알 수 있다.
        />
        <input
          type="number"
          placeholder="게임 수"
          onChange={(e) => setGame(Number(e.target.value))}
          value={game || ""} // 초기값이 null 값이 들어오지 않으면 빈 문자열 , 아니면 숫자가 들어간다는 것을 알 수 있다.
        />
        <input
          type="number"
          placeholder="타율"
          onChange={(e) => setAvg(Number(e.target.value))}
          value={avg || ""} // 초기값이 null 값이 들어오지 않으면 빈 문자열 , 아니면 숫자가 들어간다는 것을 알 수 있다.
        />
        <input
          type="number"
          placeholder="출루율"
          onChange={(e) => setObp(Number(e.target.value))}
          value={obp || ""} // 초기값이 null 값이 들어오지 않으면 빈 문자열 , 아니면 숫자가 들어간다는 것을 알 수 있다.
        />
        <input
          type="number"
          placeholder="장타율"
          onChange={(e) => setSlg(Number(e.target.value))}
          value={slg || ""} // 초기값이 null 값이 들어오지 않으면 빈 문자열 , 아니면 숫자가 들어간다는 것을 알 수 있다.
        />
        <input
          type="number"
          placeholder="ops"
          onChange={(e) => setOps(Number(e.target.value))}
          value={ops || ""} // 초기값이 null 값이 들어오지 않으면 빈 문자열 , 아니면 숫자가 들어간다는 것을 알 수 있다.
        />
      </div>
      <div>
        <button onClick={firstPut}>김지찬 정보 수정하기</button>
      </div>
      <div>
        <button onClick={firstDelete}>김지찬 정보 삭제하기</button>
      </div>
      <div>
        <button onClick={firstGet}>삼성 야구 선수 타순 불러오기</button>
      </div>

      <ul>
        {data.length > 0 ? (
          data.map((BaseballPlayer) => (
            <li key={BaseballPlayer.id}>
              <p>타순: {BaseballPlayer.id}</p>
              <p>이름: {BaseballPlayer.name}</p>
              <p>등번호: {BaseballPlayer.number}</p>
              <p>출전 경기 수: {BaseballPlayer.game}</p>
              <p>타율: {BaseballPlayer.avg}</p>
              <p>출루율: {BaseballPlayer.obp}</p>
              <p>장타율: {BaseballPlayer.slg}</p>
              <p>OPS: {BaseballPlayer.ops}</p>
            </li>
          ))
        ) : (
          <p>선수 정보가 없습니다.</p>
        )}
      </ul>
    </div>
  );
}

export default App;

/**
 * 이벤트 함수 기본구조
 * onClick={ () => {
 * 상태변수함수 set~~(~~)
 * } }
 */

/**
 * 조회: GET (서버로 부터 데이터를 취득) - 기존에 있는 코드 사용
 * 등록: POST (서버애 데이터를 추가, 작성) - 내가 원하는 선수를 넣는 걸 시도했다. 속성 값이 들어갈 인풋 박스를 만들어서 각 각 넣어주는 걸 택함
 * 삭제: DELETE (서버에 데이터를 삭제) - id를 추적해서 id는 타순으로 적용해 보았다. 아래타순분터 차례대로 지울 수 있도록 코드를 작성하였고 그 과정에서 gpt를 사용하였다. (코드를 추가하는 과정에서 실패)
 * 수정: PUT (서버의 데이터를 갱신, 작성) - 정보를 수정할 때 다 작성을 해줘야한다. (지정한 데이터를 전부 수정한다.)
 * 일부분 수정: PATCH (리소스의 일부분을 수정)
 *
 */

/*
e: 상태가 변했을 때 이벤트에 대한 내용이 출련된다
e.target: <input> : 현재 돔이 출력된다.
e.target.value: 현재 돔에 담긴 값이 출력된다.
*/

/**
 * onChange={(e) => setId(e.target.value)}
 * 'string'형식의 인수는 'SetStateAction<number[]>'  형식의 매개 변수를 할당될 수 없다
 * e.target.value가 string 타입으로 전달되어 타입이 불일치한 경우가 생겼다.
 * onChange={(e) => setId([Number(e.target.value)])}
 * 형변환을 시켜주었다.
 */
