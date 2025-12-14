import { ArrowLeft, User, PenSquare, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/EditProfile.css";

const EditProfile = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="edit-page scrollable-edit">   {/* <-- added scrollable-edit */}
      {/* Header */}
      <div className="edit-header">
        <div className="edit-curve" />
        <div className="edit-header-inner">
          <div className="edit-topbar">
            {/* Back arrow navigates to Settings */}
            <button
              className="edit-back-btn"
              onClick={() => navigate("/settings")}
            >
              <ArrowLeft className="edit-back-icon" />
            </button>

            <div className="edit-brand">
              <span className="edit-rupee">₹</span>
              <div>
                <h1 className="edit-title">TaxPal</h1>
                <p className="edit-subtitle">Personal Finance</p>
              </div>
            </div>
          </div>

          <div className="edit-heading">EDIT PROFILE</div>

          <div className="edit-icon">
            <PenSquare className="edit-pen" />
          </div>
        </div>
      </div>

      {/* Avatar */}
      <div className="edit-avatar-wrap">
        <div className="edit-avatar">
          <User className="edit-avatar-icon" />
        </div>
      </div>

      {/* Form */}
      <div className="edit-form">
        <div className="edit-row">
          <div className="edit-field">
            <label>First Name:</label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              className="edit-input"
            />
          </div>
          <div className="edit-field">
            <label>Last Name:</label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
              className="edit-input"
            />
          </div>
        </div>

        <div className="edit-field">
          <label>E-Mail:</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="edit-input"
          />
        </div>

        <div className="edit-field">
          <label>Change Password:</label>
          <div className="edit-password">
            <input
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              className="edit-input edit-password-input"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="edit-eye-btn"
            >
              {showPassword ? (
                <EyeOff className="edit-eye-icon" />
              ) : (
                <Eye className="edit-eye-icon" />
              )}
            </button>
          </div>
        </div>

        <div className="edit-submit">
          <button className="edit-update-btn">UPDATE</button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;