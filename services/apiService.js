import axios from "axios";

export const resendEmail = async (at) => {
  console.log(`Resend action taken`);
  // let accessToken = sessionStorage["accessToken"];

  const returnData = {};
  try {
    const url =
      "https://email-notification-backend.vercel.app/sendverificationemail";
    console.log(`Trying to send verification email.`);

    // Create the headers
    let headers = {};
    headers["Content-Type"] = "application/json";
    headers["Authorization"] = `Bearer ${at}`;

    const response = await axios.post(
      url,
      {},
      {
        headers,
      }
    );
    // setEmailMessage("Verification Email has been sent again.");
    // console.log(`Email Verification Response: ${JSON.stringify(response.data)} );

    returnData.data = await response.data;
  } catch (e) {
    // console.log(`Unable to send API call, ${JSON.stringify(e, null, 4)}`);
    throw e;
    returnData.data = e;
  }
  return returnData;
};

export const isEmailVerified = async (at) => {
  let url =
    "https://email-notification-backend.vercel.app/getemailverificationstatus";

  let returnData = {};

  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${at}`,
      },
    });
    // console.log(
    //   `Email Verification Status from API service: ${response.data.status}`
    // );
    returnData.status = await response.data.status;

    // if (response.data.status == "true") {
    //   setVerifyStatus("VERIFIED");
    //   clearInterval(intervalId.id);
    // }
  } catch (e) {
    console.log(
      `Unable to get Email Verification Status: ${JSON.stringify(e)}`
    );
    returnData.status = e;
  }
  return returnData;
};
