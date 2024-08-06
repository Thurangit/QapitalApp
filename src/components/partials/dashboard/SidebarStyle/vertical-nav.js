import React, { useState, useEffect, useContext, memo, Fragment } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Accordion, useAccordionButton, AccordionContext } from 'react-bootstrap'
import AuthUser from '../../../../components/authuser/AuthUser'
import RadioBtn from '../../../setting/elements/radio-btn';

function CustomToggle({ children, eventKey, onClick }) {



    const { activeEventKey } = useContext(AccordionContext);
    const decoratedOnClick = useAccordionButton(eventKey, (active) => onClick({ state: !active, eventKey: eventKey }));
    const isCurrentEventKey = activeEventKey === eventKey;
    return (
        <Link to="#" aria-expanded={isCurrentEventKey ? 'true' : 'false'} className="nav-link" role="button" onClick={(e) => {
            decoratedOnClick(isCurrentEventKey)
        }}>
            {children}
        </Link>
    );
}





const VerticalNav = memo((props) => {

    const { user, http, token, logout } = AuthUser();

    const logoutUser = () => {
        if (token != undefined) {
            logout();
        }
    };

    const userid = user.id;

    const [activities_of_user, setactivities_of_user] = useState([]);
    useEffect(() => {
        fetchAllactivities_of_user();
    }, []);

    const fetchAllactivities_of_user = () => {
        http.get('get/activities/of/user/' + userid).then(res => {
            setactivities_of_user(res.data);
        })
    }

    const [activeMenu, setActiveMenu] = useState(false)
    const [active, setActive] = useState('')
    const [show, setShow] = useState(false);
    //location
    let location = useLocation();
    return (
        <Fragment>
            <Accordion as="ul" className="navbar-nav iq-main-menu">
                <li className="nav-item static-item">
                    <Link className="nav-link static-item disabled" to="#" tabIndex="-1">
                        <span className="default-icon">Home</span>
                        <span className="mini-icon">-</span>
                    </Link>
                </li>
                <li className={`${location.pathname === '/' ? 'active' : ''} nav-item `}>
                    <Link className={`${location.pathname === '/' ? 'active' : ''} nav-link `} aria-current="page" to="/" onClick={() => { }}>
                        <i className="icon">
                            <svg width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M9.15722 20.7714V17.7047C9.1572 16.9246 9.79312 16.2908 10.581 16.2856H13.4671C14.2587 16.2856 14.9005 16.9209 14.9005 17.7047V17.7047V20.7809C14.9003 21.4432 15.4343 21.9845 16.103 22H18.0271C19.9451 22 21.5 20.4607 21.5 18.5618V18.5618V9.83784C21.4898 9.09083 21.1355 8.38935 20.538 7.93303L13.9577 2.6853C12.8049 1.77157 11.1662 1.77157 10.0134 2.6853L3.46203 7.94256C2.86226 8.39702 2.50739 9.09967 2.5 9.84736V18.5618C2.5 20.4607 4.05488 22 5.97291 22H7.89696C8.58235 22 9.13797 21.4499 9.13797 20.7714V20.7714"
                                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </i>
                        <span className="item-name">Accueil</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to="/Profile" onClick={(e) => {
                        e.stopPropagation();
                        setShow(true);
                    }}>
                        <i className="icon">
                            <svg width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd"
                                    d="M11.9849 15.3462C8.11731 15.3462 4.81445 15.931 4.81445 18.2729C4.81445 20.6148 8.09636 21.2205 11.9849 21.2205C15.8525 21.2205 19.1545 20.6348 19.1545 18.2938C19.1545 15.9529 15.8735 15.3462 11.9849 15.3462Z"
                                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path fillRule="evenodd" clipRule="evenodd"
                                    d="M11.9849 12.0059C14.523 12.0059 16.5801 9.94779 16.5801 7.40969C16.5801 4.8716 14.523 2.81445 11.9849 2.81445C9.44679 2.81445 7.3887 4.8716 7.3887 7.40969C7.38013 9.93922 9.42394 11.9973 11.9525 12.0059H11.9849Z"
                                    stroke="currentColor" strokeWidth="1.42857" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </i>
                        <span className="item-name">Profil</span>
                    </Link>


                </li>

                {/* <li className="nav-item">
                    <Link className={`${location.pathname === '/' ? 'active' : ''} nav-link `} aria-current="page" target="blank" to="/">
                        <i className="icon">
                            <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M21.9964 8.37513H17.7618C15.7911 8.37859 14.1947 9.93514 14.1911 11.8566C14.1884 13.7823 15.7867 15.3458 17.7618 15.3484H22V15.6543C22 19.0136 19.9636 21 16.5173 21H7.48356C4.03644 21 2 19.0136 2 15.6543V8.33786C2 4.97862 4.03644 3 7.48356 3H16.5138C19.96 3 21.9964 4.97862 21.9964 8.33786V8.37513ZM6.73956 8.36733H12.3796H12.3831H12.3902C12.8124 8.36559 13.1538 8.03019 13.152 7.61765C13.1502 7.20598 12.8053 6.87318 12.3831 6.87491H6.73956C6.32 6.87664 5.97956 7.20858 5.97778 7.61852C5.976 8.03019 6.31733 8.36559 6.73956 8.36733Z" fill="currentColor"></path>
                                <path opacity="0.4" d="M16.0374 12.2966C16.2465 13.2478 17.0805 13.917 18.0326 13.8996H21.2825C21.6787 13.8996 22 13.5715 22 13.166V10.6344C21.9991 10.2297 21.6787 9.90077 21.2825 9.8999H17.9561C16.8731 9.90338 15.9983 10.8024 16 11.9102C16 12.0398 16.0128 12.1695 16.0374 12.2966Z" fill="currentColor"></path>
                                <circle cx="18" cy="11.8999" r="1" fill="currentColor"></circle>
                            </svg>
                        </i>
                        <span className="item-name">Design System<span className="badge rounded-pill bg-success ms-3">UI</span></span>
                    </Link>
                </li> */}
                <li><hr className="hr-horizontal" /></li>
                <li className="nav-item static-item">
                    <Link className="nav-link static-item disabled" to="#" tabIndex="-1">
                        <span className="default-icon">Transactions</span>
                        <span className="mini-icon">-</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to="/Send/Money/Menu" onClick={(e) => {
                        e.stopPropagation();
                        setShow(true);
                    }}>
                        <i className="icon">
                            <svg width="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path opacity="0.4" d="M6.447 22C3.996 22 2 19.9698 2 17.4755V12.5144C2 10.0252 3.99 8 6.437 8L17.553 8C20.005 8 22 10.0302 22 12.5256V17.4846C22 19.9748 20.01 22 17.563 22H16.623H6.447Z" fill="currentColor" />
                                <path d="M11.455 2.22103L8.54604 5.06682C8.24604 5.36094 8.24604 5.83427 8.54804 6.12742C8.85004 6.41959 9.33704 6.41862 9.63704 6.12547L11.23 4.56623V6.06119V14.4515C11.23 14.8654 11.575 15.2014 12 15.2014C12.426 15.2014 12.77 14.8654 12.77 14.4515V4.56623L14.363 6.12547C14.663 6.41862 15.15 6.41959 15.452 6.12742C15.603 5.98036 15.679 5.78849 15.679 5.59566C15.679 5.40477 15.603 5.21291 15.454 5.06682L12.546 2.22103C12.401 2.07981 12.205 1.99995 12 1.99995C11.796 1.99995 11.6 2.07981 11.455 2.22103Z" fill="currentColor" />
                            </svg>
                        </i>
                        <span className="item-name">Envoyer</span>
                    </Link>


                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/Receive/Money/Menu">
                        <i className="icon">
                            <svg width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path opacity="0.4" d="M17.554 7.29614C20.005 7.29614 22 9.35594 22 11.8876V16.9199C22 19.4453 20.01 21.5 17.564 21.5L6.448 21.5C3.996 21.5 2 19.4412 2 16.9096V11.8773C2 9.35181 3.991 7.29614 6.438 7.29614H7.378L17.554 7.29614Z" fill="currentColor" />
                                <path d="M12.5464 16.0374L15.4554 13.0695C15.7554 12.7627 15.7554 12.2691 15.4534 11.9634C15.1514 11.6587 14.6644 11.6597 14.3644 11.9654L12.7714 13.5905L12.7714 3.2821C12.7714 2.85042 12.4264 2.5 12.0004 2.5C11.5754 2.5 11.2314 2.85042 11.2314 3.2821L11.2314 13.5905L9.63742 11.9654C9.33742 11.6597 8.85043 11.6587 8.54843 11.9634C8.39743 12.1168 8.32142 12.3168 8.32142 12.518C8.32142 12.717 8.39743 12.9171 8.54643 13.0695L11.4554 16.0374C11.6004 16.1847 11.7964 16.268 12.0004 16.268C12.2054 16.268 12.4014 16.1847 12.5464 16.0374Z" fill="currentColor" />
                            </svg>
                        </i>
                        <span className="item-name">Recevoir</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to="/Transfert/Money/Menu" onClick={(e) => {
                        e.stopPropagation();
                        setShow(true);
                    }}>
                        <i className="icon">
                            <svg width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.8397 20.1642V6.54639" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                    strokeLinejoin="round" />
                                <path d="M20.9173 16.0681L16.8395 20.1648L12.7617 16.0681" stroke="currentColor" strokeWidth="1.5"
                                    strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M6.91102 3.83276V17.4505" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                    strokeLinejoin="round" />
                                <path d="M2.8335 7.92894L6.91127 3.83228L10.9891 7.92894" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                    strokeLinejoin="round" />
                            </svg>
                        </i>
                        <span className="item-name">Transférer</span>
                    </Link>


                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/paiements/Options">
                        <i className="icon">
                            <svg width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 17V17.5V18" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path> <path d="M12 6V6.5V7" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path> <path d="M15 9.5C15 8.11929 13.6569 7 12 7C10.3431 7 9 8.11929 9 9.5C9 10.8807 10.3431 12 12 12C13.6569 12 15 13.1193 15 14.5C15 15.8807 13.6569 17 12 17C10.3431 17 9 15.8807 9 14.5" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path> <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
                        </i>
                        <span className="item-name">paiements</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/Stats/Transactions" onClick={(e) => {
                        e.stopPropagation();
                        setShow(true);
                    }}>
                        <i className="icon">
                            <svg width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.24512 14.7815L10.2383 10.8914L13.6524 13.5733L16.5815 9.79297" stroke="currentColor" strokeWidth="1.5"
                                    strokeLinecap="round" strokeLinejoin="round" />
                                <circle cx="19.9954" cy="4.20027" r="1.9222" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                    strokeLinejoin="round" />
                                <path
                                    d="M14.9248 3.12012H7.65704C4.6456 3.12012 2.77832 5.25284 2.77832 8.26428V16.3467C2.77832 19.3581 4.60898 21.4817 7.65704 21.4817H16.2612C19.2726 21.4817 21.1399 19.3581 21.1399 16.3467V9.30776"
                                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </i>
                        <span className="item-name">Statistiques</span>
                    </Link>


                </li>

                <li><hr className="hr-horizontal" /></li>
                <li className="nav-item static-item">
                    <Link className="nav-link static-item disabled" to="#" tabIndex="-1">
                        <span className="default-icon">Activités</span>
                        <span className="mini-icon">-</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to="Activities/List">
                        <i className="icon">
                            <svg width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path opacity="0.4" d="M16.0756 2H19.4616C20.8639 2 22.0001 3.14585 22.0001 4.55996V7.97452C22.0001 9.38864 20.8639 10.5345 19.4616 10.5345H16.0756C14.6734 10.5345 13.5371 9.38864 13.5371 7.97452V4.55996C13.5371 3.14585 14.6734 2 16.0756 2Z" fill="currentColor"></path>
                                <path fillRule="evenodd" clipRule="evenodd" d="M4.53852 2H7.92449C9.32676 2 10.463 3.14585 10.463 4.55996V7.97452C10.463 9.38864 9.32676 10.5345 7.92449 10.5345H4.53852C3.13626 10.5345 2 9.38864 2 7.97452V4.55996C2 3.14585 3.13626 2 4.53852 2ZM4.53852 13.4655H7.92449C9.32676 13.4655 10.463 14.6114 10.463 16.0255V19.44C10.463 20.8532 9.32676 22 7.92449 22H4.53852C3.13626 22 2 20.8532 2 19.44V16.0255C2 14.6114 3.13626 13.4655 4.53852 13.4655ZM19.4615 13.4655H16.0755C14.6732 13.4655 13.537 14.6114 13.537 16.0255V19.44C13.537 20.8532 14.6732 22 16.0755 22H19.4615C20.8637 22 22 20.8532 22 19.44V16.0255C22 14.6114 20.8637 13.4655 19.4615 13.4655Z" fill="currentColor"></path>
                            </svg>
                        </i>
                        <span className="item-name">Toutes</span>
                    </Link>

                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="Activities/List">
                        <i className="icon">
                            <svg width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path opacity="0.4" d="M16.0756 2H19.4616C20.8639 2 22.0001 3.14585 22.0001 4.55996V7.97452C22.0001 9.38864 20.8639 10.5345 19.4616 10.5345H16.0756C14.6734 10.5345 13.5371 9.38864 13.5371 7.97452V4.55996C13.5371 3.14585 14.6734 2 16.0756 2Z" fill="currentColor"></path>
                                <path fillRule="evenodd" clipRule="evenodd" d="M4.53852 2H7.92449C9.32676 2 10.463 3.14585 10.463 4.55996V7.97452C10.463 9.38864 9.32676 10.5345 7.92449 10.5345H4.53852C3.13626 10.5345 2 9.38864 2 7.97452V4.55996C2 3.14585 3.13626 2 4.53852 2ZM4.53852 13.4655H7.92449C9.32676 13.4655 10.463 14.6114 10.463 16.0255V19.44C10.463 20.8532 9.32676 22 7.92449 22H4.53852C3.13626 22 2 20.8532 2 19.44V16.0255C2 14.6114 3.13626 13.4655 4.53852 13.4655ZM19.4615 13.4655H16.0755C14.6732 13.4655 13.537 14.6114 13.537 16.0255V19.44C13.537 20.8532 14.6732 22 16.0755 22H19.4615C20.8637 22 22 20.8532 22 19.44V16.0255C22 14.6114 20.8637 13.4655 19.4615 13.4655Z" fill="currentColor"></path>
                            </svg>
                        </i>
                        <span className="item-name">Mes activités</span>
                    </Link>

                </li>

                <li><hr className="hr-horizontal" /></li>
                <li className="nav-item static-item">
                    <Link className="nav-link static-item disabled" to="#" tabIndex="-1">
                        <span className="default-icon">Assistance</span>
                        <span className="mini-icon">-</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to="/Qapital/IA">
                        <i className="icon">
                            <svg width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path opacity="0.4" d="M16.0756 2H19.4616C20.8639 2 22.0001 3.14585 22.0001 4.55996V7.97452C22.0001 9.38864 20.8639 10.5345 19.4616 10.5345H16.0756C14.6734 10.5345 13.5371 9.38864 13.5371 7.97452V4.55996C13.5371 3.14585 14.6734 2 16.0756 2Z" fill="currentColor"></path>
                                <path fillRule="evenodd" clipRule="evenodd" d="M4.53852 2H7.92449C9.32676 2 10.463 3.14585 10.463 4.55996V7.97452C10.463 9.38864 9.32676 10.5345 7.92449 10.5345H4.53852C3.13626 10.5345 2 9.38864 2 7.97452V4.55996C2 3.14585 3.13626 2 4.53852 2ZM4.53852 13.4655H7.92449C9.32676 13.4655 10.463 14.6114 10.463 16.0255V19.44C10.463 20.8532 9.32676 22 7.92449 22H4.53852C3.13626 22 2 20.8532 2 19.44V16.0255C2 14.6114 3.13626 13.4655 4.53852 13.4655ZM19.4615 13.4655H16.0755C14.6732 13.4655 13.537 14.6114 13.537 16.0255V19.44C13.537 20.8532 14.6732 22 16.0755 22H19.4615C20.8637 22 22 20.8532 22 19.44V16.0255C22 14.6114 20.8637 13.4655 19.4615 13.4655Z" fill="currentColor"></path>
                            </svg>
                        </i>
                        <span className="item-name">Mon assistant</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/">
                        <i className="icon">
                            <svg width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path opacity="0.4" d="M16.0756 2H19.4616C20.8639 2 22.0001 3.14585 22.0001 4.55996V7.97452C22.0001 9.38864 20.8639 10.5345 19.4616 10.5345H16.0756C14.6734 10.5345 13.5371 9.38864 13.5371 7.97452V4.55996C13.5371 3.14585 14.6734 2 16.0756 2Z" fill="currentColor"></path>
                                <path fillRule="evenodd" clipRule="evenodd" d="M4.53852 2H7.92449C9.32676 2 10.463 3.14585 10.463 4.55996V7.97452C10.463 9.38864 9.32676 10.5345 7.92449 10.5345H4.53852C3.13626 10.5345 2 9.38864 2 7.97452V4.55996C2 3.14585 3.13626 2 4.53852 2ZM4.53852 13.4655H7.92449C9.32676 13.4655 10.463 14.6114 10.463 16.0255V19.44C10.463 20.8532 9.32676 22 7.92449 22H4.53852C3.13626 22 2 20.8532 2 19.44V16.0255C2 14.6114 3.13626 13.4655 4.53852 13.4655ZM19.4615 13.4655H16.0755C14.6732 13.4655 13.537 14.6114 13.537 16.0255V19.44C13.537 20.8532 14.6732 22 16.0755 22H19.4615C20.8637 22 22 20.8532 22 19.44V16.0255C22 14.6114 20.8637 13.4655 19.4615 13.4655Z" fill="currentColor"></path>
                            </svg>
                        </i>
                        <span className="item-name">Qapital.Co</span>
                    </Link>
                </li>
                <li className="nav-item mb-4">
                    <Link className="nav-link" to="#" onClick={logoutUser}>
                        <i className="icon">
                            <svg width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path opacity="0.4" d="M16.0756 2H19.4616C20.8639 2 22.0001 3.14585 22.0001 4.55996V7.97452C22.0001 9.38864 20.8639 10.5345 19.4616 10.5345H16.0756C14.6734 10.5345 13.5371 9.38864 13.5371 7.97452V4.55996C13.5371 3.14585 14.6734 2 16.0756 2Z" fill="currentColor"></path>
                                <path fillRule="evenodd" clipRule="evenodd" d="M4.53852 2H7.92449C9.32676 2 10.463 3.14585 10.463 4.55996V7.97452C10.463 9.38864 9.32676 10.5345 7.92449 10.5345H4.53852C3.13626 10.5345 2 9.38864 2 7.97452V4.55996C2 3.14585 3.13626 2 4.53852 2ZM4.53852 13.4655H7.92449C9.32676 13.4655 10.463 14.6114 10.463 16.0255V19.44C10.463 20.8532 9.32676 22 7.92449 22H4.53852C3.13626 22 2 20.8532 2 19.44V16.0255C2 14.6114 3.13626 13.4655 4.53852 13.4655ZM19.4615 13.4655H16.0755C14.6732 13.4655 13.537 14.6114 13.537 16.0255V19.44C13.537 20.8532 14.6732 22 16.0755 22H19.4615C20.8637 22 22 20.8532 22 19.44V16.0255C22 14.6114 20.8637 13.4655 19.4615 13.4655Z" fill="currentColor"></path>
                            </svg>
                        </i>
                        <span className="item-name">Déconnexion</span>
                    </Link>
                </li>
                <li className="nav-item mb-2">

                </li>

            </Accordion>
        </Fragment>
    )
})

export default VerticalNav
