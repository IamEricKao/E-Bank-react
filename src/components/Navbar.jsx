import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiService } from "../services/api";

const Navbar = () => {

    const isAdmin = apiService.isAdmin();
    const isAuthenticated = apiService.isAuthenticated();
    const isAuditor = apiService.isAuditor();

    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        setShowModal(true);
    };

    const confirmLogout = () => {
        apiService.logout();
        setShowModal(false);
        navigate("/login");
    };

    const cancelLogout = () => {
        setShowModal(false);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">eBank</Link>

                <ul className="navbar-menu">
                    <li className="navbar-item">
                        <Link to="/home" className="navbar-link">首頁</Link>
                    </li>
                    {isAuthenticated ? (
                        <>
                            <li className="navbar-item">
                                <Link to="/profile" className="navbar-link">會員中心</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/transfer" className="navbar-link">轉帳紀錄</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/transactions" className="navbar-link">交易明細</Link>
                            </li>

                            {(isAdmin || isAuditor) && (
                                <li className="navbar-item">
                                    <Link to="/auditor-dashboard" className="navbar-link"> 稽核儀表板</Link>
                                </li>
                            )}
                            <li className="navbar-item">
                                <button
                                    className="navbar-link logout-btn"
                                    onClick={handleLogout}>
                                    登出
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="navbar-item">
                                <Link to="/login" className="navbar-link">登入</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/register" className="navbar-link">註冊</Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>

            {showModal && (
                <div className="modal-backdrop">
                    <div className="modal">
                        <p>確定要登出嗎?</p>
                        <div className="modal-actions">
                            <button onClick={confirmLogout} className="btn-confirm">Yes</button>
                            <button onClick={cancelLogout} className="btn-cancel">No</button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;