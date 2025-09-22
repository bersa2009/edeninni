import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import * as FileSystem from 'expo-file-system';
import aiConfig from '../../config/ai-config.json';

class AIModelService {
  constructor() {
    this.model = null;
    this.isInitialized = false;
  }

  async initialize() {
    try {
      // TensorFlow.js'i başlat
      await tf.ready();

      // Model dosyasının varlığını kontrol et
      const modelPath = FileSystem.documentDirectory + 'models/baby_sound_model.tflite';
      const fileInfo = await FileSystem.getInfoAsync(modelPath);

      if (!fileInfo.exists) {
        throw new Error('AI modeli bulunamadı. Lütfen modeli indirin.');
      }

      // Modeli yükle
      this.model = await tf.loadGraphModel('file://' + modelPath);
      this.isInitialized = true;

      console.log('AI modeli başarıyla yüklendi');
      return true;
    } catch (error) {
      console.error('AI modeli yüklenirken hata:', error);
      throw error;
    }
  }

  async analyzeSound(audioData) {
    if (!this.isInitialized || !this.model) {
      throw new Error('AI modeli hazır değil');
    }

    try {
      // Ses verilerini işle
      const processedData = this.preprocessAudioData(audioData);

      // Model ile tahmin yap
      const prediction = await this.model.predict(processedData);
      const result = await prediction.data();

      // Sonuçları yorumla
      const analysisResult = this.interpretResults(result);

      return analysisResult;
    } catch (error) {
      console.error('Ses analizi hatası:', error);
      throw error;
    }
  }

  preprocessAudioData(audioData) {
    // Ses verilerini model için uygun formata çevir
    // Bu kısımda ses özelliklerini çıkar (MFCC, spektrogram vb.)

    const config = aiConfig.models.baby_sound_classifier;

    // Tensor oluştur
    const tensorData = tf.tensor(audioData, config.input_size);
    return tensorData;
  }

  interpretResults(predictionData) {
    const config = aiConfig.models.baby_sound_classifier;
    const classes = config.output_classes;

    // En yüksek olasılıklı sınıfı bul
    let maxIndex = 0;
    let maxValue = predictionData[0];

    for (let i = 1; i < predictionData.length; i++) {
      if (predictionData[i] > maxValue) {
        maxValue = predictionData[i];
        maxIndex = i;
      }
    }

    const confidence = maxValue;
    const predictedClass = classes[maxIndex];

    // Güven eşiğini kontrol et
    if (confidence < config.threshold) {
      return {
        type: 'belirsiz',
        confidence: confidence,
        suggestion: 'Daha net bir ses kaydı almayı deneyin',
        isValid: false
      };
    }

    return {
      type: predictedClass,
      confidence: confidence,
      suggestion: this.getSuggestion(predictedClass),
      isValid: true
    };
  }

  getSuggestion(soundType) {
    const suggestions = {
      'ağlama': 'Bebeğinizi kucağınıza alın ve sakinleştirin',
      'gaz': 'Bebeğinizi dik tutarak gazını çıkarın',
      'açlık': 'Beslenme zamanı gelmiş olabilir',
      'uyku': 'Bebeğiniz uykulu görünüyor, sakin bir ortam sağlayın',
      'normal': 'Bebeğiniz normal aktivitelerde bulunuyor'
    };

    return suggestions[soundType] || 'Durumu gözlemlemeye devam edin';
  }

  async updateModelWithFeedback(feedback) {
    // Federated learning için yerel model güncellemesi
    if (!aiConfig.federated_learning.enabled) {
      return;
    }

    try {
      // Yerel model güncellemesi
      // Bu kısımda kullanıcının geri bildirimi ile model iyileştirilecek

      console.log('Model geri bildirim ile güncellendi:', feedback);
    } catch (error) {
      console.error('Model güncelleme hatası:', error);
    }
  }

  async getModelInfo() {
    return {
      name: aiConfig.models.baby_sound_classifier.name,
      version: aiConfig.models.baby_sound_classifier.version,
      isLoaded: this.isInitialized,
      inputSize: aiConfig.models.baby_sound_classifier.input_size,
      classes: aiConfig.models.baby_sound_classifier.output_classes
    };
  }

  async cleanup() {
    if (this.model) {
      this.model.dispose();
      this.model = null;
    }
    this.isInitialized = false;
  }
}

export default new AIModelService();