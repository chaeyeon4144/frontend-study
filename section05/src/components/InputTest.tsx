const InputTest = () => {
  return (
    <div>
      <h3>1. text</h3>
      <input type="text" placeholder="이름 입력" />
      <h3>2. password</h3>
      <input type="password" placeholder="●●● 로 가려짐" />
      <h3>3. number</h3>
      <input type="number" placeholder="숫자만" />
      <h3>4. date</h3>
      <input type="date" />
      <h3>5. checkbox (여러 개 가능)</h3>
      <label>
        <input type="checkbox" />
        사과
      </label>
      <label>
        <input type="checkbox" />
        바나나
      </label>
      {/* <h3>5-2. checkbox (여러개 가능 - for , id 로 엮기)</h3> 
      
      <label for="strawbarry">딸기</label>
      <input type="checkbox id="strawbarry" />
      <label for="kiwi">키위</label>
      <input type="checkbox" id="kiwi" /> */}
      <h3>5-2. checkbox (label + for (글자 클릭 → 포커스))</h3>
      <label htmlFor="strawbarry">딸기</label>
      <input type="checkbox" id="strawbarry" />
      <label htmlFor="kiwi">키위</label>
      <input type="checkbox" id="kiwi" />
      {/* 다시 한번  */}
      <h3> 8. label + for (글자 클릭 하면 포커스)</h3>
      <label htmlFor="myId">여기 클릭해봐</label>
      <input id="myId" />
      <h3>radio (name 같으면 하나만) - for and id</h3>
      <label htmlFor="man">남</label>
      <input type="radio" name="gender" id="man" />
      <label htmlFor="woman">여</label>
      <input type="radio" name="gender" id="woman" />

      <h3>radio (name 같으면 하나만)</h3>
      <label>
        <input type="radio" name="gender" />남
      </label>

      <label>
        <input type="radio" name="gender" />여
      </label>
      <h3>disabled (잠김)</h3>
      <input type="text" value="못 고침" disabled />
      <h3>9. select</h3>
      {/*  select 의 name 은 폼 제풀 (form submit 할 때 이필 이름 용도 리액트에선 잘 아씀 보통 vlaue + onChange 로 값을 관리하니까) */}
      {/* 여기서 id 는 라벨과 연결 */}
      <label htmlFor="country">국적</label>
      <select name="" id="country">
        <option value="">선택</option>
        <option value="ko">한국</option>
        <option value="us">미국</option>
        <option value="jp">일본</option>
      </select>
      <h3>10. textarea</h3>
      <textarea placeholder="여러 줄 입력" />
    </div>
  );
};
export default InputTest;
