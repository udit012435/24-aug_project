import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';

export const Home = () => {
  const location = useLocation();
  const user = location.state?.user;
  
  const [activity, setActivity] = useState("");
  const [listData, setListData] = useState(getLocalItems());
  const navigate = useNavigate();

  const handleLogout = ()=>{
    axios.post("http://localhost:3001/logout", {withCredentials: true})
    .then(response=>{
      if(response.status===200){
        navigate("/");
      }
    })
    .catch(error=>{
      console.log("Error in logout ", error)
    })
  }

  function addActivity() {
    setListData((listData) => {
      const updateList = [...listData, activity];
      setActivity('');
      return updateList;
    });
  }

  function editActivity(index) {
    const newActivity = window.prompt("Edit activity:", listData[index]);
    if (newActivity !== null && newActivity.trim() !== "") {
      const updatedList = listData.map((item, i) =>
        i === index ? newActivity : item
      );
      setListData(updatedList);
    }
  }

  function removeActivity(i) {
    const updateListData = listData.filter((elem, id) => id !== i);
    setListData(updateListData);
  }

  function removeAll() {
    setListData([]);
  }

  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(listData));
  }, [listData]);

  function getLocalItems() {
    let list = localStorage.getItem('lists');
    if (list) {
      return JSON.parse(list);
    } else {
      return [];
    }
  }

  return (
    <>
      <div className='container-fluid'>
        <h1>Welcome {user?.name}, MERN stack Developer <span><button className='btn btn-danger' onClick={handleLogout}>Logout</button></span></h1>
      </div>
      
      <div className="container">
        <div className="card shadow mt-5">
          <div className="card-body" style={{ backgroundColor: "#87CEEB" }}>
            <div className="card-title text-center">
              <h1>Add Student</h1>
            </div>
            <div className="card-text text-center">
              <input
                type="text"
                className="py-1 px-2"
                placeholder="Add Student"
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
              />
              <button
                className="btn btn-success m-2 px-4 py-1"
                style={{ fontSize: '1rem' }}
                onClick={addActivity}
              >
                Add
              </button>
            </div>
            <div className="card">
              <div className="card-body">
                <div className="card-title m-3 text-start">
                  <h3>Here is your student list</h3>
                </div>
                <div className="card-text text-start">
                  {listData.length > 0 && listData.map((data, i) => (
                    <div key={i} className="card-text m-3 py-1" style={{ backgroundColor: '#D3D3D3' }}>
                      <div className="row">
                        <div className="col-md-8 px-4" style={{ fontSize: '1.3rem' }}>{data}</div>
                        <div className="col-md-4 text-end">
                          <button
                            className="btn px-2 mx-1"
                            style={{ fontSize: "0.8rem", borderRadius: "0px" }}
                            onClick={() => editActivity(i)}
                          >
                            <FaEdit size={22} />
                          </button>
                          <button
                            className="btn px-2 mx-1"
                            style={{ fontSize: '0.8rem', borderRadius: '0px' }}
                            onClick={() => removeActivity(i)}
                          >
                            <FaTrash size={22} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="card-text text-center">
                    {listData.length >= 1 && (
                      <button
                        className="btn btn-primary px-4 py-1"
                        style={{ fontSize: '0.8rem' }}
                        onClick={removeAll}
                      >
                        Clear All
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
