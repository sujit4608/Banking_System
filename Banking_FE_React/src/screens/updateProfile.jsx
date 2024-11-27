import React, { useEffect, useState } from 'react'
import UserNavbar from '../components/UserNavbar'
import updateProfile from '../assetes/update.png'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../featurs/userSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Updatepassword from '../components/modals/updatepassword';
import UpdateMpin from '../components/modals/updateMpin';
import { ToastContainer } from 'react-toastify';
import EmailChangeForm from '../components/modals/emailChangeModal';
import getHeaders from '../api/header';
import api from '../api/api';

function UpdateProfile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);
    const [visiblePin, setVisiblePin] = useState(false);
    const [visibleEmailUpdate, setVisibleEmailUpdate] = useState(false);
    const [userData, setUserData] = useState(); // Initialize as null
    let data = useSelector((state) => state.users);

    const [firstName, setFirstName] = useState('NA');
    const [lastName, setLastName] = useState('NA');
    const [phoneNumber, setPhoneNumber] = useState('NA');
    const [email, setEmail] = useState('NA');
    


    const userProfile = () => {
        const apiUrl = 'user/profile/';
        api.get(apiUrl, { getHeaders })
            .then((response) => {
                console.log(response.data.data);
                setUserData(response.data.data); // Set fetched data
                // dispatch(updateUser(response.data.data)); // Dispatch to Redux
                 setFirstName(userData.first_name || "First Name");
                 setLastName(userData.last_name || "Last Name")
                 setPhoneNumber(userData.phone_number || "N/A")
                 setEmail(userData.email  || "N/A")
            })
            .catch((error) => {
                console.error(error.response?.data?.message || "Error fetching profile");
            });
    };

    useEffect(() => {
        userProfile();

        if (userData == null) {
            const localData = localStorage.getItem('userData');
            // if (localData) {
            //     const parsedData = JSON.parse(localData);
            //     dispatch(updateUser(parsedData));
            //     setUserData(parsedData);
            // } else {
            //     navigate('/');
            // }
        }else{
            // navigate('/');
        }
    }, [navigate, dispatch]);

    // Safely access data[0] with optional chaining and default values
    // const name=userData.first_name
    

    return (
        <div className="page-body container-fluid">
            <ToastContainer />
            <UserNavbar />
            <Updatepassword visible={visible} setVisible={setVisible} />
            <UpdateMpin visiblePin={visiblePin} setVisiblePin={setVisiblePin} />
            <EmailChangeForm visiblePin={visibleEmailUpdate} setVisiblePin={setVisibleEmailUpdate} />
            <div className="back-arrow position-absolute top-5 start-0 p-3">
                <FontAwesomeIcon icon={faArrowLeft} size="2x" onClick={() => navigate(-1)} style={{ cursor: "pointer" }} />
            </div>
            <div className="container update-body mt-3 d-flex p-2 border border-success align-items-center rounded">
                <div className="container">
                    <h4 className="text-start"><strong>Hey</strong> User!</h4>
                    <p>Update Your Profile</p>
                    <label htmlFor="" className="text-start">User's Name</label>
                    <input
                        type="text"
                        className="form-control"
                        readOnly
                        value={`${firstName} ${lastName}`}
                    />
                    <hr />
                    <label htmlFor="" className="text-start">User's Mobile</label>
                    <input
                        type="text"
                        className="form-control"
                        readOnly
                        value={phoneNumber}
                    />
                    <hr />
                    <label htmlFor="" className="text-start">User's Email</label>
                    <input
                        type="text"
                        className="form-control"
                        readOnly
                        value={email}
                    />
                    <hr />
                    <div className="container update-button d-flex justify-content-center">
                        <button className="btn btn-primary m-1 shadow">Update Mobile</button>
                        <button
                            className="btn btn-primary m-1 shadow"
                            onClick={() => setVisible(true)}
                        >
                            Update Password
                        </button>
                        <button
                            className="btn btn-primary m-1 shadow"
                            onClick={() => setVisibleEmailUpdate(true)}
                        >
                            Update Email
                        </button>
                        <button
                            className="btn btn-primary m-1 shadow"
                            onClick={() => setVisiblePin(true)}
                        >
                            Update M-pin
                        </button>
                    </div>
                </div>
                <div className="container">
                    <img className="img-fluid" src={updateProfile} alt="" />
                </div>
            </div>
        </div>
    );
}

export default UpdateProfile;
