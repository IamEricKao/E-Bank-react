const Footer = () => {
    return(
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3>eBank App</h3>
                        <p>全世界最安全的銀行</p>
                    </div>
                    <div className="footer-section">
                        <ul>
                            <li><a href="/">首頁</a></li>
                            <li><a href="/">關於我們</a></li>
                            <li><a href="/">聯繫我們</a></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h4>聯繫我們</h4>
                        <p>Email: support@eBank.com.tw</p>
                        <p>Phone: (03)1234567</p>
                    </div>                    
                </div>
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} eBank App. 保留所有法律權益</p>
                </div>
            </div>
        </footer>
    );
}
export default Footer;