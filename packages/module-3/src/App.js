import React, { useState, useEffect }  from 'react';
import { getMaxKNum } from './components/getKthNum';
import './App.css';

const countAll = 10;
function App() {
  const [arr, setArr] = useState([]);
  const [kth, setKth] = useState(1);
  const [kNum, setKNum] = useState(null);

  useEffect(() => {
    createArray();
  }, []);

  useEffect(() => {
    if (arr && arr.length) {
      const num = getMaxKNum(arr,kth);
      console.log(num);
      setKNum(num);
    }
   
  }, [arr, kth]);
  
  function createArray () {
    const arr = [];
    for (let i = countAll; i--;) {
      arr.push(Math.floor(Math.random() * 100));
    }
    setArr(arr);
  }

  function onSetKNum(event) {
    setKth(event.target.value);
  }

  return (
    <div className="arraySort">
      <h3>获取数组中第K大值DEMO</h3>
      <div className="optionWrap">
        <div className="btn" onClick={createArray}>重新生成数组</div>
        <div>
          <span>设置第K的序号值:</span>
          <select onChange={onSetKNum}>
            {
              arr && arr.length ? (
                arr.map((ele, index) => (
                  <option key={index} value={index + 1}>{index + 1}</option>
                ))
              ) : (
                <option value ="0">0</option>
              )
            }
          </select>
        </div>
      </div>
      <div>{ `数组值为： ${arr.toString()}`}</div>
      <div className="numShow">{`第 ${kth} 的 数为: ${kNum !== null ? kNum : ''}`}</div>
  </div>
  );
}

export default App;
