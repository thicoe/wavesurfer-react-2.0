import React, { useCallback, useRef } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { WaveSurfer, WaveForm } from "wavesurfer-react";
import "./styles.css";

const Buttons = styled.div`
  display: inline-block;
`;

const Button = styled.button``;

function App() {
  const wavesurferRef = useRef();
  const handleWSMount = useCallback((waveSurfer) => {
    wavesurferRef.current = waveSurfer;

    console.log(wavesurferRef.current.load);

    if (wavesurferRef.current) {
      wavesurferRef.current.load("/bensound-ukulele.mp3");

      wavesurferRef.current.on("ready", () => {
        console.log("WaveSurfer is ready");
      });

      wavesurferRef.current.on("loading", (data) => {
        console.log("loading --> ", data);
      });

      if (window) {
        window.surferidze = wavesurferRef.current;
      }
    }
  }, []);

  const play = useCallback(() => {
    wavesurferRef.current.playPause();
  }, []);

  return (
    <div className="App">
      <WaveSurfer onMount={handleWSMount}>
        <WaveForm id="waveform" cursorColor="transparent"></WaveForm>
        <div id="timeline" />
      </WaveSurfer>
      <Buttons>
        <Button onClick={play}>Play / Pause</Button>
      </Buttons>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
