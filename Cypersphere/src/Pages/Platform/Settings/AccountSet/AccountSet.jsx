import { useState } from 'react'
import { FaUserEdit } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { MdLocalPhone } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";

function AccountSet() {
  const [email, setEmail] = useState('user@gmail.com');
  const [name, setName] = useState('user profile');
  const [userName, setUserName] = useState('@user32');
  const [phone, setPhone] = useState('01019345623');
  const [profilePhoto, setProfilePhoto] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');


  return (
    <div className='row m-0 p-3 row-gap-4'>
      <div className='col-lg-6 pe-xl-5'>
        <div className='fw-bold mb-4'>Personal Information</div>
        <div className='row m-0 row-gap-4'>
          <div className='col-md-6 ps-md-0 ps-0'>
            <div className='mb-2 d-flex align-items-center gap-2'><FaUserEdit /> Name</div>
            <input className='main-input' type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className='col-md-6 pe-md-0 ps-0'>
            <div className='mb-2 d-flex align-items-center gap-2'><FaUser /> Username</div>
            <input className='main-input' type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
          </div>
          <div className='col-md-6 ps-md-0 ps-0'>
            <div className='mb-2 d-flex align-items-center gap-2'><MdEmail /> Email</div>
            <input className='main-input' type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className='col-md-6 pe-md-0 ps-0'>
            <div className='mb-2 d-flex align-items-center gap-2'><MdLocalPhone /> Phone</div>
            <input className='main-input' type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
        </div>
      </div>
      <div className='col-lg-6 ps-xl-5'>
        <div className='fw-bold mb-4'>Change Password</div>
        <div className='row m-0 row-gap-4'>
          <div className='col-12 ps-0'>
            <div className='mb-2 d-flex align-items-center gap-2'><RiLockPasswordFill /> Current Password</div>
            <input className='main-input' type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
          </div>
          <div className='col-12 ps-0'>
            <div className='mb-2 d-flex align-items-center gap-2'><RiLockPasswordFill /> New Password</div>
            <input className='main-input' type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountSet