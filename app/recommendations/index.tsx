import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Button, BannerInfo } from '../../components';
import { theme } from '../../lib/theme';
import { CryClass } from '../../types';

interface Recommendation {
  id: string;
  title: string;
  description: string;
  steps: string[];
  tips: string[];
  whenToSeekHelp?: string;
}

const recommendations: Record<CryClass, Recommendation> = {
  hunger: {
    id: 'hunger',
    title: 'Açlık - Beslenme Önerileri',
    description: 'Bebeğiniz büyük olasılıkla aç. İşte yapabileceğiniz adımlar:',
    steps: [
      'Bebeğinizi emzirin veya mama verin',
      'Beslenme pozisyonunun rahat olduğundan emin olun',
      'Yavaşça ve sakin bir şekilde besleyin',
      'Beslenme sonrası gazını çıkartın'
    ],
    tips: [
      'Açlık belirtileri: Dudaklarını yalamak, ellerini ağzına götürmek',
      'Yenidoğanlar 2-3 saatte bir beslenir',
      'Beslenme miktarını takip edin',
      'Düzenli beslenme saatleri oluşturun'
    ],
    whenToSeekHelp: 'Bebek sürekli aç görünüyor ve kilo almıyorsa doktora başvurun.'
  },
  gas: {
    id: 'gas',
    title: 'Gaz Sıkışması - Rahatlama Önerileri',
    description: 'Bebeğinizin gazı sıkışmış olabilir. Bu durumda yardımcı olabilecek yöntemler:',
    steps: [
      'Bebeği kucağınıza alın ve sırtını nazikçe okşayın',
      'Bacaklarını karına doğru bükerek bisiklet hareketi yaptırın',
      'Karın masajı yapın (saat yönünde dairesel hareketler)',
      'Bebeği ayakta tutarak hafifçe sallandırın'
    ],
    tips: [
      'Beslenme sonrası mutlaka gaz çıkartın',
      'Biberon kullanıyorsanız hava almadığından emin olun',
      'Bebeği beslerken dik pozisyonda tutun',
      'Karın masajını günde birkaç kez yapabilirsiniz'
    ],
    whenToSeekHelp: 'Gaz sorunu sürekli tekrarlanıyor ve bebek çok rahatsızsa doktora danışın.'
  },
  fatigue: {
    id: 'fatigue',
    title: 'Yorgunluk - Uyku Önerileri',
    description: 'Bebeğiniz yorgun ve uykulu. Rahat uyuması için:',
    steps: [
      'Ortamı karanlık ve sessiz hale getirin',
      'Bebeği kundaklayın (güvenli şekilde)',
      'Nazik sallanma veya ninni ile sakinleştirin',
      'Rahat uyku pozisyonuna yerleştirin (sırt üstü)'
    ],
    tips: [
      'Yorgunluk belirtileri: Gözleri ovuşturma, huzursuzluk',
      'Düzenli uyku rutini oluşturun',
      'Oda sıcaklığını 18-20°C arasında tutun',
      'Gündüz ve gece uyku farkını öğretin'
    ],
    whenToSeekHelp: 'Uyku düzeni çok bozuksa veya sürekli uyanıyorsa uzman desteği alın.'
  }
};

export default function RecommendationsScreen() {
  const { cryType } = useLocalSearchParams<{ cryType?: string }>();
  const router = useRouter();
  
  // Default to hunger if no cry type specified
  const selectedCryType = (cryType as CryClass) || 'hunger';
  const recommendation = recommendations[selectedCryType];

  const handleGoBack = () => {
    router.back();
  };

  const handleNewAnalysis = () => {
    router.push('/analyze');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{recommendation.title}</Text>
          <Text style={styles.description}>{recommendation.description}</Text>
        </View>

        {/* Steps Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Yapılacaklar</Text>
          {recommendation.steps.map((step, index) => (
            <View key={index} style={styles.stepContainer}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>{index + 1}</Text>
              </View>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </View>

        {/* Tips Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Faydalı İpuçları</Text>
          {recommendation.tips.map((tip, index) => (
            <View key={index} style={styles.tipContainer}>
              <Text style={styles.tipBullet}>💡</Text>
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}
        </View>

        {/* When to Seek Help */}
        {recommendation.whenToSeekHelp && (
          <BannerInfo 
            text={recommendation.whenToSeekHelp}
            type="warning"
          />
        )}

        {/* General Tips */}
        <View style={styles.generalTipsContainer}>
          <Text style={styles.generalTipsTitle}>Genel Hatırlatmalar</Text>
          <View style={styles.generalTip}>
            <Text style={styles.generalTipEmoji}>👶</Text>
            <Text style={styles.generalTipText}>
              Her bebek farklıdır. Bu öneriler genel rehberdir, bebeğinizin ihtiyaçlarını gözlemleyerek hareket edin.
            </Text>
          </View>
          <View style={styles.generalTip}>
            <Text style={styles.generalTipEmoji}>🩺</Text>
            <Text style={styles.generalTipText}>
              Endişeleriniz varsa veya bebek sürekli ağlıyorsa çekinmeden doktorunuza başvurun.
            </Text>
          </View>
          <View style={styles.generalTip}>
            <Text style={styles.generalTipEmoji}>💝</Text>
            <Text style={styles.generalTipText}>
              Sabırlı olun. Bebeğinizi tanımak zaman alır ve bu süreç normal bir gelişim parçasıdır.
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <Button
            title="Yeni Analiz Yap"
            onPress={handleNewAnalysis}
            style={styles.primaryButton}
          />
          <Button
            title="Geri Dön"
            onPress={handleGoBack}
            variant="outline"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: theme.spacing.xl,
    gap: theme.spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  title: {
    ...theme.typography.heading,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
    color: theme.colors.primary,
  },
  description: {
    ...theme.typography.body,
    textAlign: 'center',
    color: theme.colors.textSecondary,
    lineHeight: 24,
  },
  section: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    ...theme.shadows.sm,
  },
  sectionTitle: {
    ...theme.typography.body,
    fontWeight: '600',
    marginBottom: theme.spacing.md,
    color: theme.colors.text,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.md,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
    marginTop: 2,
  },
  stepNumberText: {
    color: theme.colors.surface,
    fontSize: 12,
    fontWeight: '600',
  },
  stepText: {
    ...theme.typography.body,
    flex: 1,
    lineHeight: 22,
  },
  tipContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.sm,
  },
  tipBullet: {
    fontSize: 16,
    marginRight: theme.spacing.sm,
    marginTop: 2,
  },
  tipText: {
    ...theme.typography.caption,
    flex: 1,
    lineHeight: 20,
    fontSize: 15,
  },
  generalTipsContainer: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    ...theme.shadows.sm,
  },
  generalTipsTitle: {
    ...theme.typography.body,
    fontWeight: '600',
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  generalTip: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.md,
  },
  generalTipEmoji: {
    fontSize: 20,
    marginRight: theme.spacing.md,
    marginTop: 2,
  },
  generalTipText: {
    ...theme.typography.caption,
    flex: 1,
    lineHeight: 20,
    fontSize: 15,
  },
  actions: {
    gap: theme.spacing.md,
    marginTop: theme.spacing.md,
  },
  primaryButton: {
    marginBottom: theme.spacing.sm,
  },
});