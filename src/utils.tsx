/*
fetch("https://managedservices-preprod.rteappbuilder.com/v1/query", {
  "headers": {
    "accept": "*",
    "accept-language": "en-US,en;q=0.9",
    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoZW50aWNhdGlvbl90eXBlIjowLCJhcHBfaWQiOiIyNDJlM2NjNGFmZjI0OGExOWExZDI2YzhmNjk1OTBlMCIsInVzZXJfaWQiOiI0OGMwMmNmNC04NTFjLTQxNjAtOGUwNi02OGY5MzU1ODY0YjAiLCJwcm9qZWN0X2lkIjoiZDkwNGM5Y2ZhM2NmODAwMDFlZmIiLCJleHAiOjE2ODg3Mjg2NDJ9.BhBCQOlVSBj2LvZ_szrK2OFwva2Fp7DVs3hznq5r4zo",
    "content-type": "application/json",
    "sec-ch-ua": "\"Chromium\";v=\"110\", \"Not A(Brand\";v=\"24\", \"Brave\";v=\"110\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Linux\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site",
    "sec-gpc": "1",
    "x-platform-id": "turnkey_web",
    "x-project-id": "d904c9cfa3cf80001efb"
  },
  "referrer": "http://localhost:9000/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": "{\"operationName\":\"JoinChannel\",\"variables\":{\"passphrase\":\"46d44bbc-3ba7-4ae5-aa64-c70cf39a12b8\"},\"query\":\"query JoinChannel($passphrase: String!) {\\n  joinChannel(passphrase: $passphrase) {\\n    channel\\n    title\\n    isHost\\n    secret\\n    mainUser {\\n      rtc\\n      rtm\\n      uid\\n      __typename\\n    }\\n    screenShare {\\n      rtc\\n      rtm\\n      uid\\n      __typename\\n    }\\n    __typename\\n  }\\n  getUser {\\n    name\\n    email\\n    __typename\\n  }\\n}\\n\"}",
  "method": "POST",
  "mode": "cors",
  "credentials": "include"
});
 */

export const fetchMeetingData = async (meetingId: string) => {
  const response = await fetch(
    "https://managedservices-preprod.rteappbuilder.com/v1/query",
    {
      headers: {
        accept: "*",
        "accept-language": "en-US,en;q=0.9",
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoZW50aWNhdGlvbl90eXBlIjowLCJhcHBfaWQiOiIyNDJlM2NjNGFmZjI0OGExOWExZDI2YzhmNjk1OTBlMCIsInVzZXJfaWQiOiI0OGMwMmNmNC04NTFjLTQxNjAtOGUwNi02OGY5MzU1ODY0YjAiLCJwcm9qZWN0X2lkIjoiZDkwNGM5Y2ZhM2NmODAwMDFlZmIiLCJleHAiOjE2ODg3Mjg2NDJ9.BhBCQOlVSBj2LvZ_szrK2OFwva2Fp7DVs3hznq5r4zo",
        "content-type": "application/json",
        "sec-ch-ua":
          '"Chromium";v="110", "Not A(Brand";v="24", "Brave";v="110"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site",
        "sec-gpc": "1",
        "x-platform-id": "turnkey_web",
        "x-project-id": "d904c9cfa3cf80001efb",
      },
      referrer: "http://localhost:9000/",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: `{\"operationName\":\"JoinChannel\",\"variables\":{\"passphrase\":\"${meetingId}\"},\"query\":\"query JoinChannel($passphrase: String!) {\\n  joinChannel(passphrase: $passphrase) {\\n    channel\\n    title\\n    isHost\\n    secret\\n    mainUser {\\n      rtc\\n      rtm\\n      uid\\n      __typename\\n    }\\n    screenShare {\\n      rtc\\n      rtm\\n      uid\\n      __typename\\n    }\\n    __typename\\n  }\\n  getUser {\\n    name\\n    email\\n    __typename\\n  }\\n}\\n\"}`,
      method: "POST",
      mode: "cors",
      credentials: "include",
    }
  );
  // fetch(
  //   "https://managedservices-preprod.rteappbuilder.com/v1/query",
  //   {
  //     headers: {
  //       accept: "*/*",
  //       "accept-language": "en-US,en;q=0.9,hi;q=0.8",
  //       "content-type": "application/json",
  //       "sec-ch-ua":
  //         '"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',
  //       "sec-ch-ua-mobile": "?0",
  //       "sec-ch-ua-platform": '"Linux"',
  //       "sec-fetch-dest": "empty",
  //       "sec-fetch-mode": "cors",
  //       "sec-fetch-site": "cross-site",
  //     },
  //     referrer: "http://localhost:5173/",
  //     referrerPolicy: "strict-origin-when-cross-origin",
  //     body: `{"operationName":"JoinChannel","variables":{"passphrase":"${meetingId}"},"query":"query JoinChannel($passphrase: String!) {\\n  joinChannel(passphrase: $passphrase) {\\n    channel\\n    title\\n    isHost\\n    secret\\n    mainUser {\\n      rtc\\n      rtm\\n      uid\\n      __typename\\n    }\\n    screenShare {\\n      rtc\\n      rtm\\n      uid\\n      __typename\\n    }\\n    __typename\\n  }\\n}"}`,
  //     method: "POST",
  //     mode: "cors",
  //     credentials: "omit",
  //   }
  // );
  let data = await response.json();
  data = data.data;
  let meetingInfo: any = {};

  if (data?.joinChannel?.channel) {
    meetingInfo.channel = data.joinChannel.channel;
  }
  if (data?.joinChannel?.mainUser?.uid) {
    meetingInfo.uid = data.joinChannel.mainUser.uid;
  }
  if (data?.joinChannel?.mainUser?.rtc) {
    meetingInfo.token = data.joinChannel.mainUser.rtc;
  }
  if (data?.joinChannel?.mainUser?.rtm) {
    meetingInfo.rtmToken = data.joinChannel.mainUser.rtm;
  }
  if (data?.joinChannel?.secret) {
    meetingInfo.encryptionSecret = data.joinChannel.secret;
  }
  if (data?.joinChannel?.screenShare?.uid) {
    meetingInfo.screenShareUid = data.joinChannel.screenShare.uid;
  }
  if (data?.joinChannel?.screenShare?.rtc) {
    meetingInfo.screenShareToken = data.joinChannel.screenShare.rtc;
  }
  if (data?.joinChannel?.isHost) {
    meetingInfo.isHost = data.joinChannel.isHost;
  }
  if (data?.joinChannel?.title) {
    meetingInfo.meetingTitle = data.joinChannel.title;
  }

  return meetingInfo;
};
