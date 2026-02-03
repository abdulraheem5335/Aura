import { useTheme } from '../context/ThemeContext';
import '../style/themeToggle.css';

export function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button 
      className="theme-toggle" 
      onClick={toggleTheme}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDarkMode ? 'Light mode' : 'Dark mode'}
    >
      <div className={`toggle-track ${isDarkMode ? 'dark' : 'light'}`}>
        <span className="toggle-icon sun">☀️</span>
        <span className="toggle-icon moon">🌙</span>
        <div className="toggle-thumb"></div>
      </div>
    </button>
  );
}
