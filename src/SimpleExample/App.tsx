import { useEffect, useRef, useState } from "react";
import { fetchMeetingData } from "../utils";
import AgoraRTM, { RtmChannel } from "agora-rtm-sdk";

function App() {
  const instance = useRef(
    AgoraRTM.createInstance("242e3cc4aff248a19a1d26c8f69590e0")
  );

  const channel = useRef<RtmChannel>();
  useEffect(() => {
    //@ts-ignore
    window.engine = instance;
    const init = async () => {
      console.log("INIT");
      const details = await fetchMeetingData(
        "46d44bbc-3ba7-4ae5-aa64-c70cf39a12b8"
      );
      console.log(details.uid, details.rtmToken);
      await instance.current.login({
        uid: details.uid.toString(),
        token: details.rtmToken,
      });
      channel.current = instance.current.createChannel(details.channel);
    };

    const leave = async () => {
      await instance.current.logout();
      console.log("Left");
    };

    init();
    return () => {
      leave();
    };
  }, []);
  return (
    <div>
      <button
        onClick={() => {
          channel.current?.sendMessage({ text: "hi" });
        }}
      >
        Send message
      </button>
    </div>
  );
}

const Wrapper = () => {
  const [mount, setMount] = useState(false);

  return (
    <div>
      <button
        onClick={() => {
          setMount(!mount);
        }}
      >
        Mount
      </button>
      {mount && <App />}
    </div>
  );
};

export default App;
