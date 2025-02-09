import { useState } from 'react'
import { MdNightsStay, MdOutlineGTranslate, MdLightMode } from "react-icons/md";

function GeneralSet() {
  const [theme, setTheme] = useState('dark');
  const [language, setLanguage] = useState('English');

  return (
    <div className="space-y-8">
      {/* Theme Selection */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
          <MdNightsStay className="text-xl" /> Theme
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            onClick={() => setTheme('dark')}
            className={`flex items-center p-4 rounded-lg cursor-pointer border-2 transition-all ${
              theme === 'dark'
                ? 'border-indigo-600 bg-indigo-50 dark:bg-gray-700'
                : 'border-gray-200 dark:border-gray-700 hover:border-indigo-400'
            }`}
          >
            <MdNightsStay className="text-2xl mr-3 text-indigo-600 dark:text-indigo-400" />
            <div>
              <div className="font-medium">Dark Mode</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Easier on the eyes in low-light
              </div>
            </div>
          </div>

          <div
            onClick={() => setTheme('light')}
            className={`flex items-center p-4 rounded-lg cursor-pointer border-2 transition-all ${
              theme === 'light'
                ? 'border-indigo-600 bg-indigo-50 dark:bg-gray-700'
                : 'border-gray-200 dark:border-gray-700 hover:border-indigo-400'
            }`}
          >
            <MdLightMode className="text-2xl mr-3 text-indigo-600 dark:text-indigo-400" />
            <div>
              <div className="font-medium">Light Mode</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Classic bright interface
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Language Selection */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
          <MdOutlineGTranslate className="text-xl" /> Language
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            onClick={() => setLanguage('English')}
            className={`flex items-center p-4 rounded-lg cursor-pointer border-2 transition-all ${
              language === 'English'
                ? 'border-indigo-600 bg-indigo-50 dark:bg-gray-700'
                : 'border-gray-200 dark:border-gray-700 hover:border-indigo-400'
            }`}
          >
            <span className="text-xl mr-3">🇺🇸</span>
            <div>
              <div className="font-medium">English</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                English language
              </div>
            </div>
          </div>

          <div
            onClick={() => setLanguage('Arabic')}
            className={`flex items-center p-4 rounded-lg cursor-pointer border-2 transition-all ${
              language === 'Arabic'
                ? 'border-indigo-600 bg-indigo-50 dark:bg-gray-700'
                : 'border-gray-200 dark:border-gray-700 hover:border-indigo-400'
            }`}
          >
            <span className="text-xl mr-3">🇪🇬</span>
            <div>
              <div className="font-medium">Arabic</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                اللغة العربية
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GeneralSet
