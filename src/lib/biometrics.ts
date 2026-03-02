import * as faceapi from 'face-api.js'

let modelsLoaded = false

export async function loadModels(): Promise<void> {
  if (modelsLoaded) return
  const MODEL_URL = '/models'
  await Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
    faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
    faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
  ])
  modelsLoaded = true
}

export async function detectFace(
  video: HTMLVideoElement
): Promise<faceapi.WithFaceDescriptor<faceapi.WithFaceLandmarks<{ detection: faceapi.FaceDetection }>> | null> {
  const detection = await faceapi
    .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions({ inputSize: 320, scoreThreshold: 0.5 }))
    .withFaceLandmarks()
    .withFaceDescriptor()
  return detection || null
}

export function getDescriptorArray(detection: faceapi.WithFaceDescriptor<unknown>): number[] {
  return Array.from(detection.descriptor as Float32Array)
}
