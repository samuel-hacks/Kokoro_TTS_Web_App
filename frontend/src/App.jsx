import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Play, Pause, Download } from 'lucide-react';
import './index.css';

export default function App() {
  const [text, setText] = useState("Hello! This is a test.");
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [voice, setVoice] = useState("af_sarah");
  
  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://127.0.0.1:8000/generate", {
        text, voice, speed: 1.0
      }, { responseType: 'blob' });
      setAudioUrl(URL.createObjectURL(res.data));
    } catch (e) { alert("Backend Error"); }
    setLoading(false);
  };

  return (
    <div className="container">
      <div className="card">
        <h1>KOKORO TTS</h1>
        <textarea value={text} onChange={e => setText(e.target.value)} />
        
        <div className="controls">
          <select value={voice} onChange={e => setVoice(e.target.value)}>
           
           <optgroup label="🇺🇸 American Female">
              <option value="af_sarah">Sarah (Default)</option>
              <option value="af_bella">Bella</option>
              <option value="af_nicole">Nicole</option>
              <option value="af_sky">Sky</option>
              <option value="af_alloy">Alloy</option>
              <option value="af_jessica">Jessica</option>
              <option value="af_river">River</option>
              <option value="af_kore">Kore</option>
              <option value="af_aoede">Aoede</option>
            </optgroup>

            <optgroup label="🇺🇸 American Male">
              <option value="am_michael">Michael</option>
              <option value="am_adam">Adam</option>
              <option value="am_echo">Echo</option>
              <option value="am_eric">Eric</option>
              <option value="am_fenrir">Fenrir</option>
              <option value="am_puck">Puck</option>
              <option value="am_liam">Liam</option>
              <option value="am_onyx">Onyx</option>
            </optgroup>

            <optgroup label="🇬🇧 British Female">
              <option value="bf_emma">Emma</option>
              <option value="bf_isabella">Isabella</option>
              <option value="bf_alice">Alice</option>
              <option value="bf_lily">Lily</option>
            </optgroup>

            <optgroup label="🇬🇧 British Male">
              <option value="bm_george">George</option>
              <option value="bm_fable">Fable</option>
              <option value="bm_lewis">Lewis</option>
              <option value="bm_daniel">Daniel</option>
            </optgroup>
          </select>
          <button onClick={handleGenerate} disabled={loading}>
            {loading ? "Generating..." : "Generate Audio"}
          </button>
        </div>

        {audioUrl && (
          <div className="audio-player">
            <audio controls src={audioUrl} autoPlay />
            <a href={audioUrl} download="audio.wav"><Download size={16}/> Download</a>
          </div>
        )}
      </div>
    </div>
  );
}