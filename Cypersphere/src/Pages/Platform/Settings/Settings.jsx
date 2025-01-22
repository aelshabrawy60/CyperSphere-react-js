import { useState } from 'react'
import FilterBar from '../../../Components/Platform/FilterBar/FilterBar';
import AccountSet from './AccountSet/AccountSet';
import GeneralSet from './GeneralSet/GeneralSet';
import NotificationSet from './NotificationSet/NotificationSet';

const Catogries = [
    {"name": "General", "component": <GeneralSet/>},
    {"name": "Account", "component": <AccountSet/>},
    {"name": "Notification", "component": <NotificationSet/>},
]

function Settings() {
  const [catogeryChoosen, setCatogeryChoosen] = useState(0);

  return (
    <div className='px-md-4 px-2'>
        <div className='p-3'>
            <FilterBar filters={Catogries.map((catogery) => catogery.name)} choosedFilter={catogeryChoosen} setFilter={setCatogeryChoosen}/>
        </div>
        <div>
            {Catogries[catogeryChoosen].component}
        </div>
        <div className='p-3'>
            <button className='main-btn'>Save</button>
        </div>
    </div>
  )
}

export default Settings