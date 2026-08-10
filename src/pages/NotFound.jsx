import { Link } from "react-router-dom";

const NotFound = () => {

    return (
        <div className="not-found-container">
            <div className="not-found-content">
                <div className="not-found-animation">
                    <div className="not-found-number">4</div>
                    <div className="not-found-zero">
                        <div className="not-found-inner-circle"></div>
                    </div>
                    <div className="not-found-number">4</div>
                </div>

                <h1 className="not-found-title">Page Not Found</h1>

                <p className="not-found-message">
                    Oops! 你要找的頁面似乎已經消失在數位世界裡了。
                </p>

                <div className="not-found-actions">
                    <Link to="/home" className="btn btn-primary">
                        首頁
                    </Link>
                    <button onClick={() => window.history.back()} className="btn btn-secondary">
                        上一頁
                    </button>
                </div>

                <div className="not-found-tips">
                    <h3>出現這個頁面時，你需要:</h3>
                    <ul>
                        <li>檢查網址是否有拼寫錯誤。</li>
                        <li>回到首頁。</li>
                        <li>聯絡客服。</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
export default NotFound;