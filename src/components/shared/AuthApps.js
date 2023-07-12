import { React, useState } from 'react';
import { LoginSocialFacebook, LoginSocialGoogle } from 'reactjs-social-login';

function AuthApps() {
  const facebookAppId = process.env.FACEBOOK_APP_ID;
  const googleClientId = process.env.GOOGLE_CLIENT_ID;
  const [setProfile] = useState(null);

  return (
    <div className="d-flex justify-content-center">
      <LoginSocialFacebook
        appId={googleClientId}
        onResolve={(response) => {
          setProfile(response.data);
        }}
        onReject={(error) => {
          console.log(error);
        }}
      >
        <button
          type="submit"
          className="bg-transparent border-0 mx-3 color-1a75c3"
        >
          <i className="bi bi-facebook h1" />
        </button>
      </LoginSocialFacebook>
      <LoginSocialGoogle
        client_id={facebookAppId}
        scope="openid profile email"
        discoveryDocs="claims_supported"
        access_type="offline"
        onResolve={({ provider, data }) => {
          console.log(provider, data);
        }}
        onReject={(err) => {
          console.log(err);
        }}
      >
        <button
          type="submit"
          className="bg-transparent border-0 mx-3 color-152062"
        >
          <i className="bi bi-google h1" />
        </button>
      </LoginSocialGoogle>
    </div>
  );
}

export default AuthApps;
