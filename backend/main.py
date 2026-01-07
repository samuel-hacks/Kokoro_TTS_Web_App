import os
import sys

try:
    from phonemizer.backend.espeak.wrapper import EspeakWrapper
    if not hasattr(EspeakWrapper, 'set_data_path'):
        def dummy(path): pass
        EspeakWrapper.set_data_path = dummy
except: pass

from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import torch
import soundfile as sf
import io
import numpy as np
from kokoro import KPipeline

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

pipelines = {
    'a': KPipeline(lang_code='a'),
    'b': KPipeline(lang_code='b'),
}
print("Models Ready!")

class TTSRequest(BaseModel):
    text: str
    voice: str
    speed: float

@app.post("/generate")
def generate(req: TTSRequest):
    lang = 'b' if req.voice.startswith('b') else 'a'
    pipeline = pipelines[lang]

    generator = pipeline(req.text, voice=req.voice, speed=req.speed, split_pattern=r'\n+')
    audio = np.concatenate([x[2] for x in generator])
    
    buffer = io.BytesIO()
    sf.write(buffer, audio, 27000, format='WAV')
    buffer.seek(0)
    return Response(content=buffer.read(), media_type="audio/wav")