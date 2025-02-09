import { useState } from 'react'
import { MdNotifications, MdEmail, MdChat, MdUpdate, MdSecurity } from "react-icons/md";

function NotificationSet() {
  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    securityAlerts: true,
    chatMessages: false,
    platformUpdates: true,
    newsAndTips: false
  });

  const Toggle = ({ label, icon: Icon, description, enabled, onChange }) => (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-start">
        <div className="flex-shrink-0 flex items-center">
          <Icon className="h-6 w-6 text-gray-400" />
        </div>
        <div className="ml-3">
          <p className="text-base font-medium text-gray-900 dark:text-gray-100">{label}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
        </div>
      </div>
      <button
        type="button"
        className={`${
          enabled ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'
        } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
        role="switch"
        aria-checked={enabled}
        onClick={() => onChange(!enabled)}
      >
        <span
          aria-hidden="true"
          className={`${
            enabled ? 'translate-x-5' : 'translate-x-0'
          } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
        />
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white flex items-center gap-2 mb-1">
          <MdNotifications className="text-xl" /> Notification Preferences
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Choose how you want to be notified about important updates and activities
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg divide-y divide-gray-200 dark:divide-gray-700">
        <Toggle
          label="Email Updates"
          icon={MdEmail}
          description="Receive important updates and notifications via email"
          enabled={notifications.emailUpdates}
          onChange={(value) => setNotifications(prev => ({ ...prev, emailUpdates: value }))}
        />
        <Toggle
          label="Security Alerts"
          icon={MdSecurity}
          description="Get notified about security-related events and warnings"
          enabled={notifications.securityAlerts}
          onChange={(value) => setNotifications(prev => ({ ...prev, securityAlerts: value }))}
        />
        <Toggle
          label="Chat Messages"
          icon={MdChat}
          description="Receive notifications for new chat messages"
          enabled={notifications.chatMessages}
          onChange={(value) => setNotifications(prev => ({ ...prev, chatMessages: value }))}
        />
        <Toggle
          label="Platform Updates"
          icon={MdUpdate}
          description="Stay informed about platform changes and new features"
          enabled={notifications.platformUpdates}
          onChange={(value) => setNotifications(prev => ({ ...prev, platformUpdates: value }))}
        />
      </div>

      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg px-4 py-3">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Note: Some notifications cannot be disabled as they contain important security information.
        </p>
      </div>
    </div>
  )
}

export default NotificationSet
