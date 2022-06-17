import { FC } from "react";

import LinkContainer from "./LinkContainer";

const MikesComp: FC = () => {
  return (
    <div>
      <div style={{ display: "flex", alignContent: "center", alignItems: "center", padding: "10px" }}>
        <div style={{ width: "50%", height: "200px", margin: "5px", textAlign: "right" }}>
          <img
            src="https://d15eaq7suqjqg5.cloudfront.net/images/TsWmkQYjW7sLdVoZLjOoEzBuWyxVw2imOCk6PG4Nb6WjBmH.jpeg?Expires=1650223322&Signature=jzesiao2E~BwDFS8K2WQNu4wFjBlRicsP-2qJbhXs2R64XlquVuS2CEwrG-AHvr85lldGvLDUSqhgAToVEQdSl5nHvLcjhixec~8ZYZ5dPoqeugTuZE3NILPPKparHax0LOBya6axz5eiHGyiCI09isF2pMySG~l~cgsl94Z69i1fvvVK-3oNTx2Gh2GoihhOB6AdNByS41vy9zELcAuhXCdA-DZTVtYZYIJt-lzAd4bAxGzq7viaGNb2FcwTuLceeZMXvOsvfoeIxf-H2jXE8Sq9WVjTubYOU5uLkxV7rAs768v~SAdw1Rtjoz9tifiQ5L0cCoo~b-TbbVgzuTQog__&Key-Pair-Id=APKAIGSEBRMBHAXES2WQ"
            alt="PROFILE PIC"
            height={"190px"}
            style={{ borderRadius: "10px" }}
          />
        </div>
        <div style={{ width: "50%", alignContent: "left" }}>
          <div style={{ display: "flex", width: "40%", height: "100px", alignContent: "center", alignItems: "center" }}>
            <div style={{ margin: "5px" }}>
              <img
                src="https://outandaboutnow.com/wp-content/uploads/2021/01/Twitter-Logo.png"
                alt="PROFILE PIC"
                height={"70px"}
              />
            </div>
            <div style={{ margin: "5px" }}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/800px-Instagram_logo_2016.svg.png"
                alt="PROFILE PIC"
                height={"70px"}
              />
            </div>
          </div>
          <div style={{ display: "flex", width: "40%", height: "100px", alignContent: "center", alignItems: "center" }}>
            <div style={{ margin: "5px" }}>
              <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="PROFILE PIC" height={"70px"} />
            </div>
            <div style={{ margin: "5px" }}>
              <img
                src="https://cdn3.iconfinder.com/data/icons/capsocial-round/500/facebook-512.png"
                alt="PROFILE PIC"
                height={"70px"}
              />
            </div>
          </div>
        </div>
      </div>
      <div style={{ alignContent: "center", alignItems: "center", padding: "10px" }}>
        <p style={{ fontSize: "large" }}>
          Welcome to my lynktree. This is where you can learn all about me without knowing a thing about who I am.
        </p>
        <p style={{ fontSize: "large" }}>Scroll down, stay awhile.</p>
      </div>
      <LinkContainer
        url="google.com"
        displayText="Google"
        displayImage="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAHlBMVEVChfQ0qFPqQzX7vAUrif7zPRTpNTf8wwD/vQAPpleR1yqTAAABA0lEQVR4nO3QNwEAMAADoO7h33BN5OgBEiglZsyWsnZPObfG5K5kyZIlS5YsWbJkyZIlS5YsWbJkyZIlS5YsWbJkyZIlS5YsWbJkyZIlS5YsWbJkyZIlS5YsWbJkyZIlS5YsWbJkyZIlS5YsWbJkyZIlS5YsWbJkyZIlS5YsWbJkyZIlS5YsWbJkyZIlS5YsWbJkyZIlS5YsWbJkyZIlS5YsWbJkyZIlS5YsWbJkyZIlS5YsWbJkyZIlS5YsWbJkyZIlS5YsWbJkyZIlS5YsWbJkyZIlS5YsWbJkyZIlS5YsWbJkyZIlS5YsWbJkyZIlS5YsWbJkyZIlS5YsWbJkyfoq6wFngTnAYsw/XAAAAABJRU5ErkJggg=="
      />
      <LinkContainer
        url="amazon.com"
        displayText="Amazon"
        displayImage="https://m.media-amazon.com/images/G/01/AdProductsWebsite/images/AUX/01_amazon_smile_RGB_SQUID._TTW_.png"
      />
      <LinkContainer
        url="facebook.com"
        displayText="Facebook"
        displayImage="https://media.wired.com/photos/5954a23cce3e5e760d52d91a/master/w_2560%2Cc_limit/facebook_2015_logo.jpg"
      />
      <LinkContainer
        url="twitter.com"
        displayText="Twitter"
        displayImage="https://education.howthemarketworks.com/wp-content/uploads/2019/04/twitter-logo.png"
      />
      <LinkContainer
        url="youtube.com"
        displayText="YouTube"
        displayImage="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/2560px-YouTube_full-color_icon_%282017%29.svg.png"
      />
    </div>
  );
};

export default MikesComp;
