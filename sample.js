// Resend Email Verification
const resend = async () => {
  console.log(`Resend function has been clicked`);
  let accessToken = sessionStorage["accessToken"];
  try {
    const url =
      "https://email-notification-backend.vercel.app/sendverificationemail";
    console.log(`Trying to send verification email.`);

    // Create the headers
    let headers = {};
    headers["Content-Type"] = "application/json";
    headers["Authorization"] = `Bearer ${accessToken}`;

    const response = axios.post(
      url,
      {},
      {
        headers,
      }
    );
    setEmailMessage("Verification Email has been sent");
    console.log(`Email Verification Response: ${response.data}`);
  } catch (e) {
    console.log(`Unable to send API call, ${JSON.stringify(e, null, 4)}`);
  }
};

const getEmailVerificationStatus = async () => {
  //Get Access Token from storage
  let accessToken = sessionStorage["accessToken"];
  // console.log(`Token from Storage: ${accessToken}`);
  // Get Email Verification Status
  // console.log(accessToken);
  let url =
    "https://email-notification-backend.vercel.app/getemailverificationstatus";

  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(
      `Email Verification Status: ${JSON.stringify(response.data.status)}`
    );
    if (response.data.status == "true") {
      setVerifyStatus("VERIFIED");
    }
  } catch (e) {
    console.log(
      `Unable to get Email Verification Status: ${JSON.stringify(e)}`
    );
  }
};

const initialize = async () => {
  try {
    const token = await getAccessTokenSilently();
    console.log(`Obtained Access Token: ${token}`);
    sessionStorage.setItem("accessToken", token);
  } catch (e) {
    console.log(`Unable to get Access Token: ${JSON.stringify(e)}`);
  }
};

useEffect(() => {
  initialize();
  getEmailVerificationStatus();

  // Start the Email Verification Interval
  let intervalId = setInterval(getEmailVerificationStatus, 3000);
}, []);
