import React, { useState, useEffect, useMemo, useRef} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { reactMembers, javaMembers, editInfo } from './Recoil';



function Home() {
  const [reactMember, setReactMember] = useRecoilState(reactMembers);
  const [javaMember, setJavaMember] = useRecoilState(javaMembers);
  const [info, setInfo] = useRecoilState(editInfo);

  let navigate = useNavigate();
  const Member = (props) => {
    const { name, age, handleTransfer, handleEdit, handleDelete } = props;
    return (
      <div>
        <div>
          {" "}
          name: {name}, age: {age}
        </div>
        <button onClick={() => handleTransfer()}>Transfer</button>
        <button onClick={() => handleEdit()}>Edit</button>
        <button onClick={() => handleDelete()}>Delete</button>
      </div>
    );
  };

  useEffect(() => {
    if (reactMember.length === 0) {
      alert("Warning: react class is empty now");
    } else if (javaMember.length === 0) {
      alert("Warning: java class is empty now");
    }
  }, [reactMember.length, javaMember.length]);

  const TransferReactToJava = (index) => {
    const e1 = reactMembers[index];
    reactMember.splice(index, 1);
    javaMember.push(e1);
    setReactMember([...reactMember]);
    setJavaMember([...javaMember]);
  };

  const TransferJavaToReact = (index) => {
    const e1 = javaMembers[index];
    javaMember.splice(index, 1);
    reactMember.push(e1);
    setReactMember([...javaMember]);
    setJavaMember([...reactMember]);
  };


  const [searchUsers, setSearchUsers] = useState("");

  const sort = {
    no: 0,
    up: 1,
    down: 2,
  };


  const getUsers = (list) => {
    let res = [...list];
 
    if (searchUsers) {
      res = res.filter((e1) => e1.name.includes(searchUsers));
    }
  
    if (sortType !== sort.no) {
      res.sort((a, b) => {
        if (sortType === sort.up) return parseInt(a.age) - parseInt(b.age);
        else return parseInt(b.age) - parseInt(a.age);
      });
    }
    return res;
  };
  const [sortType, setSortType] = useState(sort.no);

  const getSortType = () => {
    return sortType === 0 ? "no" : sortType === 1 ? "up" : "down";
  };
  
  const handleSort = () => {
    return sortType === 0
      ? setSortType(sort.up)
      : sortType === 1
        ? setSortType(sort.down)
        : setSortType(sort.no);
  };

  const refInputFocus =useRef();

  const reactEdit = (index) => {
    setInfo({
      name: reactMember[index].name,
      age: reactMember[index].age,
      type: 'react',
      index
    })
    refInputFocus.current.focus();
    navigate("/edit")
  };
  const javaEdit = (index) => {
    setInfo({
      name: javaMember[index].name,
      age: javaMember[index].age,
      type: 'java',
      index
    })
    refInputFocus.current.focus();
    navigate("/edit")
  }



  const reactDelete = (index) => {
    reactMembers.splice(index, 1);
    setReactMember([...reactMembers])
  }
  
  const javaDelete = (index) => {
    javaMembers.splice(index, 1);
    setJavaMember([...javaMembers])
  }

  const ReactUsersToRender = useMemo(() => getUsers(reactMember),[reactMember])
  const JavaUsersToRender = useMemo(() => getUsers(javaMember),[javaMember])
  return (
    <div className="container">
      <h2>search by name</h2>
      <div>
        Search by name:{" "}
        <input value={searchUsers} onChange={(e) => setSearchUsers(e.target.value)}/>
      </div>
      <h2>sort by age: </h2>
      <button type="button" onClick={() => handleSort()}>
        Sort: {getSortType()}
      </button>
      <div className="head">List members of React class</div> <br />
      <div>
        {reactMember.length > 0 ? ReactUsersToRender.map((user, index) => {
            return (
              <div className="list react-class">
                <Member key={index} name={user.name} age={user.age}
                  handleTransfer={() => TransferReactToJava(index)}
                  handleEdit={() => reactEdit(index)}
                  handleDelete={() => reactDelete(index)}
                />
              </div>
            );
          })
          : "empty class"}
      </div>
      <br />
      <div className="head">List members of Java class</div> <br />
      <div>
        {javaMember.length > 0 ? JavaUsersToRender.map((user, index) => {
            return (
              <div className="list java-class">
                <Member key={index} name={user.name} age={user.age}
                  handleTransfer={() => TransferJavaToReact(index)}
                  handleEdit={() => javaEdit(index)}
                  handleDelete={() => javaDelete(index)}
                />
              </div>
            );
          })
          : "empty class"}
      </div>
      <br />
      <Link to="/add">Go to form add page</Link>
    </div>
  );
}

export default Home;