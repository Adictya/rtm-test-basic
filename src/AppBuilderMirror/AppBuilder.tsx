import { useEffect, useRef, useState } from "react";
import RTMEngine from "./RTMEngineClass";
import { fetchMeetingData } from "../utils";

function App() {
  const engine = useRef<RTMEngine["engine"]>();
  const detailsRef = useRef<any>({});

  useEffect(() => {
    const init = async () => {
      const details = await fetchMeetingData(
        "46d44bbc-3ba7-4ae5-aa64-c70cf39a12b8"
      );
      await new Promise<void>((res) => {
        setTimeout(() => {
          res();
        }, 1000);
      });
      console.log("!!! CREATING");
      engine.current = RTMEngine.getInstance().engine;
      //@ts-ignore
      window.engine = RTMEngine.getInstance();
      await engine.current.login({
        uid: details.uid.toString(),
        token: details.rtmToken,
      });
      detailsRef.current = details;
    };

    const leave = async () => {
      console.log("!!! DESTROYING")
      RTMEngine.getInstance().destroy();
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
          console.log("!!! SENDING");
          RTMEngine.getInstance().engine.sendMessageByChannelId(
            detailsRef.current.channel,
            "hi"
          );
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
