import React, { useState } from 'react'
import Job from '../../../Components/Platform/Job/Job'
import JobsViewer from '../../../Components/Platform/JobsViewer/JobsViewer'
import Company from '../../../Components/Platform/Company/Company'
import CompaniesViewer from '../../../Components/Platform/CompaniesViewer/CompaniesViewer'
import { FaBriefcase, FaBuilding } from 'react-icons/fa'

// Dark mode color palette
const darkTheme = {
  surface: '#2d2d2d',
  primary: '#3a86ff',
  textPrimary: '#ffffff',
  textSecondary: '#a0a0a0',
  border: '#404040',
  hover: '#353535',
  badge: '#404040'
}

const styles = {
  tabContainer: {
    background: darkTheme.surface,
    borderRadius: '12px',
    padding: '8px',
    margin: '0 15px 20px 15px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
    border: `1px solid ${darkTheme.border}`
  },
  tabList: {
    display: 'flex',
    gap: '8px',
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  tabButton: {
    flex: 1,
    width: '100%',
    border: 'none',
    padding: '12px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    background: 'transparent',
    color: darkTheme.textSecondary,
    '&:hover': {
      background: darkTheme.hover
    }
  },
  activeTab: {
    background: darkTheme.primary,
    color: darkTheme.textPrimary,
    boxShadow: '0 2px 4px rgba(58, 134, 255, 0.2)'
  },
  icon: {
    fontSize: '16px'
  },
  badge: {
    background: darkTheme.badge,
    color: darkTheme.textSecondary,
    padding: '2px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    marginLeft: '4px'
  },
  contentContainer: {
    background: darkTheme.background,
    color: darkTheme.textPrimary
  }
}

const cssStyles = `
  .dark-mode-tab {
    position: relative;
    overflow: hidden;
  }

  .dark-mode-tab::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(rgba(255,255,255,0.1), rgba(255,255,255,0));
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .dark-mode-tab:hover::after {
    opacity: 1;
  }

  .tab-content-transition {
    transition: all 0.3s ease;
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .slide-in {
    animation: slideIn 0.3s ease forwards;
  }
`

function Jobs() {
  const [activeTab, setActiveTab] = useState('jobs');
  const [isLoading, setIsLoading] = useState(false);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div style={styles.contentContainer} className='mt-4'>
      <style>{cssStyles}</style>
      
      {/* Enhanced Dark Mode Tabs for mobile view */}
      <div className='d-lg-none' style={styles.tabContainer}>
        <ul style={styles.tabList}>
          <li style={{ flex: 1 }}>
            <button 
              className="dark-mode-tab"
              style={{
                ...styles.tabButton,
                ...(activeTab === 'jobs' ? styles.activeTab : {})
              }}
              onClick={() => handleTabChange('jobs')}
              disabled={isLoading}
            >
              <FaBriefcase style={styles.icon} />
              <span>Jobs</span>
              <span style={styles.badge}>42</span>
              {isLoading && activeTab === 'jobs' && (
                <div className="spinner-border spinner-border-sm ms-2" 
                     style={{ color: darkTheme.textPrimary }} />
              )}
            </button>
          </li>
          <li style={{ flex: 1 }}>
            <button 
              className="dark-mode-tab"
              style={{
                ...styles.tabButton,
                ...(activeTab === 'companies' ? styles.activeTab : {})
              }}
              onClick={() => handleTabChange('companies')}
              disabled={isLoading}
            >
              <FaBuilding style={styles.icon} />
              <span>Companies</span>
              <span style={styles.badge}>15</span>
              {isLoading && activeTab === 'companies' && (
                <div className="spinner-border spinner-border-sm ms-2" 
                     style={{ color: darkTheme.textPrimary }} />
              )}
            </button>
          </li>
        </ul>
      </div>

      <div className='row m-0'>
        <div 
          className={`col-lg-8 col-12 ${activeTab === 'jobs' ? 'd-block slide-in' : 'd-none d-lg-block'}`}
        >
          <JobsViewer/>
        </div>

        <div 
          className={`col-lg-4 ps-lg-0 col-12 ${activeTab === 'companies' ? 'd-block slide-in' : 'd-none d-lg-block'}`}
        >
          <CompaniesViewer/>
        </div>
      </div>
    </div>
  )
}

export default Jobs