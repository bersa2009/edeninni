import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { Platform, PermissionsAndroid } from 'react-native';
import { logInfo, logError, logWarn } from '../lib/logger';

let recording: Audio.Recording | null = null;

export async function requestPermissions(): Promise<boolean> {
  try {
    // For Android, request runtime permission
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Mikrofon İzni',
          message: 'Bebek ağlama seslerini analiz etmek için mikrofon erişimi gerekli.',
          buttonNeutral: 'Daha Sonra Sor',
          buttonNegative: 'İptal',
          buttonPositive: 'İzin Ver',
        }
      );
      
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        logWarn('Android microphone permission denied', 'AudioService');
        return false;
      }
    }

    // For both platforms, use Expo Audio permissions
    const { status } = await Audio.requestPermissionsAsync();
    return status === 'granted';
  } catch (error) {
    logError('Failed to request audio permissions', 'AudioService', error);
    return false;
  }
}

export async function startRecording(): Promise<void> {
  try {
    // Request permissions first
    const hasPermission = await requestPermissions();
    if (!hasPermission) {
      throw new Error('Mikrofon izni gerekli');
    }

    // Configure audio mode for recording
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });

    // Create and start recording
    const { recording: newRecording } = await Audio.Recording.createAsync(
      Audio.RecordingOptionsPresets.HIGH_QUALITY
    );
    
    recording = newRecording;
    logInfo('Audio recording started successfully', 'AudioService');
  } catch (error) {
    logError('Failed to start audio recording', 'AudioService', error);
    throw error;
  }
}

export async function stopRecording(): Promise<string> {
  try {
    if (!recording) {
      throw new Error('No active recording found');
    }

    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    
    if (!uri) {
      throw new Error('Recording URI is null');
    }

    // Create a timestamped filename
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const fileName = `cry_${timestamp}.wav`;
    const destinationUri = `${FileSystem.documentDirectory}${fileName}`;

    // Move the recording to a permanent location
    await FileSystem.moveAsync({
      from: uri,
      to: destinationUri,
    });

    logInfo('Audio recording saved successfully', 'AudioService', { 
      fileName,
      path: destinationUri 
    });
    recording = null;

    return destinationUri;
  } catch (error) {
    logError('Failed to stop audio recording', 'AudioService', error);
    recording = null;
    throw error;
  }
}

export async function isRecording(): Promise<boolean> {
  if (!recording) return false;
  
  try {
    const status = await recording.getStatusAsync();
    return status.isRecording || false;
  } catch {
    return false;
  }
}