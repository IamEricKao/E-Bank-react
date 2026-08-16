import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiService } from "../services/api";

const Login = () => {
        const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try{

            const response = await apiService.login(formData);

            if(response.data.statusCode === 200){
                apiService.saveAuthData(response.data.data.token, response.data.data.roles);
                navigate("/home");
            }else{
                setError(response.data.message || '登入失敗');
            }

        }catch(error){
            setError(error.response?.data?.message || error.message || '登入失敗');
        }finally{
            setLoading(false);
        }
    };

        return (
        <div className="auth-container">
            <div className="auth-form">
                <h2>登入</h2>
                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">帳號</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="輸入您的電子郵件"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">密碼</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="auth-button"
                        disabled={loading}
                    >
                        {loading ? '登入中...' : '登入'}
                    </button>
                </form>

                <div className="auth-link">
                    沒有帳號嗎? <Link to="/register">註冊</Link>
                </div>

                <div className="auth-link">
                    密碼忘記了嗎? <Link to="/forgot-password">忘記密碼</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;