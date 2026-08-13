import { useState,useEffect, useRef } from "react";
import { apiService } from "../services/api";

const Profile = () => {

    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const fileInputRef = useRef(null);

    const getLowerCaseClassName = (value) => {
        return typeof value === 'string' ? value.toLowerCase() : 'unknown';
    };

    const formatAmount = (amount) => {
        const numericAmount = Number(amount);
        return Number.isFinite(numericAmount) ? Math.abs(numericAmount).toFixed(2) : '0.00';
    };

    useEffect(() => {
        fetchUserProfile();
    },[]);

    const fetchUserProfile = async () => {
        setLoading(true);
        setError('');

        try{
            const response = await apiService.getMyProfile();
            
            if(response.data.statusCode === 200){
                setUserData(response.data.data);
            }else{
                setError(response.data.message);
            }

        }catch (error) {
            setError(error.response?.data?.message || '讀取個人資料發生錯誤!');
        }finally{
            setLoading(false);    
        };
    };

    const uploadProfilePicture = async (file) => {
        setUploading(true);
        setSuccess('');
        setError('');

        try{
            const response = await apiService.uploadProfilePicture(file);

            if(response.data.statusCode === 200){
                setSuccess('頭像上傳成功!');
                await fetchUserProfile();

                setTimeout(() => {
                    setSuccess('');
                }, 4000);
            }

        } catch (error) {
            setError(error.response?.data.message || '上傳頭像發生錯誤!' );
        }finally{
            setUploading(false);
        }
    };

    const handleFileSelect = (event) => {
        const file = event.target.files[0];

        if(file){
            if(!file.type.startsWith('image/')){
                setError("請選擇圖片檔案格式");
                return;
            };
            
            if(file.size > 5 * 1024 * 1024){
                setError("圖片大小必須小於5MB");
                return;
            }

            uploadProfilePicture(file);
        };
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    if (loading) {
        return (
            <div className="profile-container">
                <div className="loading">讀取個人資料中...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="profile-container">
                <div className="error-message">{error}</div>
            </div>
        );
    }

    if (!userData) {
        return (
            <div className="profile-container">
                <div className="error-message">無個人資訊</div>
            </div>
        );
    }

      return (
        <div className="profile-container">
            <div className="profile-header">
                <h1>會員中心</h1>
                <a href="/change-password" className="btn btn-primary">更換密碼</a>
            </div>

            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <div className="profile-content">
                <div className="profile-picture-section">
                    <h2>頭像</h2>
                    <div className="profile-picture-upload">
                        <div className="profile-picture">
                            <img
                                src={userData.profilePictureUrl}
                                alt="Profile"
                            />
                        </div>

                        <div className="upload-controls">
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileSelect}
                                accept="image/*"
                                style={{ display: 'none' }}
                            />

                            <button
                                onClick={triggerFileInput}
                                className="btn btn-primary"
                                disabled={uploading}
                            >
                                {uploading ? '讀取中...' : '更換頭像'}
                            </button>

                        </div>

                        <p className="upload-note">
                            支援格式: JPG, PNG, GIF. 檔案大小上限: 5MB
                        </p>
                    </div>
                </div>

                <div className="profile-info">
                    <h2>個人資訊</h2>
                    <div className="info-grid">
                        <div className="info-item">
                            <label>姓氏</label>
                            <p>{userData.lastName || '找不到內容'}</p>
                        </div>                        
                        <div className="info-item">
                            <label>名子</label>
                            <p>{userData.firstName || '找不到內容'}</p>
                        </div>
                        <div className="info-item">
                            <label>Email</label>
                            <p>{userData.email || '找不到內容'}</p>
                        </div>
                        <div className="info-item">
                            <label>電話號碼</label>
                            <p>{userData.phoneNumber || '找不到內容'}</p>
                        </div>
                        <div className="info-item">
                            <label>狀態</label>
                            <p className={userData.active ? 'status active' : 'status inactive'}>
                                {userData.active ? '已驗證' : '未驗證'}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="accounts-section">
                    <h2>帳戶資訊</h2>
                    {userData.accounts && userData.accounts.length > 0 ? (
                        userData.accounts.map(account => (
                            <div key={account.id} className="account-card">
                                <div className="account-header">
                                    <h3>{account.accountTypeName || '未知'} </h3>
                                    <span className={`status ${getLowerCaseClassName(account.status)}`}>
                                        {account.accountStatusName || 'UNKNOWN'}
                                    </span>
                                </div>
                                <div className="account-details">
                                    <div className="account-number">
                                        <label>帳戶編號</label>
                                        <p>{account.accountNumber}</p>
                                    </div>
                                    <div className="account-balance">
                                        <label>餘額</label>
                                        <p>{account.currency || ''} {formatAmount(account.balance)}</p>
                                    </div>
                                    <div className="account-created">
                                        <label>建立日期</label>
                                        <p>{new Date(account.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </div>

                                <div className="transactions-section">
                                    <h4>最近交易紀錄</h4>
                                    {account.transactions && account.transactions.length > 0 ? (
                                        <div className="transactions-list">
                                            {account.transactions.slice(0, 5).map(transaction => (
                                                <div key={transaction.id} className="transaction-item">
                                                    <div className="transaction-info">
                                                        <span className="transaction-type">{transaction.transactionTypeName}</span>
                                                        <span className="transaction-date">
                                                            {new Date(transaction.transactionDate).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                    <div className="transaction-details">
                                                        <p className="transaction-description">{transaction.description}</p>
                                                        <p className={`transaction-amount ${getLowerCaseClassName(transaction.transactionType + transaction.entryDirection)}`}>
                                                            {transaction.transactionType === 'WITHDRAWAL' ||
                                                                (transaction.transactionType === 'TRANSFER' && transaction.entryDirection === "DEBIT") ? '-' : '+'}
                                                            {account.currency || ''} {formatAmount(transaction.amount)}
                                                        </p>
                                                    </div>
                                                    {transaction.sourceAccount && transaction.destinationAccount && (
                                                        <div className="transaction-accounts">
                                                            <small>
                                                                From: {transaction.sourceAccount} → To: {transaction.destinationAccount}
                                                            </small>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p>沒有交易紀錄</p>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>無帳號資訊</p>
                    )}
                </div>
            </div>
        </div>
    );
};
export default Profile;
