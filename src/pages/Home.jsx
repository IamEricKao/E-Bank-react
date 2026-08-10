import { apiService } from "../services/api";

const Home = () => {
    const isAuthenticated = apiService.isAuthenticated();

    return (
        <div className="home">
            <section className="hero">
                <div className="hero-content">
                    <h1>歡迎來到 eBank</h1>
                    <p>安全、快速、方便的線上銀行服務</p>
                    {!isAuthenticated && (
                        <div className="hero-buttons">
                            <a href="register" className="btn btn-primary">
                                立即註冊
                            </a>
                            <a href="login" className="btn home-btn-secondary">
                                登入
                            </a>
                        </div>
                    )}
                </div>
            </section>

            <section className="features">
                <div className="container">
                    <h2>為什麼選擇eBank?</h2>
                    <div className="features-grid">
                        <div className="feature">
                            <div className="feature-icon">🔒</div>
                            <h3>安全可靠</h3>
                            <p>採用最先進的加密技術，確保您的資金和資訊安全。</p>
                        </div>
                        <div className="feature">
                            <div className="feature-icon">⚡</div>
                            <h3>快速便捷</h3>
                            <p>24小時全年無休，隨時隨地都能享受便利的銀行服務。</p>
                        </div>
                        <div className="feature">
                            <div className="feature-icon">💎</div>
                            <h3>多元服務</h3>
                            <p>提供豐富的金融產品和服務，滿足您不同的需求。</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
export default Home;