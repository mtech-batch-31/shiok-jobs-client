import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import React from "react";
import { Container } from "react-bootstrap";
import "./styles/Home.css";




const PrivacyPolicy: React.FC = () => {

  return (
    <div className="container-main bg-light">
      
      <Container className="vw-80 d-flex">

      <div className="mt-5 mx-3 p-5 bg-white text-black mb-5">
      <h1 className="text-black">Privacy Policy</h1>
      ShiokJobs takes your privacy seriously. This policy explains how we collect, use, and protect your information when you use our platform.

      <h2 className="mt-4">What Information We Collect:</h2>

      Personal Information: This includes your name, contact details, and anything else that identifies you.
      Resume & Job History: You provide this when you create a profile.
      Usage Data: We collect information about how you use our platform, like search terms and browsing activity.
      Device Information: We collect basic information about your device, like your IP address and browser type.

      <h2 className="mt-4">Why We Collect Information:</h2>

      To provide and improve our services.
      To connect you with job opportunities.
      To personalize your experience on ShiokJobs.
      To send you important service updates (not marketing).
      To create anonymous reports to improve the platform.


      <h2 className="mt-4">How We Share Information:</h2>

      We may share your information with government agencies and authorized third-party service providers who help us run ShiokJobs. These providers are only allowed to use your information for the specific service they are performing.
      We may share anonymized data for reporting purposes.
      We will only share your personal information with your consent or if required by law.
      
      <h2 className="mt-4">Your Choices:</h2>

      You can opt out of marketing communications at any time.
      You can control cookies in your browser settings.
      
      <h2 className="mt-4">Security:</h2>

      We take steps to protect your information from unauthorized access and use.

      <h2 className="mt-4">External Websites:</h2>

      ShiokJobs may contain links to other websites. Their privacy practices may differ from ours. We recommend you review their privacy policies.

      <h2 className="mt-4">Updates to this Policy:</h2>

      We may update this policy from time to time.  Please check back for changes.

      <h2 className="mt-4">Age Requirement:</h2>

      ShiokJobs is for users 18 and over. If you are under 18, you must have parental consent to use the platform.

      <h2 className="mt-4">Contact Us:</h2>

      For questions about this policy, please contact us at <a href="mailto:support@shiokjobs.com">support@shiokjobs.com</a>

      </div>
      </Container>
    </div>
  );
};

export default PrivacyPolicy;
