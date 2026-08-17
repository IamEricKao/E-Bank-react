import { useState } from "react";
import { Link } from "react-router-dom";
import { apiService } from "../services/api";

const ForgotPassword = () => {

    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await apiService.forgetPassword({ email });

            if (response.data.statusCode === 200) {

                setSuccess(response.data.message);
                setEmail('');

            } else {
                setError(response.data.message);
            }

        } catch (error) {
            setError(error.response?.data?.message || '寄送電子郵件過程發生錯誤!');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-form">
                <h2>忘記密碼</h2>
                <p className="auth-subtitle">輸入您的Email以此收取重置碼</p>

                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email 信箱</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="輸入您的email"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="auth-button"
                        disabled={loading}
                    >
                        {loading ? '送出中...' : '寄送重置碼'}
                    </button>
                </form>

                <div className="auth-link">
                    想起你的密碼了? <Link to="/login">返回登入</Link>
                </div>

                <div className="auth-link">
                    還沒有帳號? <Link to="/register">註冊</Link>
                </div>
            </div>
        </div>
    );

}

export default ForgotPassword;