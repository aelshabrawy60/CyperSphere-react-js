import React from 'react'
import { useState } from 'react'
import RadioCollection from '../../../../Components/Platform/RadioCollection/RadioCollection';
import { MdNightsStay } from "react-icons/md";
import { MdOutlineGTranslate } from "react-icons/md";

const themes = ['dark', 'light'];
const languages = ['English', 'Arabic'];

function GeneralSet() {
  const [theme, setTheme] = useState(0);
  const [language, setLanguage] = useState(0);


  return (
    <div className='d-flex flex-column gap-5 p-3'>
      <div>
        <div className='mb-3 d-flex align-items-center gap-2'><MdNightsStay/> Theme</div>
        <RadioCollection radios={themes} selectedRadio={theme} setSelectedRadio={setTheme}/>
      </div>
      <div>
        <div className='mb-3 d-flex align-items-center gap-2'><MdOutlineGTranslate /> Language</div>
        <RadioCollection radios={languages} selectedRadio={language} setSelectedRadio={setLanguage}/>
      </div>
    </div>
  )
}

export default GeneralSet