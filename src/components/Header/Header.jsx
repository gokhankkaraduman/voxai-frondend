import { NavLink } from "react-router";
import { useState } from "react";
import logo from '../../assets/logo/logo.png'
import style from './Header.module.css'
import { FaHome, FaBook } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { IoMdLogIn } from "react-icons/io";
import { RiUserAddLine } from "react-icons/ri";

function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const isLoggedIn = false;

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className={style.header}>
            <div className={style.container}>
                {/* AI-Themed Logo Section */}
                <div className={style.logoContainer}>
                    <img src={logo} alt="VoxAi Logo" className={style.logoImg} />
                    <h1 className={style.logoText}>
                        Vox<span className={style.logoSpan}>Ai</span>
                    </h1>
                </div>

                {/* Futuristic Navigation */}
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
                        {isLoggedIn ? (
                            <NavLink 
                                to="/profile" 
                                className={({ isActive }) => 
                                    isActive ? `${style.navItem} ${style.active}` : style.navItem
                                }
                            >
                                Profile
                            </NavLink>
                        ): (
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
                                to="/login" 
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

                {/* Right Side - Clean & Minimal */}
                <div className={style.actionContainer}>
                    {/* Mobile Menu Toggle */}
                    <button 
                        className={style.mobileToggle}
                        onClick={toggleMobileMenu}
                        aria-label="Toggle navigation menu"
                    >
                        {isMobileMenuOpen ? '✕' : '☰'}
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
                        Home
                    </NavLink>
                    <NavLink 
                        to="/books" 
                        className={({ isActive }) => 
                            isActive ? `${style.mobileNavItem} ${style.active}` : style.mobileNavItem
                        }
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Books
                    </NavLink>
                    <NavLink 
                        to="/community" 
                        className={({ isActive }) => 
                            isActive ? `${style.mobileNavItem} ${style.active}` : style.mobileNavItem
                        }
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Community
                    </NavLink>
                    {isLoggedIn ? (
                            <NavLink 
                                to="/profile" 
                                className={({ isActive }) => 
                                    isActive ? `${style.mobileNavItem} ${style.active}` : style.mobileNavItem
                                }
                            >
                                Profile
                            </NavLink>
                        ): (
                            <>
                                <NavLink 
                                to="/login" 
                                className={({ isActive }) => 
                                    isActive ? `${style.mobileNavItem} ${style.active}` : style.mobileNavItem
                                }
                                >
                                    Login
                                </NavLink>
                                <NavLink 
                                to="/login" 
                                className={({ isActive }) => 
                                    isActive ? `${style.mobileNavItem} ${style.active}` : style.mobileNavItem
                                }
                                >
                                    Register
                                </NavLink>
                            </>
                        
                        )}
                </ul>
                
            </div>
        </header>
    );
}

export default Header;