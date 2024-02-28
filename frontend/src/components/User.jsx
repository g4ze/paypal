import React, { useEffect, useState } from 'react';
import { Balance } from './Balance';
import { useNavigate } from 'react-router-dom';
import { Button } from './Button';
import { Appbar } from './Appbar';
import Modal from 'react-modal';
import { Transfer } from '../pages/Transfer';
import { Link } from 'react-router-dom';
export function User() {
  const [userData, setUserData] = useState(null);
  const navigate=useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [update, setUpdate] = useState(1.222); // Key for forceUpdate
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/user', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error during fetch:', error);
      }
    };

    fetchUserData();
  }, []); // Empty dependency array to run the effect only once

  return (
    
    <div className="bg-blue-500 p-4 w-full h-full md:w-1/2 mx-auto rounded-lg sm:h-auto">
      <div className="flex flex-col justify-center h-full sm:flex-none">
        <Appbar /> {/* Add the "rounded-lg" class for curved edges */}
        {userData ? (
          <h1 className="text-white text-2xl font-bold my-3">
            Hello, {userData.firstName}!
          </h1>
        ) : (
          <p>Hello!</p>
        )}
        <Balance key={update}/>
        <Button
          label="Transfer"
          onClick={() => {
            setModalOpen(true);
          }}
        />
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setModalOpen(false)}
        contentLabel='Transfer Success'
        className="bg-white p-8  mx-auto mt-20 rounded-lg shadow-lg md:w-1/4"
      >
        <Link to={''} onClick={()=>{
                setModalOpen(false);
            }
            }>x</Link>
        <Transfer setUpdate={setUpdate}/>
        
      </Modal>
    </div>
  );
}
