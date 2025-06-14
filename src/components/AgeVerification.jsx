import React, { useState } from 'react';

const AgeVerification = ({ onVerified }) => {
  const [birthDate, setBirthDate] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [activeTab, setActiveTab] = useState('terms');

  // Theme colors for paper and tequila theme
  const paperColor = '#faf8f0'; // Off-white paper color
  const paperBorderColor = '#d9d2c5'; // Paper border/edge color
  const textPrimary = '#2c2415'; // Dark brown for text
  const accentColor = '#8b4513'; // Wooden brown for accents
  const goldenAccent = '#c19d53'; // Gold for highlights

  const verifyAge = () => {
    if (!birthDate) {
      alert('Please enter your birth date');
      return;
    }

    if (!termsAccepted) {
      alert('Please accept the terms and conditions to continue');
      return;
    }

    setIsVerifying(true);
    setTimeout(() => {
      const today = new Date();
      const birth = new Date(birthDate);
      let age = today.getFullYear() - birth.getFullYear();
      const monthDiff = today.getMonth() - birth.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
      }
      
      if (age >= 21) {
        onVerified();
      } else {
        alert('You must be 21 or older to access this website.');
      }
      setIsVerifying(false);
    }, 800);
  };

  return (
    <>
      <div className="age-verification-container">
        {/* Wooden Container Background - Different for mobile/desktop */}
        <div className="wooden-container">
          {/* Desktop image */}
          <img 
            src="/age.jpg" 
            alt="Wooden Tequila Box" 
            className="wooden-box-image desktop-bg"
          />
          {/* Mobile image */}
          <img 
            src="/mobage.jpg" 
            alt="Wooden Tequila Box" 
            className="wooden-box-image mobile-bg"
          />
        </div>
        
        {/* Paper on top of the wooden container */}
        <div className="paper-container">
          <div className="paper-content">
            <div className="paper-header">
              <div className="logo-container">
                <img 
                  src="/logoo.png" 
                  alt="Ladrillo de Cristal Puro" 
                  className="tequila-logo"
                />
              </div>
              <h1 className="paper-title">AGE VERIFICATION</h1>
              <div className="paper-divider" />
              <p className="paper-subtitle">
                To access Ladrillo de Cristal Puro, please verify your age
              </p>
              <p className="age-requirement">
                You must be at least 21 years old to enter this website
              </p>
            </div>
            
            <div className="paper-body">
              <div className="input-group">
                <label className="input-label">DATE OF BIRTH</label>
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="date-input"
                />
              </div>
              
              <div className="terms-group">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border"
                    style={{ accentColor: goldenAccent }}
                  />
                  <span className="terms-text">
                    I have read and agree to the{' '}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowTermsModal(true);
                      }}
                      className="terms-link"
                    >
                      Terms and Conditions
                    </button>
                  </span>
                </label>
              </div>
              
              <button
                onClick={verifyAge}
                disabled={isVerifying}
                className="verify-button"
              >
                {isVerifying ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    VERIFYING...
                  </span>
                ) : (
                  "ENTER SITE"
                )}
              </button>
              
              <p className="responsible-text">
                Please enjoy responsibly
              </p>
            </div>
          </div>
          
          {/* Paper edge effect */}
          <div className="paper-edge"></div>
        </div>
      </div>

      {/* Terms and Conditions Modal */}
      {showTermsModal && (
        <div className="terms-modal">
          <div 
            className="terms-modal-backdrop"
            onClick={() => setShowTermsModal(false)}
          />
          <div className="terms-modal-content">
            <div className="terms-modal-header">
              <div className="tabs-container">
                <button
                  className={`tab-button ${activeTab === 'terms' ? 'active' : ''}`}
                  onClick={() => setActiveTab('terms')}
                >
                  Terms & Conditions
                </button>
                <button
                  className={`tab-button ${activeTab === 'privacy' ? 'active' : ''}`}
                  onClick={() => setActiveTab('privacy')}
                >
                  Privacy Policy
                </button>
              </div>
              <button
                onClick={() => setShowTermsModal(false)}
                className="terms-modal-close"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            <div className="terms-modal-body">
              {activeTab === 'terms' ? (
                <>
                  <div className="effective-date">
                    <strong>Effective Date:</strong> June 4, 2025
                  </div>
                  
                  <div className="terms-section">
                    <h3 className="terms-section-title">
                      1. Legal Drinking Age
                    </h3>
                    <p className="terms-section-text">
                      You must be of legal drinking age in your province, territory, or country of residence to access or purchase from this Website. By using ladrillocristalpuro.ca, you confirm that you are of legal age to consume alcohol. We reserve the right to request age verification and refuse service if it isn't met.
                    </p>
                  </div>
                  <div className="terms-section">
                    <h3 className="terms-section-title">
                      2. Ownership & Intellectual Property
                    </h3>
                    <p className="terms-section-text">
                      Everything on this Website — text, logos, images, videos, bottle designs, and other content — belongs to Ladrillo de Cristal Puro or its partners. You don't get a license to copy, use, distribute, or repost anything without written permission. Violations may result in legal action.
                    </p>
                  </div>
                  
                  <div className="terms-section">
                    <h3 className="terms-section-title">
                      3. Permitted Use
                    </h3>
                    <p className="terms-section-text">
                      Use this site like a civilized adult:
                      <ul>
                        <li>No hacking, scraping, or tampering.</li>
                        <li>No uploading malicious code or nonsense.</li>
                        <li>No violating any laws while on here.</li>
                      </ul>
                      We reserve the right to suspend or ban you if you abuse the platform.
                    </p>
                  </div>
                  
                  <div className="terms-section">
                    <h3 className="terms-section-title">
                      4. Product Information & Availability
                    </h3>
                    <p className="terms-section-text">
                      Prices, product details, and availability are subject to change without notice. We don't guarantee every product shown is always in stock. If something's out, deal with it — we'll restock when we can.
                    </p>
                  </div>
                  
                  <div className="terms-section">
                    <h3 className="terms-section-title">
                      5. Shipping & Delivery
                    </h3>
                    <p className="terms-section-text">
                      We only ship where it's legal to do so in Canada. Age verification is required upon delivery — if you can't prove you're legal age, the order's canceled and non-refundable. We don't ship outside Canada (yet), and we're not responsible for delays once your order leaves our hands.
                    </p>
                  </div>
                  
                  <div className="terms-section">
                    <h3 className="terms-section-title">
                      6. Returns & Refunds
                    </h3>
                    <p className="terms-section-text">
                      All alcohol sales are final. We don't offer returns unless there's a serious issue like a damaged or incorrect product. If that happens, email us at info@ladrillocristalpuro.ca within 7 days of receiving your order. Don't abuse the policy.
                    </p>
                  </div>
                  
                  <div className="terms-section">
                    <h3 className="terms-section-title">
                      7. No Warranties
                    </h3>
                    <p className="terms-section-text">
                      This Website is offered "as is" — no promises, no guarantees. We don't make claims about the accuracy, completeness, or uptime. You use it at your own risk.
                    </p>
                  </div>
                  
                  <div className="terms-section">
                    <h3 className="terms-section-title">
                      8. Limitation of Liability
                    </h3>
                    <p className="terms-section-text">
                      Ladrillo de Cristal Puro and its team aren't liable for any damages — direct, indirect, accidental, or otherwise — that come from using this Website, our products, or trusting content you read here.
                    </p>
                  </div>
                  
                  <div className="terms-section">
                    <h3 className="terms-section-title">
                      9. Indemnification
                    </h3>
                    <p className="terms-section-text">
                      If you screw something up using this Website or violate these Terms, you agree to defend, indemnify, and hold harmless Ladrillo de Cristal Puro from any claims, losses, legal fees, and damages.
                    </p>
                  </div>
                  
                  <div className="terms-section">
                    <h3 className="terms-section-title">
                      10. External Links
                    </h3>
                    <p className="terms-section-text">
                      We might link to other websites for convenience. Clicking those is on you — we don't control them, we don't endorse them, and we're not responsible for what they do with your info.
                    </p>
                  </div>
                  
                  <div className="terms-section">
                    <h3 className="terms-section-title">
                      11. Privacy
                    </h3>
                    <p className="terms-section-text">
                      We respect your privacy. For details on how we handle your data, check our Privacy Policy. Spoiler: we're not creepy about it.
                    </p>
                  </div>
                  
                  <div className="terms-section">
                    <h3 className="terms-section-title">
                      12. Governing Law
                    </h3>
                    <p className="terms-section-text">
                      This site operates under the laws of Ontario, Canada. Any legal disputes will be handled exclusively in the courts of Ontario.
                    </p>
                  </div>
                  
                  <div className="terms-section">
                    <h3 className="terms-section-title">
                      13. Updates to These Terms
                    </h3>
                    <p className="terms-section-text">
                      We may update these Terms at any time without notice. Changes take effect when posted. Keep checking if you care — by continuing to use the site, you agree to the new version.
                    </p>
                  </div>
                  
                  <div className="terms-section">
                    <h3 className="terms-section-title">
                      14. Contact Us
                    </h3>
                    <p className="terms-section-text">
                      Got questions? Want to yell at us? Here's how:
                      <br />
                      📧 info@ladrillocristalpuro.ca
                      <br />
                      📍 Ladrillo de Cristal Puro, Toronto, Ontario, Canada
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="effective-date">
                    <strong>Effective Date:</strong> June 4, 2025
                  </div>
                  
                  <div className="terms-section">
                    <h3 className="terms-section-title">
                      1. Introduction
                    </h3>
                    <p className="terms-section-text">
                      Welcome to ladrillocristalpuro.ca. Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use our Website or services.
                    </p>
                  </div>
                  
                  <div className="terms-section">
                    <h3 className="terms-section-title">
                      2. Information We Collect
                    </h3>
                    <p className="terms-section-text">
                      We may collect the following types of information:
                      <ul>
                        <li><strong>Personal Information:</strong> Name, email address, phone number, shipping and billing address, and age verification details.</li>
                        <li><strong>Payment Information:</strong> Processed securely by third-party payment processors. We do not store your credit card details.</li>
                        <li><strong>Technical Data:</strong> IP address, browser type, device information, and usage patterns via cookies and analytics tools.</li>
                      </ul>
                    </p>
                  </div>
                  
                  <div className="terms-section">
                    <h3 className="terms-section-title">
                      3. How We Use Your Information
                    </h3>
                    <p className="terms-section-text">
                      We use your information to:
                      <ul>
                        <li>Process and fulfill your orders</li>
                        <li>Verify your age and identity</li>
                        <li>Improve our Website and services</li>
                        <li>Send marketing emails (you can opt out anytime)</li>
                        <li>Comply with legal obligations</li>
                      </ul>
                    </p>
                  </div>
                  
                  <div className="terms-section">
                    <h3 className="terms-section-title">
                      4. Sharing Your Information
                    </h3>
                    <p className="terms-section-text">
                      We do not sell your personal information. We may share it with:
                      <ul>
                        <li>Trusted service providers (e.g. payment processors, delivery services)</li>
                        <li>Government authorities, if required by law</li>
                      </ul>
                    </p>
                  </div>
                  
                  <div className="terms-section">
                    <h3 className="terms-section-title">
                      5. Cookies and Tracking
                    </h3>
                    <p className="terms-section-text">
                      We use cookies and similar technologies to improve user experience and analyze site traffic. You can manage cookie settings in your browser.
                    </p>
                  </div>
                  
                  <div className="terms-section">
                    <h3 className="terms-section-title">
                      6. Data Security
                    </h3>
                    <p className="terms-section-text">
                      We take data protection seriously and use appropriate security measures to protect your personal information. However, no system is 100% secure, so use this Website at your own risk.
                    </p>
                  </div>
                  
                  <div className="terms-section">
                    <h3 className="terms-section-title">
                      7. Your Rights
                    </h3>
                    <p className="terms-section-text">
                      You have the right to:
                      <ul>
                        <li>Access your personal information</li>
                        <li>Request corrections</li>
                        <li>Request deletion, subject to legal limits</li>
                        <li>Withdraw consent to marketing communications</li>
                      </ul>
                    </p>
                  </div>
                  
                  <div className="terms-section">
                    <h3 className="terms-section-title">
                      8. Third-Party Links
                    </h3>
                    <p className="terms-section-text">
                      Our Website may contain links to external sites. We are not responsible for the privacy practices of other websites. Check their policies separately.
                    </p>
                  </div>
                  
                  <div className="terms-section">
                    <h3 className="terms-section-title">
                      9. Changes to This Policy
                    </h3>
                    <p className="terms-section-text">
                      We may update this Privacy Policy from time to time. Updates will be posted here with a new effective date. Continued use of the Website means you accept the revised policy.
                    </p>
                  </div>
                  
                  <div className="terms-section">
                    <h3 className="terms-section-title">
                      10. Contact Us
                    </h3>
                    <p className="terms-section-text">
                      If you have any questions about this Privacy Policy, contact us at:
                      <br />
                      📧 info@ladrillocristalpuro.ca
                      <br />
                      📍 Ladrillo de Cristal Puro, Toronto, Ontario, Canada
                    </p>
                  </div>
                </>
              )}
            </div>
            
            <div className="terms-modal-footer">
              <button
                onClick={() => setShowTermsModal(false)}
                className="terms-modal-button"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      
      <style jsx>{`
        .age-verification-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          z-index: 10000;
          background: rgba(0, 0, 0, 0.7);
        }
        
        .wooden-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1;
        }
        
        .wooden-box-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        /* Hide mobile bg by default */
        .mobile-bg {
          display: none;
        }
        
        .paper-container {
          position: relative;
          z-index: 2;
          width: 85%;
          max-width: 380px; /* Smaller container */
          padding: 12px;
          top: 20px;
          background: ${paperColor};
          border-radius: 2px;
          box-shadow: 
            0 10px 30px rgba(0, 0, 0, 0.2),
            inset 0 0 0 1px rgba(0, 0, 0, 0.05),
            0 1px 3px rgba(0, 0, 0, 0.1);
          transform: rotate(0.5deg);
        }
        
        .paper-content {
          position: relative;
          z-index: 3;
          padding: 20px;
          background: ${paperColor};
          border: 1px solid ${paperBorderColor};
          box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.05);
        }
        
        .paper-edge {
          position: absolute;
          bottom: -5px;
          left: 5%;
          width: 90%;
          height: 8px;
          background: ${paperBorderColor};
          border-radius: 0 0 3px 3px;
          z-index: 2;
          box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
        }
        
        .paper-header {
          text-align: center;
          margin-bottom: 15px;
        }
        
        .logo-container {
          margin-bottom: 15px;
          display: flex;
          justify-content: center;
        }
        
        .tequila-logo {
          height: 60px;
          width: auto;
          max-width: 100%;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
        }
        
        .paper-title {
          font-size: 20px;
          font-weight: 700;
          letter-spacing: 1px;
          margin-bottom: 10px;
          color: ${textPrimary};
          text-transform: uppercase;
        }
        
        .paper-divider {
          height: 2px;
          width: 60%;
          margin: 0 auto 10px;
          background: linear-gradient(to right, transparent, ${goldenAccent}, transparent);
          border-radius: 2px;
        }
        
        .paper-subtitle {
          font-size: 14px;
          color: ${textPrimary};
          line-height: 1.4;
          margin-bottom: 5px;
          font-weight: 500;
        }
        
        .age-requirement {
          font-size: 13px;
          color: ${textPrimary};
          margin-top: 10px;
          font-weight: 500;
          font-style: italic;
        }
        
        .paper-body {
          padding: 10px 0;
        }
        
        .input-group {
          margin-bottom: 18px;
        }
        
        .input-label {
          display: block;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 1px;
          margin-bottom: 8px;
          color: ${textPrimary};
          text-transform: uppercase;
          text-align: center;
        }
        
        .date-input {
          width: 100%;
          padding: 12px;
          background: #fff;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 15px;
          color: ${textPrimary};
          transition: all 0.3s ease;
          text-align: center;
        }
        
        .date-input:focus {
          outline: none;
          border-color: ${goldenAccent};
          box-shadow: 0 0 0 3px rgba(193, 157, 83, 0.2);
        }
        
        .terms-group {
          margin-bottom: 20px;
        }
        
        .terms-text {
          font-size: 13px;
          color: ${textPrimary};
          line-height: 1.5;
          text-align: center;
          display: block;
        }
        
        .terms-link {
          color: ${accentColor};
          text-decoration: underline;
          transition: all 0.2s ease;
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          font: inherit;
          font-weight: 600;
          display: inline;
        }
        
        .terms-link:hover {
          color: ${goldenAccent};
          text-decoration: none;
        }
        
        .verify-button {
          position: relative;
          width: 100%;
          padding: 12px 20px;
          background: ${accentColor};
          color: #fff;
          border: none;
          border-radius: 6px;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 1px;
          cursor: pointer;
          transition: all 0.3s ease;
          overflow: hidden;
          margin-top: 10px;
        }
        
        .verify-button:hover:not(:disabled) {
          background: #6b3810;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(139, 69, 19, 0.3);
        }
        
        .verify-button:disabled {
          cursor: not-allowed;
          opacity: 0.7;
          background: #a0a0a0;
        }
        
        .responsible-text {
          font-size: 12px;
          color: ${textPrimary};
          text-align: center;
          margin-top: 20px;
          font-style: italic;
          opacity: 0.8;
        }
        
        /* Terms Modal Styles */
        .terms-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 20000;
        }
        
        .terms-modal-backdrop {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(5px);
        }
        
        .terms-modal-content {
          position: relative;
          width: 90%;
          max-width: 600px;
          max-height: 80vh;
          background: ${paperColor};
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
          z-index: 2;
          display: flex;
          flex-direction: column;
        }
        
        .terms-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          background: ${accentColor};
          color: white;
          border-bottom: 1px solid ${paperBorderColor};
        }
        
        .tabs-container {
          display: flex;
          gap: 10px;
        }
        
        .tab-button {
          padding: 8px 16px;
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.7);
          font-weight: 600;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 14px;
        }
        
        .tab-button.active {
          background: rgba(255, 255, 255, 0.2);
          color: white;
        }
        
        .terms-modal-close {
          background: transparent;
          border: none;
          color: white;
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          transition: background 0.2s;
        }
        
        .terms-modal-close:hover {
          background: rgba(255, 255, 255, 0.2);
        }
        
        .terms-modal-body {
          padding: 20px;
          overflow-y: auto;
          flex: 1;
        }
        
        .effective-date {
          text-align: center;
          margin-bottom: 20px;
          font-size: 14px;
          color: ${textPrimary};
          opacity: 0.8;
        }
        
        .terms-section {
          margin-bottom: 20px;
        }
        
        .terms-section-title {
          font-size: 16px;
          margin-bottom: 8px;
          color: ${accentColor};
        }
        
        .terms-section-text {
          font-size: 14px;
          line-height: 1.6;
          color: ${textPrimary};
        }
        
        .terms-section ul {
          padding-left: 20px;
          margin-top: 8px;
          margin-bottom: 8px;
        }
        
        .terms-section li {
          margin-bottom: 6px;
          font-size: 14px;
        }
        
        .terms-modal-footer {
          padding: 16px 20px;
          display: flex;
          justify-content: flex-end;
          border-top: 1px solid ${paperBorderColor};
          background: #f5f1e8;
        }
        
        .terms-modal-button {
          padding: 10px 24px;
          background: ${accentColor};
          color: white;
          border: none;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }
        
        .terms-modal-button:hover {
          background: #6b3810;
        }
        
        /* Responsive background images */
        @media (max-width: 768px) {
          .desktop-bg {
            display: none;
          }
          
          .mobile-bg {
            display: block;
          }
        }
        
        @media (min-width: 769px) {
          .desktop-bg {
            display: block;
          }
          
          .mobile-bg {
            display: none;
          }
        }
        
        /* Mobile Responsiveness */
        @media (max-width: 768px) {
          .paper-container {
            width: 85%;
            max-width: 340px;
            padding: 10px;
            margin-top: 38px;
            margin-right: 10px;
          }
          
          .paper-content {
            padding: 18px 15px;
          }
          
          .paper-title {
            font-size: 18px;
          }
          
          .paper-subtitle {
            font-size: 13px;
          }
          
          .age-requirement {
            font-size: 12px;
          }
          
          .tequila-logo {
            height: 50px;
          }
          
          .date-input {
            padding: 10px;
            font-size: 14px;
          }
          
          .verify-button {
            padding: 12px 15px;
            font-size: 14px;
          }
          
          .terms-text {
            font-size: 12px;
          }
          
          .terms-modal-content {
            width: 95%;
            max-height: 85vh;
          }
          
          .terms-modal-header {
            padding: 12px 16px;
          }
          
          .tab-button {
            font-size: 13px;
            padding: 6px 12px;
          }
          
          .terms-modal-body {
            padding: 16px;
          }
        }
        
        @media (max-width: 480px) {
          .paper-container {
            width: 90%;
            max-width: 320px;
            padding: 8px;
          }
          
          .paper-content {
            padding: 16px 12px;
          }
          
          .paper-title {
            font-size: 17px;
            margin-bottom: 8px;
          }
          
          .paper-subtitle {
            font-size: 12px;
          }
          
          .age-requirement {
            font-size: 11px;
          }
          
          .tequila-logo {
            height: 45px;
          }
          
          .paper-divider {
            margin-bottom: 8px;
          }
          
          .input-label {
            font-size: 11px;
          }
          
          .date-input {
            padding: 10px;
            font-size: 13px;
          }
          
          .verify-button {
            padding: 11px;
            font-size: 13px;
          }
          
          .terms-text {
            font-size: 11px;
          }
          
          .responsible-text {
            font-size: 11px;
          }
          
          .terms-modal-content {
            width: 95%;
          }
          
          .tab-button {
            font-size: 12px;
            padding: 5px 8px;
          }
        }
        
        @media (max-height: 700px) {
          .paper-container {
            transform: scale(0.9);
            transform-origin: center;
          }
        }
      `}</style>
    </>
  );
};

export default AgeVerification;