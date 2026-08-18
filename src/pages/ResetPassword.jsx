import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { apiService } from "../services/api";

const ResetPassword = () => {

    const [formData, setFormData] = useState({
        code: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    useEffect(() => {
        
        const codeFromUrl = searchParams.get('code');
        if(codeFromUrl){
            setFormData(prev => ({
                ...prev,
                code : codeFromUrl
            }));
        }

    }, [searchParams]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        if(formData.newPassword.length < 6){
            setError('新密碼長度至少6碼');
            setLoading(false);
            return;
        }

        if(formData.newPassword !== formData.confirmPassword){
            setError('新密碼必須一致');
            setLoading(false);
            return;
        }

        try {
            
            const resetData = {
                code: formData.code,
                newPassword: formData.newPassword
            };

            const response = await apiService.resetPassword(resetData);

            if(response.data.statusCode === 200){
                setSuccess('重設密碼成功，請重新登入');
                setLoading(false);

                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            }else{
                setError(response.data.message);
            }

        } catch (error) {
            setError(error.response?.data?.message || '重設密碼失敗');
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-form">
                <h2>重設密碼</h2>
                <p className="auth-subtitle">輸入您要重設的密碼</p>

                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="code">重置碼</label>
                        <input
                            type="text"
                            id="code"
                            name="code"
                            value={formData.code}
                            onChange={handleChange}
                            placeholder="輸入信件中的重置碼"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="newPassword">新密碼</label>
                        <input
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            placeholder="輸入您的新密碼"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">確認新密碼</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="確認您的新密碼"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="auth-button"
                        disabled={loading}
                    >
                        {loading ? '重設中...' : '重設密碼'}
                    </button>
                </form>

                <div className="auth-link">
                    需要新的重置碼? <Link to="/forgot-password">取得新的重置碼</Link>
                </div>

                <div className="auth-link">
                    想起您的密碼了? <Link to="/login">返回登入</Link>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;