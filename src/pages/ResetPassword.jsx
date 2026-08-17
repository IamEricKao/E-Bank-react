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
}

export default ResetPassword;