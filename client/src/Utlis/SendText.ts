export const SendText = async (sendTo: string, message: string) => {
  const messagePayload = {
    sendTo: Number(sendTo),
    message: message,
  };
  const postRequest = await fetch("http://localhost:5000/api/twilio/send", {
    method: "POST",
    body: JSON.stringify(messagePayload),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const res = await postRequest.json();
  console.log(res);
};
