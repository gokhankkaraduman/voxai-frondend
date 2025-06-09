import { NavLink, useNavigate } from "react-router";
import { useState, useRef, useEffect } from "react";
import { useUser } from "../../contexts/UserContext";
import logo from '../../assets/logo/logo.png'
import style from './Header.module.css'
import { FaHome, FaBook, FaCog, FaPalette, FaGlobe, FaBell, FaUser, FaSignOutAlt, FaUserCog, FaHeart, FaComments } from "react-icons/fa";
import { MdSecurity } from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";
import { IoMdLogIn } from "react-icons/io";
import { RiUserAddLine } from "react-icons/ri";
import { HiMenu, HiX } from "react-icons/hi";

function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const settingsRef = useRef(null);
    const userMenuRef = useRef(null);
    const navigate = useNavigate();
    const { user } = useUser();
    const isLoggedIn = user.isLoggedIn;
    
    // Sadece ilk ismi al (soyisim olmadan)
    const firstName = user.name ? user.name.split(' ')[0] : 'User';

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const toggleSettings = () => {
        setIsSettingsOpen(!isSettingsOpen);
        setIsUserMenuOpen(false); // Diğer menüyü kapat
    };

    const toggleUserMenu = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
        setIsSettingsOpen(false); // Diğer menüyü kapat
    };

    const handleNavigation = (path) => {
        navigate(path);
        setIsSettingsOpen(false);
        setIsUserMenuOpen(false);
        setIsMobileMenuOpen(false);
    };

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (settingsRef.current && !settingsRef.current.contains(event.target)) {
                setIsSettingsOpen(false);
            }
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setIsUserMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className={style.header}>
            <div className={style.container}>
                
                <div className={style.logoContainer}>
                    <img src={logo} alt="VoxAi Logo" className={style.logoImg} />
                    {/* Desktop'ta logo text görünür, mobile'da gizli */}
                    <h1 className={`${style.logoText} ${style.desktopOnly}`}>
                        Vox<span className={style.logoSpan}>Ai</span>
                    </h1>
                </div>

                
                <nav className={style.navContainer}>
                    <ul className={style.navList}>
                        <NavLink 
                            to="/" 
                            className={({ isActive }) => 
                                isActive ? `${style.navItem} ${style.active}` : style.navItem
                            }
                        >
                            <FaHome /> Home
                        </NavLink>
                        <NavLink 
                            to="/books" 
                            className={({ isActive }) => 
                                isActive ? `${style.navItem} ${style.active}` : style.navItem
                            }
                        >
                            <FaBook /> Books
                        </NavLink>
                        <NavLink 
                            to="/community" 
                            className={({ isActive }) => 
                                isActive ? `${style.navItem} ${style.active}` : style.navItem
                            }
                        >
                            <FaPeopleGroup /> Community
                        </NavLink>
                        {isLoggedIn && (
                            <NavLink 
                                to="/favorites" 
                                className={({ isActive }) => 
                                    isActive ? `${style.navItem} ${style.active}` : style.navItem
                                }
                            >
                                <FaHeart /> Favorites
                            </NavLink>
                        )}
                        {!isLoggedIn && (
                            <>
                                <NavLink 
                                to="/login" 
                                className={({ isActive }) => 
                                    isActive ? `${style.navItem} ${style.active}` : style.navItem
                                }
                                >
                                    <IoMdLogIn /> Login
                                </NavLink>
                                <NavLink 
                                to="/register" 
                                className={({ isActive }) => 
                                    isActive ? `${style.navItem} ${style.active}` : style.navItem
                                }
                                >
                                    <RiUserAddLine /> Register
                                </NavLink>
                            </>
                        )}
                    </ul>
                </nav>

                
                <div className={style.actionContainer}>
                    {/* User Profile Menu (Only if logged in) */}
                    {isLoggedIn && (
                        <div className={style.userMenuContainer} ref={userMenuRef}>
                            <button 
                                className={style.userMenuButton}
                                onClick={toggleUserMenu}
                                aria-label="User menu"
                            >
                                <div className={style.userAvatar}>
                                    <FaUser />
                                </div>
                                {/* Mobile'da sadece avatar, desktop'ta isim de var */}
                                <span className={`${style.userName} ${style.desktopOnly}`}>{firstName}</span>
                            </button>
                            
                            <div className={`${style.userMenuDropdown} ${isUserMenuOpen ? style.open : ''}`}>
                                <div className={style.userMenuHeader}>
                                    <div className={style.userInfo}>
                                        <strong>{user.name}</strong>
                                        <span>{user.email}</span>
                                    </div>
                                </div>
                                <div className={style.userMenuItem} onClick={() => handleNavigation('/profile')}>
                                    <FaUser />
                                    Profile
                                </div>
                                <div className={style.userMenuItem} onClick={() => handleNavigation('/profile?tab=settings')}>
                                    <FaUserCog />
                                    Account Settings
                                </div>
                                <div className={style.userMenuItem} onClick={() => handleNavigation('/profile?tab=preferences')}>
                                    <FaCog />
                                    Preferences
                                </div>
                                <div className={style.userMenuItem} onClick={() => handleNavigation('/profile?tab=settings')}>
                                    <MdSecurity />
                                    Privacy Settings
                                </div>
                                <div className={style.userMenuItem} onClick={() => handleNavigation('/notifications')}>
                                    <FaBell />
                                    Notifications
                                </div>
                                <div className={style.userMenuDivider}></div>
                                <div className={style.userMenuItem} onClick={() => console.log('Logout')}>
                                    <FaSignOutAlt />
                                    Logout
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {/* Messages Button (Only if logged in) */}
                    {isLoggedIn && (
                        <button 
                            className={style.messagesButton}
                            onClick={() => handleNavigation('/messages')}
                            aria-label="Messages"
                        >
                            <FaComments />
                        </button>
                    )}
                    
                    {/* Settings Menu (Theme & Language) */}
                    <div className={style.settingsContainer} ref={settingsRef}>
                        <button 
                            className={style.settingsButton}
                            onClick={toggleSettings}
                            aria-label="Settings menu"
                        >
                            <FaCog />
                        </button>
                        
                        <div className={`${style.settingsDropdown} ${isSettingsOpen ? style.open : ''}`}>
                            <div className={style.settingsItem} onClick={() => console.log('Theme context will handle this')}>
                                <FaPalette />
                                Theme
                            </div>
                            <div className={style.settingsItem} onClick={() => console.log('Language context will handle this')}>
                                <FaGlobe />
                                Language
                            </div>
                        </div>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button 
                        className={style.mobileToggle}
                        onClick={toggleMobileMenu}
                        aria-label="Toggle navigation menu"
                    >
                        {isMobileMenuOpen ? <HiX /> : <HiMenu />}
                    </button>
                </div>
            </div>

            {/* Enhanced Mobile Navigation */}
            <div className={`${style.mobileNav} ${isMobileMenuOpen ? style.open : ''}`}>
                <ul className={style.mobileNavList}>
                    <NavLink 
                        to="/" 
                        className={({ isActive }) => 
                            isActive ? `${style.mobileNavItem} ${style.active}` : style.mobileNavItem
                        }
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <FaHome />
                        Home
                    </NavLink>
                    <NavLink 
                        to="/books" 
                        className={({ isActive }) => 
                            isActive ? `${style.mobileNavItem} ${style.active}` : style.mobileNavItem
                        }
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <FaBook />
                        Books
                    </NavLink>
                    <NavLink 
                        to="/community" 
                        className={({ isActive }) => 
                            isActive ? `${style.mobileNavItem} ${style.active}` : style.mobileNavItem
                        }
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <FaPeopleGroup />
                        Community
                    </NavLink>
                    {isLoggedIn && (
                        <>
                            <NavLink 
                                to="/favorites" 
                                className={({ isActive }) => 
                                    isActive ? `${style.mobileNavItem} ${style.active}` : style.mobileNavItem
                                }
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <FaHeart />
                                Favorites
                            </NavLink>
                            <NavLink 
                                to="/messages" 
                                className={({ isActive }) => 
                                    isActive ? `${style.mobileNavItem} ${style.active}` : style.mobileNavItem
                                }
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <FaComments />
                                Messages
                            </NavLink>
                        </>
                    )}
                    {!isLoggedIn && (
                        <>
                            <NavLink 
                            to="/login" 
                            className={({ isActive }) => 
                                isActive ? `${style.mobileNavItem} ${style.active}` : style.mobileNavItem
                            }
                            onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <IoMdLogIn />
                                Login
                            </NavLink>
                            <NavLink 
                            to="/register" 
                            className={({ isActive }) => 
                                isActive ? `${style.mobileNavItem} ${style.active}` : style.mobileNavItem
                            }
                            onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <RiUserAddLine />
                                Register
                            </NavLink>
                        </>
                    )}
                </ul>
                
                {/* Mobile User Menu (if logged in) */}
                {isLoggedIn && (
                    <div className={style.mobileUserSection}>
                        <h3 className={style.mobileSectionTitle}>Account</h3>
                        <div className={style.mobileUserGrid}>
                            <NavLink to="/profile" className={style.mobileUserItem} onClick={() => setIsMobileMenuOpen(false)}>
                                <FaUser />
                                <span>Profile</span>
                            </NavLink>
                            <NavLink to="/favorites" className={style.mobileUserItem} onClick={() => setIsMobileMenuOpen(false)}>
                                <FaHeart />
                                <span>Favorites</span>
                            </NavLink>
                            <div className={style.mobileUserItem} onClick={() => handleNavigation('/profile?tab=settings')}>
                                <FaUserCog />
                                <span>Settings</span>
                            </div>
                            <div className={style.mobileUserItem} onClick={() => handleNavigation('/profile?tab=preferences')}>
                                <FaCog />
                                <span>Preferences</span>
                            </div>
                            <NavLink to="/notifications" className={style.mobileUserItem} onClick={() => setIsMobileMenuOpen(false)}>
                                <FaBell />
                                <span>Notifications</span>
                            </NavLink>
                            <div className={style.mobileUserItem} onClick={() => console.log('Logout')}>
                                <FaSignOutAlt />
                                <span>Logout</span>
                            </div>
                        </div>
                    </div>
                )}
                
                {/* Mobile Settings */}
                <div className={style.mobileSettings}>
                    <h3 className={style.mobileSectionTitle}>Settings</h3>
                    <div className={style.mobileSettingsGrid}>
                        <div className={style.mobileSettingsItem} onClick={() => console.log('Theme context will handle this')}>
                            <FaPalette />
                            <span>Theme</span>
                        </div>
                        <div className={style.mobileSettingsItem} onClick={() => console.log('Language context will handle this')}>
                            <FaGlobe />
                            <span>Language</span>
                        </div>
                    </div>
                </div>
            </div>
            

        </header>
    );
}

export default Header;