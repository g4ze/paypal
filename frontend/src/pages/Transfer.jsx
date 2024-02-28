import {Field} from '../components/Field'
import React, {useState} from 'react';
import  {Button} from '../components/Button'
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { Appbar } from '../components/Appbar';
import { Balance } from '../components/Balance';
 export function Transfer({setUpdate}){
    const [to, setTo]=useState('');
    const [amount, setAmount]=useState('');
    const [isModalOpen, setModalOpen] = useState(false);
    const navigate=useNavigate();
    const [forceUpdateKey, setForceUpdateKey] = useState(0); // Key for forceUpdate
    const forceUpdate = () => setForceUpdateKey((prevKey) => prevKey + 1);


    // should be a small car cantaining fields for to and amaount
    return <div className="flex justify-center items-center  ">
       
        <form>
            <Appbar />
            <Balance key={forceUpdateKey}/>
            <Field label='To' placeholder='To' value='' onChange={(e)=>{
                setTo(e.target.value);
            }}/>
            <Field label='Amount' placeholder='Amount' value='' onChange={(e)=>{
                setAmount(e.target.value);
            }}/>
            <Button label='Transfer' type='button' onClick={async ()=>{
                const response=await fetch('http://localhost:3000/api/v1/account/transfer', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+localStorage.getItem('token')
                    },
                    body: JSON.stringify({
                        to: to,
                        amount: amount
                    })
                });
                if(response.status===200){
                    console.log('Transfer successful');
                    console.log('force update')
                    forceUpdate();
                    setUpdate(Math.random());
                    setModalOpen(true);
                    
                }
            }}/>
            
        </form>
        <Modal
        isOpen={isModalOpen}
        onRequestClose={() => {setModalOpen(false)}}
        contentLabel='Transfer Success'
        className="bg-white p-8 mx-auto mt-20 rounded-lg shadow-lg h-3/2 md:w-1/4"
      >
        <div>
          <h2>Transfer Successful!</h2>
          <p>Your transfer has been completed.</p>
          <Button label='Close' onClick={() => { setUpdate(1);setModalOpen(false)}} />
        </div>
      </Modal>
    </div>
}