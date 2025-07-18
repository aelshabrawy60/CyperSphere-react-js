/* eslint-disable react/no-unescaped-entities */
import './styles/CometChatBuilderApp.css';
import { AppContextProvider } from './context/AppContext';
import { CometChatHome } from './components/CometChatHome/CometChatHome';
import React, { useEffect, useState } from 'react';
import { useBuilderSettingContext } from './context/BuilderSettingsContext';
import { fontSizes } from './styleConfig';
import { CometChat } from '@cometchat/chat-sdk-javascript';
import useSystemColorScheme from './customHooks';
import { generateExtendedColors } from './utils/utils';
import { CometChatUIKit } from '@cometchat/chat-uikit-react';
import '@cometchat/chat-uikit-react/css-variables.css';

interface CometChatHomeProps {
  /** Default user for the chat application (optional). */
  user?: CometChat.User;
  /** Default group for the chat application (optional). */
  group?: CometChat.Group;
}

/**
 * Main application component for the CometChat Builder.
 *
 * @param {CometChatHomeProps} props - The component props.
 * @returns {JSX.Element} The rendered CometChatBuilderApp component.
*/

function CometChatBuilderApp({ user, group }: CometChatHomeProps) {
  const [loggedInUser, setLoggedInUser] = useState<CometChat.User | null>(null);
  const { styleFeatures, setStyleFeatures } = useBuilderSettingContext();
  const studentId = localStorage.getItem('studentId');
  const systemTheme = useSystemColorScheme();
  const AUTH_KEY = "2ce79be40b31882dd334dbc1e0c155fa48641469"; // Replace with your actual Auth Key

  /**
   * Effect to handle login and logout listeners
   */
  useEffect(() => {
    CometChat.addLoginListener(
      'runnable-sample-app',
      new CometChat.LoginListener({
        loginSuccess: (user: CometChat.User) => {
          setLoggedInUser(user);
        },
        logoutSuccess: () => {
          setLoggedInUser(null);
        },
      })
    );

    return () => CometChat.removeLoginListener('runnable-sample-app');
  }, []);

  /**
   * Handles user authentication with CometChat.
   * Checks if user exists, logs them in, or creates a new user if needed using studentId.
   */
  useEffect(() => {
    // Make sure we have a student ID to use
    if (!studentId) {
      console.error("No student ID found in localStorage");
      return;
    }

    // Use the student ID as the user ID for CometChat
    const UID = studentId;
    
    // Check if user is already logged in
    CometChatUIKit.getLoggedinUser()
      .then((user: CometChat.User | null) => {
        if (!user) {
          // User is not logged in, try logging in
          CometChatUIKit.login(UID)
            .then((user: CometChat.User) => {
              console.log("Login Successful:", { user });
              setLoggedInUser(user);
            })
            .catch((loginError) => {
              console.log("Login failed:", loginError);
              
              // If login fails, user might not exist, so create the user
              if (loginError.code === "ERR_UID_NOT_FOUND") {
                // Create a new user with the student ID
                const newUser = new CometChat.User(UID);
                newUser.setName(`Student ${UID}`); // Set a name based on student ID
                
                CometChatUIKit.createUser(newUser, AUTH_KEY)
                  .then((createdUser: CometChat.User) => {
                    console.log("User created successfully:", createdUser);
                    
                    // Now log in with the newly created user
                    CometChatUIKit.login(UID)
                      .then((user: CometChat.User) => {
                        console.log("Login Successful after user creation:", { user });
                        setLoggedInUser(user);
                      })
                      .catch((error) => console.error("Login failed after user creation:", error));
                  })
                  .catch((error) => console.error("User creation failed:", error));
              } else {
                console.error("Login failed with error:", loginError);
              }
            });
        } else {
          // User is already logged in
          console.log("User already logged in:", user);
          setLoggedInUser(user);
        }
      })
      .catch((error) => console.error("Error checking logged in user:", error));
  }, [studentId, AUTH_KEY]); // Add dependencies to re-run if they change

  /**
   * Converts a hex color code to an RGBA format with a given opacity.
   *
   * @param {string} hex - The hex color code.
   * @param {number} alpha - The opacity value (0 to 1).
   * @returns {string} The RGBA color string.
   */
  const hexToRGBA = (hex: string, alpha: number) => {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  /**
   * Updates theme-related styles dynamically based on user settings.
   * It modifies CSS variables for text colors and primary colors.
   */
  useEffect(() => {
    const handleColorPickerChange = () => {
      const checkForRootElement = () => {
        const currentTheme = styleFeatures?.theme;

        if (!currentTheme) {
          console.warn('Theme not found:', currentTheme);
          return;
        }

        const root = document.getElementById(`${currentTheme}-theme`);
        if (!root) {
          console.warn('Root element not found. Ensure the theme data attribute is correctly set.');
          return;
        }

        const isLightTheme = currentTheme === 'light';
        const isDarkTheme = currentTheme === 'dark';
        const isSystemLight = currentTheme === 'system' && systemTheme === 'light';
        const isSystemDark = currentTheme === 'system' && systemTheme === 'dark';

        const brandColor = styleFeatures.color.brandColor;

        const properties = [
          '--cometchat-primary-color',
          '--cometchat-border-color-highlight',
          '--cometchat-text-color-highlight',
          '--cometchat-icon-color-highlight',
          '--cometchat-primary-button-background',
        ];

        properties.forEach((property) => root.style.setProperty(property, brandColor));
        generateExtendedColors();

        // Handle primary text color
        if ((isLightTheme || isSystemLight) && styleFeatures.color.primaryTextLight === '#FFFFFF') {
          setStyleFeatures({
            ...styleFeatures,
            color: { ...styleFeatures.color, primaryTextLight: '#141414' },
          });
          root.style.setProperty('--cometchat-text-color-primary', '#141414');
        } else if ((isDarkTheme || isSystemDark) && styleFeatures.color.primaryTextDark === '#141414') {
          setStyleFeatures({
            ...styleFeatures,
            color: { ...styleFeatures.color, primaryTextDark: '#FFFFFF' },
          });
          root.style.setProperty('--cometchat-text-color-primary', '#FFFFFF');
        } else {
          root.style.setProperty(
            '--cometchat-text-color-primary',
            isLightTheme || isSystemLight ? styleFeatures.color.primaryTextLight : styleFeatures.color.primaryTextDark
          );
        }

        // Handle secondary text color
        if ((isLightTheme || isSystemLight) && styleFeatures.color.secondaryTextLight === '#989898') {
          setStyleFeatures({
            ...styleFeatures,
            color: { ...styleFeatures.color, secondaryTextLight: '#727272' },
          });
          root.style.setProperty('--cometchat-text-color-secondary', '#727272');
        } else if ((isDarkTheme || isSystemDark) && styleFeatures.color.secondaryTextDark === '#727272') {
          setStyleFeatures({
            ...styleFeatures,
            color: { ...styleFeatures.color, secondaryTextDark: '#989898' },
          });
          root.style.setProperty('--cometchat-text-color-secondary', '#989898');
        } else {
          root.style.setProperty(
            '--cometchat-text-color-secondary',
            isLightTheme || isSystemLight
              ? styleFeatures.color.secondaryTextLight
              : styleFeatures.color.secondaryTextDark
          );
        }
      };

      // Use setTimeout to ensure DOM is ready
      setTimeout(checkForRootElement, 100);
    };
    const handleFontChange = () => {
      document.documentElement.style.setProperty('--cometchat-font-family', styleFeatures.typography.font);
    };

    const handleFontSizeChange = () => {
      const selectedFontSize = fontSizes[styleFeatures.typography.size as keyof typeof fontSizes] || {};
      Object.entries(selectedFontSize)?.forEach(([key, val]) => {
        document.documentElement.style.setProperty(key, val);
      });
    };

    if (styleFeatures) {
      handleColorPickerChange();
      handleFontChange();
      handleFontSizeChange();
    }
  }, [setStyleFeatures, styleFeatures, styleFeatures.theme, systemTheme, loggedInUser]);

  // Run color change effect after a short delay to ensure elements are rendered
  useEffect(() => {
    // Apply a semi-transparent color overlay to a canvas element
    const recolorCanvasContent = (canvas: HTMLCanvasElement) => {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Set blend mode to 'source-atop' so the fill color applies **only** to existing (non-transparent) pixels
        ctx.globalCompositeOperation = 'source-atop';

        // Set fill color with opacity and apply it to the entire canvas
        ctx.fillStyle = hexToRGBA(styleFeatures.color.brandColor, 0.3);
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Reset blend mode to default ('source-over') so future drawings behave normally
        ctx.globalCompositeOperation = 'source-over';
      }
    };
    // Recursive function to find and recolor canvases inside Shadow DOM and nested elements
    const findAndRecolorCanvases = (element: Element | ShadowRoot) => {
      if (element instanceof Element && element.matches('canvas')) {
        recolorCanvasContent(element as HTMLCanvasElement);
      }

      // Search within child elements and Shadow DOM recursively
      element.childNodes.forEach((child) => {
        if (child instanceof Element) {
          findAndRecolorCanvases(child);
          if (child.shadowRoot) {
            findAndRecolorCanvases(child.shadowRoot);
          }
        }
      });
    };
    // Apply color change to all canvases inside elements with the target class
    const applyColorChange = () => {
      document.querySelectorAll('.cometchat-audio-bubble-incoming').forEach((parentDiv) => {
        findAndRecolorCanvases(parentDiv);
      });
    };
    setTimeout(applyColorChange, 100); // Wait for rendering
  }, [styleFeatures.color.brandColor]);

  return (
    <div className="CometChatBuilderApp">
      <AppContextProvider>
        {loggedInUser ? <CometChatHome defaultGroup={group} defaultUser={user} /> : <LoginPlaceholder />}
      </AppContextProvider>
    </div>
  );
}

export default CometChatBuilderApp;

const LoginPlaceholder = () => {
  return (
    <div className="login-placeholder">
      <h3>logging</h3>
    </div>
  );
};