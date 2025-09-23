# AI Model Integration Guide

This document provides detailed instructions for integrating a real machine learning model into the Baby Cry Analyzer app.

## Current Implementation

The app currently uses mock data in `ai/AiService.ts`. The `analyze()` function returns randomized percentages for demonstration purposes.

## Model Requirements

### Input Requirements
- **Audio Format**: WAV, 16kHz sample rate
- **Duration**: 3-10 seconds of crying audio
- **Preprocessing**: MFCC features or spectrogram conversion

### Output Requirements
- **Classes**: 3 categories (hunger, gas, fatigue)
- **Format**: Probability distribution (softmax output)
- **Range**: 0-1 for each class, sum = 1

## Integration Options

### Option 1: TensorFlow Lite (Recommended)

#### Installation
```bash
npm install @tensorflow/tfjs-react-native
npm install @tensorflow/tfjs-platform-react-native
```

#### Implementation
```typescript
// ai/TensorFlowService.ts
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';

export class TensorFlowAnalyzer {
  private model: tf.LayersModel | null = null;

  async loadModel() {
    try {
      this.model = await tf.loadLayersModel('path/to/your/model.json');
      console.log('Model loaded successfully');
    } catch (error) {
      console.error('Failed to load model:', error);
      throw error;
    }
  }

  async preprocessAudio(audioPath: string): Promise<tf.Tensor> {
    // 1. Load audio file
    // 2. Convert to 16kHz if needed
    // 3. Extract MFCC features
    // 4. Normalize
    // 5. Return as tensor
  }

  async predict(audioPath: string): Promise<AnalysisResult> {
    if (!this.model) {
      throw new Error('Model not loaded');
    }

    const inputTensor = await this.preprocessAudio(audioPath);
    const prediction = this.model.predict(inputTensor) as tf.Tensor;
    const probabilities = await prediction.data();

    return {
      ts: new Date().toISOString(),
      items: [
        { label: 'hunger', percent: Math.round(probabilities[0] * 100) },
        { label: 'gas', percent: Math.round(probabilities[1] * 100) },
        { label: 'fatigue', percent: Math.round(probabilities[2] * 100) },
      ],
    };
  }
}
```

### Option 2: PyTorch Mobile

#### Installation
```bash
npm install react-native-pytorch-core
```

#### Implementation
```typescript
// ai/PyTorchService.ts
import { MobileModel } from 'react-native-pytorch-core';

export class PyTorchAnalyzer {
  private model: MobileModel | null = null;

  async loadModel() {
    try {
      const modelPath = 'path/to/your/model.ptl';
      this.model = await MobileModel.load(modelPath);
      console.log('PyTorch model loaded');
    } catch (error) {
      console.error('Failed to load PyTorch model:', error);
      throw error;
    }
  }

  async predict(audioPath: string): Promise<AnalysisResult> {
    if (!this.model) {
      throw new Error('Model not loaded');
    }

    // Preprocess audio and run inference
    const input = await this.preprocessAudio(audioPath);
    const output = await this.model.forward(input);
    
    // Convert output to probabilities
    const probabilities = this.softmax(output);
    
    return {
      ts: new Date().toISOString(),
      items: [
        { label: 'hunger', percent: Math.round(probabilities[0] * 100) },
        { label: 'gas', percent: Math.round(probabilities[1] * 100) },
        { label: 'fatigue', percent: Math.round(probabilities[2] * 100) },
      ],
    };
  }

  private softmax(logits: number[]): number[] {
    const maxLogit = Math.max(...logits);
    const expLogits = logits.map(x => Math.exp(x - maxLogit));
    const sumExp = expLogits.reduce((sum, x) => sum + x, 0);
    return expLogits.map(x => x / sumExp);
  }
}
```

## Audio Preprocessing

### MFCC Feature Extraction
```typescript
// ai/AudioProcessor.ts
export class AudioProcessor {
  static async extractMFCC(audioPath: string): Promise<number[][]> {
    // 1. Load audio file using expo-av or react-native-fs
    // 2. Apply windowing (Hamming window, 25ms window, 10ms hop)
    // 3. Compute FFT
    // 4. Apply mel filter bank
    // 5. Take logarithm
    // 6. Apply DCT to get MFCC coefficients
    // 7. Return 13 MFCC features per frame
  }

  static async normalizeFeatures(features: number[][]): Promise<number[][]> {
    // Z-score normalization
    // features = (features - mean) / std
  }
}
```

## Model Training (External)

### Dataset Requirements
- **Size**: Minimum 1000 samples per class
- **Quality**: Clean recordings, 16kHz, mono
- **Labels**: Manually verified by experts
- **Balance**: Equal distribution across classes

### Recommended Architecture
```python
# Python training code example
import tensorflow as tf

def create_model():
    model = tf.keras.Sequential([
        tf.keras.layers.Input(shape=(None, 13)),  # MFCC features
        tf.keras.layers.LSTM(128, return_sequences=True),
        tf.keras.layers.LSTM(64),
        tf.keras.layers.Dense(32, activation='relu'),
        tf.keras.layers.Dropout(0.3),
        tf.keras.layers.Dense(3, activation='softmax')  # 3 classes
    ])
    
    model.compile(
        optimizer='adam',
        loss='categorical_crossentropy',
        metrics=['accuracy']
    )
    
    return model
```

## Integration Steps

### Step 1: Update AiService.ts
```typescript
// ai/AiService.ts
import { TensorFlowAnalyzer } from './TensorFlowService';

const analyzer = new TensorFlowAnalyzer();

export async function initializeModel() {
  await analyzer.loadModel();
}

export async function analyze(filePath: string): Promise<AnalysisResult> {
  try {
    return await analyzer.predict(filePath);
  } catch (error) {
    console.error('Analysis failed:', error);
    // Fallback to mock data
    return getMockResult();
  }
}
```

### Step 2: Update App Initialization
```typescript
// app/_layout.tsx
import { initializeModel } from '../ai/AiService';

export default function RootLayout() {
  useEffect(() => {
    initializeModel().catch(console.error);
  }, []);

  // ... rest of component
}
```

### Step 3: Error Handling
```typescript
// Add to analyzing.tsx
const performAnalysis = async () => {
  try {
    setProgress(0.1);
    const result = await analyze(path);
    setProgress(1.0);
    router.replace({
      pathname: '/analyze/result',
      params: { result: JSON.stringify(result) }
    });
  } catch (error) {
    console.error('Analysis failed:', error);
    Alert.alert(
      'Analiz Hatası',
      'Ses analizi sırasında bir hata oluştu. Lütfen tekrar deneyin.',
      [{ text: 'Tamam', onPress: () => router.replace('/analyze') }]
    );
  }
};
```

## Performance Optimization

### Model Size
- Keep model under 50MB for mobile deployment
- Use quantization to reduce size
- Consider model pruning techniques

### Inference Speed
- Target < 3 seconds inference time
- Use GPU acceleration if available
- Implement model caching

### Memory Management
- Dispose tensors after use
- Implement model lazy loading
- Monitor memory usage

## Testing Strategy

### Unit Tests
```typescript
// __tests__/ai/AiService.test.ts
describe('AI Service', () => {
  it('should analyze audio and return valid result', async () => {
    const mockAudioPath = 'path/to/test/audio.wav';
    const result = await analyze(mockAudioPath);
    
    expect(result.items).toHaveLength(3);
    expect(result.items.every(item => item.percent >= 0 && item.percent <= 100)).toBe(true);
    expect(result.items.reduce((sum, item) => sum + item.percent, 0)).toBe(100);
  });
});
```

### Integration Tests
- Test with real audio samples
- Verify model loading
- Test error scenarios
- Performance benchmarking

## Deployment Considerations

### Model Assets
- Bundle model files with app
- Consider over-the-air updates for model improvements
- Implement model versioning

### Platform-Specific
- iOS: Core ML integration for better performance
- Android: TensorFlow Lite GPU delegate
- Web: WebGL backend for TensorFlow.js

### Privacy
- All processing happens on-device
- No audio data sent to external servers
- Clear user consent for microphone access

## Monitoring & Analytics

### Performance Metrics
- Inference time
- Model accuracy
- User engagement
- Error rates

### A/B Testing
- Test different model versions
- Compare accuracy improvements
- User satisfaction metrics

## Future Improvements

### Advanced Features
- Real-time analysis during recording
- Multiple cry detection in single recording
- Confidence intervals for predictions
- User feedback integration for model improvement

### Model Enhancement
- Transfer learning from larger datasets
- Multi-language support
- Age-specific models (newborn vs. older babies)
- Environmental noise filtering

---

This guide provides a comprehensive roadmap for integrating real AI capabilities into the Baby Cry Analyzer app. Start with the TensorFlow Lite implementation for the best balance of performance and ease of integration.