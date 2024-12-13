import React, { useState } from "react";
import axios from "axios";
import { Person } from "./types";

const App = () => {
  const [persons, setPersons] = useState<Person[]>([]); //db.json에서 가져온 Person 데이터들을 저장할 state
  const [newPerson, setNewPerson] = useState<Person>({ //초기 Person state
    id: 0,
    name: "",
    email: "",
    age: 0,
    city: "",
    sex: "male",
    favorite: "윈터",
    joinDate: ""
  });
  const [editPersonId, setEditPersonId] = useState<number | null>(null); //수정할 Person의 Id를 저장할 state

  const getPersons = async () => { //get요청하는 함수
    const response = await axios.get("http://localhost:3000/persons");//해당 주소에 get 요청을 보낸다
    setPersons(response.data); //응답으로 받은 Person 데이터들을 persons에 저장
  };

  const postPerson = async () => { //post 요청하는 함수
    const response = await axios.post("http://localhost:3000/persons", { //해당 주소에 newPerson의 정보와 함께 post 요청을 보낸다
      ...newPerson, //spread 문법으로 기존의 newPerson 객체를 펼침(불변성 지키기 위함)
      id: Math.floor(10000000 + Math.random() * 90000000), //8자리 랜덤 정수로 id 수정
      age: newPerson.age, //사용자로부터 입력받은 값으로 age 수정
      joinDate: new Date().toISOString().split("T")[0], //post 요청을 보내는 현재 시간으로 joinDate 수정
    });
    setNewPerson({ id: 0, name: "", email: "", age: 0, city: "", sex: "male", favorite: "윈터", joinDate: "" }); //newPerson 초기화
    getPersons(); //post 요청 보낸 데이터 확인하기 위해 getPerson으로 수정된 데이터 가져오기
  };

  const putPerson = async () => { //put 요청하는 함수
    if (editPersonId !== null) { //수정할 Id가 eidtPersonId에 저장되어 있다면
      await axios.put(`http://localhost:3000/persons/${editPersonId}`, newPerson); //해당 주소에 newPerson의 정보와 함께 put요청을 보낸다
      setNewPerson({ id: 0, name: "", email: "", age: 0, city: "", sex: "male", favorite: "윈터", joinDate: "" }); //newPerson 초기화
      setEditPersonId(null); //editPersonId의 값 null로 설정
      getPersons(); //put 요청 보낸 데이터 확인하기 위해 getPerson으로 수정된 데이터 가져오기
    }
  };

  const deletePerson = async (id: number) => { //delete 요청하는 함수
    await axios.delete(`http://localhost:3000/persons/${id}`); //해당 주소로 delete 요청을 보낸다
    getPersons(); //delete 요청 보낸 데이터 확인하기 위해 getPerson으로 수정된 데이터 가져오기
  };

  //수정 버튼을 눌렀다면 newPerson의 값을 해당 person 값으로 변경
  //patch는 리소스를 부분적으로 수정 가능하지만 put은 리소스를 전체 대체해야 하므로
  //수정할 값뿐만 아니라 나머지 데이터도 요청 본문에 포함시키기 위해 newPerson에 수정할 person의 값으로 전부 덮어씌우는 것임 
  const startEditing = (person: Person) => { 
    setNewPerson({ ...person });
    setEditPersonId(person.id);
  };

  return (
    <div>
      <h1>에스파 팬클럽 명단</h1>
      <div>
        <input type="text" placeholder="name" value={newPerson.name} onChange={(e) => setNewPerson({ ...newPerson, name: e.target.value })}/>
        <input type="email" placeholder="email" value={newPerson.email} onChange={(e) => setNewPerson({ ...newPerson, email: e.target.value })}/>
        <input type="number" placeholder="age" value={newPerson.age} onChange={(e) => setNewPerson({ ...newPerson, age: Number(e.target.value) })}/>
        <input type="text" placeholder="city" value={newPerson.city} onChange={(e) => setNewPerson({ ...newPerson, city: e.target.value })}/>
        <div>
          <label>
            <input type="radio" name="sex" value="male" checked={newPerson.sex === "male"} onChange={(e) => setNewPerson({ ...newPerson, sex: e.target.value })}/>
            남성
          </label>
          <label>
            <input type="radio" name="sex" value="female" checked={newPerson.sex === "female"} onChange={(e) => setNewPerson({ ...newPerson, sex: e.target.value })}/>
            여성
          </label>
        </div>
        <select value={newPerson.favorite} onChange={(e) => setNewPerson({ ...newPerson, favorite: e.target.value })}>
          <option value="윈터">윈터</option>
          <option value="카리나">카리나</option>
          <option value="닝닝">닝닝</option>
          <option value="지젤">지젤</option>
        </select>
        {editPersonId ? (
          <button onClick={putPerson}>put</button>
        ) : (
          <button onClick={postPerson}>post</button>
        )}
      </div>
      <button onClick={getPersons}>get</button>
      <ul>
        {persons.map(person => (
          <li key={person.id}>
            {person.name} ({person.sex}) - {person.age}세 - {person.favorite} - {person.email} - {person.city} - {person.joinDate}
            <button onClick={() => startEditing(person)}>수정</button>
            <button onClick={() => deletePerson(person.id)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
