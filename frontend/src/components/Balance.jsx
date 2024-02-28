import React, { useEffect, useState } from "react";

export function Balance() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/account/balance', {
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
  }, []);

  return (
    <div className="bg-blue-500 p-4 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Account Balance</h2>
      <p className="text-3xl">{userData ? `$${userData.balance.toFixed(2)}` : "Loading..."}</p>
    </div>
  );
}
