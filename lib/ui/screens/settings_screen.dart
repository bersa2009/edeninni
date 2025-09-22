import 'package:flutter/material.dart';
import '../../services/storage_service.dart';
import '../../services/federated_learning_service.dart';

class SettingsScreen extends StatefulWidget {
  const SettingsScreen({super.key});

  @override
  State<SettingsScreen> createState() => _SettingsScreenState();
}

class _SettingsScreenState extends State<SettingsScreen> {
  bool _notificationsEnabled = true;
  bool _feedbackEnabled = true;
  bool _federatedLearningEnabled = true;
  double _sensitivityLevel = 0.7;
  String _language = 'tr';

  @override
  void initState() {
    super.initState();
    _loadSettings();
  }

  void _loadSettings() {
    setState(() {
      _notificationsEnabled = StorageService.getSetting<bool>('notifications_enabled', defaultValue: true) ?? true;
      _feedbackEnabled = StorageService.getSetting<bool>('feedback_enabled', defaultValue: true) ?? true;
      _federatedLearningEnabled = StorageService.getSetting<bool>('federated_learning_enabled', defaultValue: true) ?? true;
      _sensitivityLevel = StorageService.getSetting<double>('sensitivity_level', defaultValue: 0.7) ?? 0.7;
      _language = StorageService.getSetting<String>('language', defaultValue: 'tr') ?? 'tr';
    });
  }

  Future<void> _saveSetting(String key, dynamic value) async {
    await StorageService.saveSetting(key, value);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Ayarlar'),
        elevation: 0,
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          _buildSection(
            title: 'Genel Ayarlar',
            children: [
              _buildSwitchTile(
                title: 'Bildirimler',
                subtitle: 'Analiz sonuçları için bildirim al',
                value: _notificationsEnabled,
                onChanged: (value) {
                  setState(() {
                    _notificationsEnabled = value;
                  });
                  _saveSetting('notifications_enabled', value);
                },
              ),
              _buildLanguageTile(),
              _buildSensitivityTile(),
            ],
          ),
          const SizedBox(height: 24),
          
          _buildSection(
            title: 'Gizlilik ve Güvenlik',
            children: [
              _buildSwitchTile(
                title: 'Geri Bildirim Paylaşımı',
                subtitle: 'Model iyileştirmesi için anonim geri bildirim paylaş',
                value: _feedbackEnabled,
                onChanged: (value) {
                  setState(() {
                    _feedbackEnabled = value;
                  });
                  _saveSetting('feedback_enabled', value);
                },
              ),
              _buildSwitchTile(
                title: 'Federated Learning',
                subtitle: 'Modeli yerel olarak iyileştir',
                value: _federatedLearningEnabled,
                onChanged: (value) {
                  setState(() {
                    _federatedLearningEnabled = value;
                  });
                  _saveSetting('federated_learning_enabled', value);
                },
              ),
              _buildTile(
                title: 'Veri Gizliliği',
                subtitle: 'KVKV/GDPR uyumlu veri işleme',
                trailing: const Icon(Icons.arrow_forward_ios),
                onTap: () => _showPrivacyDialog(),
              ),
            ],
          ),
          const SizedBox(height: 24),
          
          _buildSection(
            title: 'Veri Yönetimi',
            children: [
              _buildTile(
                title: 'Verileri Dışa Aktar',
                subtitle: 'Tüm analiz verilerini dışa aktar',
                trailing: const Icon(Icons.download),
                onTap: () => _exportData(),
              ),
              _buildTile(
                title: 'Eski Verileri Temizle',
                subtitle: '30 günden eski verileri sil',
                trailing: const Icon(Icons.cleaning_services),
                onTap: () => _cleanOldData(),
              ),
              _buildTile(
                title: 'Tüm Verileri Sil',
                subtitle: 'Tüm analiz ve ayar verilerini sil',
                trailing: const Icon(Icons.delete_forever, color: Colors.red),
                onTap: () => _deleteAllData(),
              ),
            ],
          ),
          const SizedBox(height: 24),
          
          _buildSection(
            title: 'Model Bilgileri',
            children: [
              _buildTile(
                title: 'Model Performansı',
                subtitle: 'Federated learning istatistikleri',
                trailing: const Icon(Icons.arrow_forward_ios),
                onTap: () => _showModelStats(),
              ),
              _buildTile(
                title: 'Model Güncelle',
                subtitle: 'Geri bildirimlerle modeli iyileştir',
                trailing: const Icon(Icons.update),
                onTap: () => _updateModel(),
              ),
            ],
          ),
          const SizedBox(height: 24),
          
          _buildSection(
            title: 'Hakkında',
            children: [
              _buildTile(
                title: 'Uygulama Versiyonu',
                subtitle: '1.0.0',
                trailing: null,
              ),
              _buildTile(
                title: 'Gizlilik Politikası',
                subtitle: 'Veri işleme politikamızı görüntüle',
                trailing: const Icon(Icons.arrow_forward_ios),
                onTap: () => _showPrivacyPolicy(),
              ),
              _buildTile(
                title: 'Destek',
                subtitle: 'Yardım ve iletişim',
                trailing: const Icon(Icons.arrow_forward_ios),
                onTap: () => _showSupport(),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildSection({required String title, required List<Widget> children}) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(left: 16, bottom: 8),
          child: Text(
            title,
            style: Theme.of(context).textTheme.titleMedium?.copyWith(
              fontWeight: FontWeight.w600,
              color: Theme.of(context).primaryColor,
            ),
          ),
        ),
        Card(
          child: Column(
            children: children,
          ),
        ),
      ],
    );
  }

  Widget _buildSwitchTile({
    required String title,
    required String subtitle,
    required bool value,
    required ValueChanged<bool> onChanged,
  }) {
    return SwitchListTile(
      title: Text(title),
      subtitle: Text(subtitle),
      value: value,
      onChanged: onChanged,
    );
  }

  Widget _buildTile({
    required String title,
    required String subtitle,
    Widget? trailing,
    VoidCallback? onTap,
  }) {
    return ListTile(
      title: Text(title),
      subtitle: Text(subtitle),
      trailing: trailing,
      onTap: onTap,
    );
  }

  Widget _buildLanguageTile() {
    return ListTile(
      title: const Text('Dil'),
      subtitle: Text(_language == 'tr' ? 'Türkçe' : 'English'),
      trailing: const Icon(Icons.arrow_forward_ios),
      onTap: () => _showLanguageDialog(),
    );
  }

  Widget _buildSensitivityTile() {
    return ListTile(
      title: const Text('Hassasiyet Seviyesi'),
      subtitle: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('Ses algılama hassasiyeti: ${(_sensitivityLevel * 100).toInt()}%'),
          const SizedBox(height: 8),
          Slider(
            value: _sensitivityLevel,
            onChanged: (value) {
              setState(() {
                _sensitivityLevel = value;
              });
            },
            onChangeEnd: (value) {
              _saveSetting('sensitivity_level', value);
            },
            min: 0.1,
            max: 1.0,
            divisions: 9,
          ),
        ],
      ),
    );
  }

  void _showLanguageDialog() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Dil Seçimi'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            RadioListTile<String>(
              title: const Text('Türkçe'),
              value: 'tr',
              groupValue: _language,
              onChanged: (value) {
                setState(() {
                  _language = value!;
                });
                _saveSetting('language', value);
                Navigator.of(context).pop();
              },
            ),
            RadioListTile<String>(
              title: const Text('English'),
              value: 'en',
              groupValue: _language,
              onChanged: (value) {
                setState(() {
                  _language = value!;
                });
                _saveSetting('language', value);
                Navigator.of(context).pop();
              },
            ),
          ],
        ),
      ),
    );
  }

  void _showPrivacyDialog() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Veri Gizliliği'),
        content: const SingleChildScrollView(
          child: Text(
            'Bu uygulama gizlilik odaklı olarak tasarlanmıştır:\n\n'
            '• Hiçbir ses kaydı cihazınızdan çıkmaz\n'
            '• Tüm analizler yerel olarak gerçekleşir\n'
            '• Kişisel veriler asla sunucuya gönderilmez\n'
            '• Federated learning sadece anonim model güncellemeleri paylaşır\n'
            '• KVKV/GDPR uyumlu veri işleme\n'
            '• İstediğiniz zaman tüm verilerinizi silebilirsiniz',
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('Tamam'),
          ),
        ],
      ),
    );
  }

  void _exportData() async {
    try {
      final data = StorageService.exportAllData();
      
      // Gerçek uygulamada dosya olarak kaydet veya paylaş
      showDialog(
        context: context,
        builder: (context) => AlertDialog(
          title: const Text('Veri Dışa Aktarma'),
          content: Text('${data['analyses'].length} analiz ve ${data['feedback'].length} geri bildirim dışa aktarıldı.'),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(context).pop(),
              child: const Text('Tamam'),
            ),
          ],
        ),
      );
    } catch (e) {
      _showErrorDialog('Veri dışa aktarma hatası: $e');
    }
  }

  void _cleanOldData() async {
    final confirmed = await _showConfirmDialog(
      'Eski Verileri Temizle',
      '30 günden eski tüm analiz ve geri bildirim verileri silinecek. Devam etmek istiyor musunuz?',
    );

    if (confirmed) {
      try {
        await StorageService.clearOldData();
        _showSuccessDialog('Eski veriler başarıyla temizlendi.');
      } catch (e) {
        _showErrorDialog('Veri temizleme hatası: $e');
      }
    }
  }

  void _deleteAllData() async {
    final confirmed = await _showConfirmDialog(
      'Tüm Verileri Sil',
      'TÜM analiz, geri bildirim ve ayar verileri kalıcı olarak silinecek. Bu işlem geri alınamaz. Devam etmek istiyor musunuz?',
    );

    if (confirmed) {
      try {
        await StorageService.deleteAllData();
        _showSuccessDialog('Tüm veriler başarıyla silindi.');
        _loadSettings(); // Ayarları yeniden yükle
      } catch (e) {
        _showErrorDialog('Veri silme hatası: $e');
      }
    }
  }

  void _showModelStats() {
    final stats = FederatedLearningService.getStatistics();
    
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Model Performansı'),
        content: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisSize: MainAxisSize.min,
            children: [
              if (stats.isNotEmpty) ...[
                Text('Toplam Eğitim Örneği: ${stats['total_samples'] ?? 0}'),
                const SizedBox(height: 8),
                Text('Model Doğruluğu: ${((stats['accuracy'] ?? 0) * 100).toStringAsFixed(1)}%'),
                const SizedBox(height: 8),
                Text('Ortalama Memnuniyet: ${(stats['average_satisfaction'] ?? 0).toStringAsFixed(1)}/5'),
                const SizedBox(height: 8),
                Text('Son Güncelleme: ${stats['timestamp'] ?? 'Bilinmiyor'}'),
              ] else
                const Text('Henüz model eğitimi gerçekleştirilmedi.'),
            ],
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('Tamam'),
          ),
        ],
      ),
    );
  }

  void _updateModel() async {
    try {
      await FederatedLearningService.updateModelWithBatchFeedback();
      _showSuccessDialog('Model başarıyla güncellendi.');
    } catch (e) {
      _showErrorDialog('Model güncelleme hatası: $e');
    }
  }

  void _showPrivacyPolicy() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Gizlilik Politikası'),
        content: const SingleChildScrollView(
          child: Text(
            'Bebek Ağlama Analizi Uygulaması Gizlilik Politikası\n\n'
            '1. Veri Toplama\n'
            'Uygulama sadece analiz sonuçlarını ve kullanıcı geri bildirimlerini yerel olarak saklar.\n\n'
            '2. Veri İşleme\n'
            'Tüm ses analizleri cihazınızda gerçekleşir. Hiçbir ses kaydı sunucuya gönderilmez.\n\n'
            '3. Veri Paylaşımı\n'
            'Sadece anonim model iyileştirme verileri (federated learning) paylaşılır.\n\n'
            '4. Veri Güvenliği\n'
            'Tüm veriler cihazınızda şifrelenerek saklanır.\n\n'
            '5. Veri Silme\n'
            'İstediğiniz zaman tüm verilerinizi silebilirsiniz.',
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('Tamam'),
          ),
        ],
      ),
    );
  }

  void _showSupport() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Destek'),
        content: const Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Yardıma mı ihtiyacınız var?\n'),
            Text('E-posta: support@babycryanalyzer.com'),
            SizedBox(height: 8),
            Text('Web: www.babycryanalyzer.com'),
            SizedBox(height: 8),
            Text('Sürüm: 1.0.0'),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('Tamam'),
          ),
        ],
      ),
    );
  }

  Future<bool> _showConfirmDialog(String title, String content) async {
    return await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(title),
        content: Text(content),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(false),
            child: const Text('İptal'),
          ),
          ElevatedButton(
            onPressed: () => Navigator.of(context).pop(true),
            style: ElevatedButton.styleFrom(backgroundColor: Colors.red),
            child: const Text('Onayla'),
          ),
        ],
      ),
    ) ?? false;
  }

  void _showSuccessDialog(String message) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Başarılı'),
        content: Text(message),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('Tamam'),
          ),
        ],
      ),
    );
  }

  void _showErrorDialog(String message) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Hata'),
        content: Text(message),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('Tamam'),
          ),
        ],
      ),
    );
  }
}