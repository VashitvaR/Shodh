import { useState } from 'react';
import styles from './Navbar.css';

function Navbar() {
  // Adding the state
  const [isActive, setIsActive] = useState(false);

  // Add the active class
  const toggleActiveClass = () => {
    setIsActive(!isActive);
  };

  // Clean up function to remove the active class
  const removeActive = () => {
    setIsActive(false);
  };

  // List of navigation items
  const navItems = [
    'HOME',
    'ABOUT US',
    'EVENTS',
    'INFORMATION',
    'SERVICE',
    'GALLERY',
    'CONTACT US'
  ];

  return (
    <div className="App">
      <header className="App-header">
        <nav className={`${styles.navbar}`}>
          {/* Logo */}
          <a href="#home" className={`${styles.logo}`}></a>
          
          {/* Navigation menu */}
          <ul className={`${styles.navMenu} ${isActive ? styles.active : ''}`}>
            {navItems.map((item, index) => (
              <li key={index} onClick={removeActive}>
                <a href={`#${item}`} className={`${styles.navLink}`}>{item}</a>
              </li>
            ))}
          </ul>

          {/* Hamburger menu */}
          <div className={`${styles.hamburger} ${isActive ? styles.active : ''}`} onClick={toggleActiveClass}>
            <span className={`${styles.bar}`}></span>
            <span className={`${styles.bar}`}></span>
            <span className={`${styles.bar}`}></span>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Navbar;
