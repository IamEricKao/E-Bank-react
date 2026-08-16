import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiService } from "../services/api";

const UpdateProfile = () => {

    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const navigate = useNavigate();

    const handlePasswordChange = (e) => {

        const { name, value } = e.target;

        setPasswordData({
            ...passwordData,
            [name]: value
        });

        // 輸入資料時清除驗證錯誤
        if (validationErrors[name]) {
            setValidationErrors({
                ...validationErrors,
                [name]: ''
            });
        }

    }

    const validateForm = () => {
        const error = {};

        if (!passwordData.oldPassword) {
            error.oldPassword = '請輸入舊密碼!';
        }

        if (!passwordData.newPassword) {
            error.newPassword = '請輸入新密碼!';
        } else if (passwordData.newPassword.length < 6) {
            error.newPassword = '密碼長度不得小於6碼';
        }

        if (!passwordData.confirmPassword) {
            error.confirmPassword = '請再次輸入新密碼!';
        } else if (passwordData.newPassword !== passwordData.confirmPassword) {
            error.confirmPassword = '新密碼必須一致';
        }

        setValidationErrors(error);
        return Object.keys(error).length === 0;
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setValidationErrors({});

        if (!validateForm()) { return; }

        setLoading(true);

        try {
            const response = await apiService.updatePassword(
                passwordData.oldPassword,
                passwordData.newPassword
            );

            if (response.data.statusCode === 200) {
                setSuccess(response.data.message);
                setPasswordData({
                    oldPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                });

                setTimeout(() => {
                    navigate("/profile");
                }, 2000);

            } else {
                setError(response.data.message);
                setValidationErrors((prev) => ({
                ...prev,
                oldPassword: response.data.message,
                }));
            }

        } catch (error) {
            setError(error.response?.data?.message || "修改密碼失敗!");
            setValidationErrors((prev) => ({
            ...prev,
            oldPassword: '請重新輸入!'
            }));            
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="profile-container">
            <div className="profile-header">
                <h1>修改密碼</h1>
                <button onClick={() => navigate('/profile')} className="btn btn-secondary">
                    返回
                </button>
            </div>

            <div className="update-profile-content">
                <div className="password-update-section">
                    <h2>更換您的密碼</h2>
                    <p className="password-instructions">
                        基於安全的原因，請先入您的舊密碼，之後輸入一組新密碼。
                    </p>

                    {error && <div className="error-message">{error}</div>}
                    {success && <div className="success-message">{success}</div>}

                    <form onSubmit={handleSubmit} className="password-form">
                        <div className="form-group">
                            <label htmlFor="oldPassword">舊密碼</label>
                            <input
                                type="password"
                                id="oldPassword"
                                name="oldPassword"
                                value={passwordData.oldPassword}
                                onChange={handlePasswordChange}
                                className={validationErrors.oldPassword ? 'error' : ''}
                            />
                            {validationErrors.oldPassword && (
                                <span className="field-error">{validationErrors.oldPassword}</span>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="newPassword">新密碼</label>
                            <input
                                type="password"
                                id="newPassword"
                                name="newPassword"
                                value={passwordData.newPassword}
                                onChange={handlePasswordChange}
                                className={validationErrors.newPassword ? 'error' : ''}
                            />
                            {validationErrors.newPassword && (
                                <span className="field-error">{validationErrors.newPassword}</span>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword">確認新密碼</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={passwordData.confirmPassword}
                                onChange={handlePasswordChange}
                                className={validationErrors.confirmPassword ? 'error' : ''}
                            />
                            {validationErrors.confirmPassword && (
                                <span className="field-error">{validationErrors.confirmPassword}</span>
                            )}
                        </div>

                        <div className="form-buttons">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={loading}
                            >
                                {loading ? '送出中...' : '送出'}
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate('/profile')}
                                className="btn btn-secondary"
                            >
                                取消
                            </button>
                        </div>
                    </form>
                </div>

                <div className="password-guidelines">
                    <h3>密碼修改規則</h3>
                    <ul>
                        <li>新的密碼長度至少6碼。</li>
                        <li>混合字母、數字與特殊符號。</li>
                        <li>避免使用容易猜測的資訊。</li>
                        <li>不要重複使用與其他帳號相同的密碼。</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default UpdateProfile