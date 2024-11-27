import React, { useEffect, useState } from 'react'
import ServicesCard from '../components/ServicesCard'
import Footer from '../components/Footer'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateUser } from '../featurs/userSlice';
import UserNavbar from '../components/UserNavbar';
import balance from '../assetes/balance.png'
import AdminServicesCard from '../components/AdminServiceCard';
import ShowBankBalance from '../components/modals/showBankBalance';
import CreditMoney from '../components/modals/creditMoney';
import { ToastContainer } from 'react-toastify';


function UserDashBord() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    let data = useSelector((state) => state.users);
    const [balance,setBalance] = useState("****.**")
    const [visiblePin, setVisiblePin] = useState(false)
    
    console.log(data)
    useEffect(() => {
        if (data[0] === undefined) {
            const localData = localStorage.getItem('userData');
            if (localData) {
                dispatch(updateUser(JSON.parse(localData)));
                data=JSON.parse(localData)
            }
            else{
                navigate('/');
            }
            
        }
    }, [data, navigate]);
    const checkBankBalance = () => {
        setVisiblePin(true);
    }


    return (
        
       
        data[0] !== undefined ? (
            data[0].role !== "admin" ? 
            (<div className="container-fluid text-center">
                <UserNavbar />
                <div className="container">
                    <h1>Hello <strong>{data[0].first_name}</strong>,</h1>
                    <h6>Welcome Back Again.</h6>
                </div>
                <ShowBankBalance visiblePin={visiblePin} setVisiblePin={setVisiblePin} balance={balance} setBalance={setBalance} />
                <div className="container checkAmountBlock d-flex flex-row card  float-left justify-content-between align-items-center">
                    <h3 className='text-center  text-muted mb-0'>Balance: <strong>{balance}</strong></h3>
                   <div>
                    <button className='btn btn-outline-success mx-2' onClick={checkBankBalance}>Check</button>
                    <button className='btn btn-outline-danger' onClick={()=>{
                        setBalance("****.**")
                    }}>Hide</button>
                   </div>
                </div>

                <div className="container p-1">
                    <h3 className='m-3'>Checkout the Following <strong>Services</strong>....</h3>
                    <ServicesCard />
                </div>
                <div className="container mt-5">
                    <h3>Checkout Previous <strong>Transactions</strong>...</h3>
                </div>
                <Footer />
            </div>):
            <div className="container-fluid text-center">
            <UserNavbar />
            <div className="container">
                <h2>Hello <strong>{data[0].first_name}</strong>,</h2>
                <p>Welcome Back Again.</p>
            </div>
            <div className="container p-1">
                    <h3 className='m-3'>Checkout the Following <strong>Services</strong>....</h3>
                    <AdminServicesCard />
                </div>
            <Footer />
        </div>
        ) : null

    );
}

export default UserDashBord;
