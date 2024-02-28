import React from 'react';
import { Appbar } from '../components/Appbar';
import { User } from '../components/User';

export function Dashboard(){
    return <div className="flex justify-center items-center h-screen ">
        
        <User/>
    </div>
}