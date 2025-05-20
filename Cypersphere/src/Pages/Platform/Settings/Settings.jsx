import { useState } from 'react'
import FilterBar from '../../../Components/Platform/FilterBar/FilterBar';
import AccountSet from './AccountSet/AccountSet';
import GeneralSet from './GeneralSet/GeneralSet';
import NotificationSet from './NotificationSet/NotificationSet';
import AddGroup from '../../../Components/Admin/AddGroup';

const Catogries = [
    {"name": "General", "component": <GeneralSet/>},
    {"name": "Account", "component": <AccountSet/>},
    {"name": "Notification", "component": <NotificationSet/>},
]

function Settings() {
  const [catogeryChoosen, setCatogeryChoosen] = useState(0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <AddGroup/>
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <FilterBar 
            filters={Catogries.map((catogery) => catogery.name)} 
            choosedFilter={catogeryChoosen} 
            setFilter={setCatogeryChoosen}
          />
        </div>
        <div className="p-6">
          {Catogries[catogeryChoosen].component}
        </div>
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 rounded-b-lg border-t border-gray-200 dark:border-gray-600">
          <button className="inline-flex justify-center items-center px-6 py-2.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}

export default Settings
