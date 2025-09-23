import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { MicButton, BannerInfo, Button } from '../../components';
import { startRecording, stopRecording, isRecording } from '../../ai/audio';
import { theme } from '../../lib/theme';
import { t } from '../../lib/i18n';

export default function AnalyzeStart() {
  const [recording, setRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if we're already recording when component mounts
    const checkRecordingStatus = async () => {
      const recordingStatus = await isRecording();
      setRecording(recordingStatus);
    };
    
    checkRecordingStatus();
  }, []);

  const handleToggleRecording = async () => {
    if (isProcessing) return;

    try {
      if (!recording) {
        // Start recording
        setIsProcessing(true);
        await startRecording();
        setRecording(true);
        setIsProcessing(false);
      } else {
        // Stop recording and navigate to analysis
        setIsProcessing(true);
        const audioPath = await stopRecording();
        setRecording(false);
        setIsProcessing(false);
        
        // Navigate to analyzing screen with the audio path
        router.push({
          pathname: '/analyze/analyzing',
          params: { path: audioPath }
        });
      }
    } catch (error) {
      setIsProcessing(false);
      setRecording(false);
      
      console.error('Recording error:', error);
      Alert.alert(
        'Hata',
        'Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.',
        [{ text: 'Tamam' }]
      );
    }
  };

  const handleGoBack = () => {
    if (recording) {
      Alert.alert(
        'Kayıt Aktif',
        'Kayıt devam ediyor. Önce kaydı durdurmak istiyor musunuz?',
        [
          { text: 'İptal', style: 'cancel' },
          { 
            text: 'Kaydı Durdur', 
            onPress: async () => {
              try {
                await stopRecording();
                setRecording(false);
                router.back();
              } catch (error) {
                console.error('Error stopping recording:', error);
                router.back();
              }
            }
          }
        ]
      );
    } else {
      router.back();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{t('analyze.title')}</Text>
        
        <BannerInfo 
          text={t('analyze.hint')} 
          type="warning"
        />

        <View style={styles.recordingSection}>
          <MicButton
            recording={recording}
            onPress={handleToggleRecording}
            disabled={isProcessing}
          />
          <Text style={styles.recordingStatus}>
            {isProcessing 
              ? 'İşleniyor...' 
              : recording 
                ? t('record.stop')
                : t('record.start')
            }
          </Text>
          
          {recording && (
            <View style={styles.recordingIndicator}>
              <View style={styles.recordingDot} />
              <Text style={styles.recordingText}>Kayıt devam ediyor</Text>
            </View>
          )}
        </View>

        <View style={styles.actions}>
          <Button
            title={t('record.backToMenu')}
            onPress={handleGoBack}
            variant="outline"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    padding: theme.spacing.xl,
    justifyContent: 'space-between',
  },
  title: {
    ...theme.typography.heading,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  recordingSection: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    gap: theme.spacing.lg,
  },
  recordingStatus: {
    ...theme.typography.body,
    textAlign: 'center',
    marginTop: theme.spacing.sm,
  },
  recordingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    marginTop: theme.spacing.md,
  },
  recordingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.recording,
  },
  recordingText: {
    ...theme.typography.caption,
    color: theme.colors.recording,
  },
  actions: {
    gap: theme.spacing.md,
  },
});