import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:lottie/lottie.dart';

class OnboardingScreen extends StatefulWidget {
  const OnboardingScreen({super.key});

  @override
  State<OnboardingScreen> createState() => _OnboardingScreenState();
}

class _OnboardingScreenState extends State<OnboardingScreen> {
  final PageController _pageController = PageController();
  int _currentPage = 0;

  final List<OnboardingPage> _pages = [
    OnboardingPage(
      title: 'Bebeğinizi Anlayın',
      description: 'Yapay zeka teknolojisi ile bebeğinizin ağlama nedenlerini anında öğrenin.',
      animationAsset: 'assets/animations/baby_listening.json',
      color: Colors.blue,
    ),
    OnboardingPage(
      title: 'Çevrimdışı Çalışır',
      description: 'İnternet bağlantısına ihtiyaç duymaz. Tüm analizler cihazınızda gerçekleşir.',
      animationAsset: 'assets/animations/offline.json',
      color: Colors.green,
    ),
    OnboardingPage(
      title: 'Güvenli ve Gizli',
      description: 'Hiçbir ses kaydı cihazınızdan çıkmaz. KVKK/GDPR uyumlu veri işleme.',
      animationAsset: 'assets/animations/security.json',
      color: Colors.purple,
    ),
    OnboardingPage(
      title: 'Sürekli Öğrenir',
      description: 'Geri bildirimlerinizle model kendini iyileştirir ve daha doğru sonuçlar verir.',
      animationAsset: 'assets/animations/learning.json',
      color: Colors.orange,
    ),
  ];

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Column(
          children: [
            // Üst bar
            Padding(
              padding: const EdgeInsets.all(16),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  // Logo veya başlık
                  Text(
                    'Bebek Ağlama Analizi',
                    style: Theme.of(context).textTheme.titleMedium?.copyWith(
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  // Atla butonu
                  TextButton(
                    onPressed: _skipOnboarding,
                    child: const Text('Atla'),
                  ),
                ],
              ),
            ),
            
            // Sayfa göstergesi
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20),
              child: Row(
                children: List.generate(_pages.length, (index) {
                  return Expanded(
                    child: Container(
                      height: 4,
                      margin: const EdgeInsets.symmetric(horizontal: 2),
                      decoration: BoxDecoration(
                        color: index <= _currentPage
                            ? Theme.of(context).primaryColor
                            : Colors.grey[300],
                        borderRadius: BorderRadius.circular(2),
                      ),
                    ),
                  );
                }),
              ),
            ),
            
            // Sayfa içeriği
            Expanded(
              child: PageView.builder(
                controller: _pageController,
                itemCount: _pages.length,
                onPageChanged: (index) {
                  setState(() {
                    _currentPage = index;
                  });
                },
                itemBuilder: (context, index) {
                  return _buildPage(_pages[index]);
                },
              ),
            ),
            
            // Alt navigasyon
            Padding(
              padding: const EdgeInsets.all(20),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  // Geri butonu
                  if (_currentPage > 0)
                    TextButton.icon(
                      onPressed: _previousPage,
                      icon: const Icon(Icons.arrow_back),
                      label: const Text('Geri'),
                    )
                  else
                    const SizedBox(width: 80),
                  
                  // İleri/Başla butonu
                  ElevatedButton.icon(
                    onPressed: _currentPage == _pages.length - 1
                        ? _completeOnboarding
                        : _nextPage,
                    icon: Icon(_currentPage == _pages.length - 1
                        ? Icons.check
                        : Icons.arrow_forward),
                    label: Text(_currentPage == _pages.length - 1
                        ? 'Başla'
                        : 'İleri'),
                    style: ElevatedButton.styleFrom(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 24,
                        vertical: 12,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildPage(OnboardingPage page) {
    return Padding(
      padding: const EdgeInsets.all(40),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          // Animasyon
          SizedBox(
            height: 250,
            child: Lottie.asset(
              page.animationAsset,
              repeat: true,
              fit: BoxFit.contain,
            ),
          ),
          
          const SizedBox(height: 40),
          
          // Başlık
          Text(
            page.title,
            style: Theme.of(context).textTheme.headlineMedium?.copyWith(
              fontWeight: FontWeight.bold,
              color: page.color,
            ),
            textAlign: TextAlign.center,
          ),
          
          const SizedBox(height: 20),
          
          // Açıklama
          Text(
            page.description,
            style: Theme.of(context).textTheme.bodyLarge?.copyWith(
              color: Colors.grey[600],
              height: 1.5,
            ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }

  void _nextPage() {
    if (_currentPage < _pages.length - 1) {
      _pageController.nextPage(
        duration: const Duration(milliseconds: 300),
        curve: Curves.easeInOut,
      );
    }
  }

  void _previousPage() {
    if (_currentPage > 0) {
      _pageController.previousPage(
        duration: const Duration(milliseconds: 300),
        curve: Curves.easeInOut,
      );
    }
  }

  void _skipOnboarding() {
    _completeOnboarding();
  }

  void _completeOnboarding() {
    // Onboarding tamamlandı işaretini kaydet
    // StorageService.saveSetting('onboarding_completed', true);
    
    // Ana ekrana yönlendir
    context.go('/');
  }
}

class OnboardingPage {
  final String title;
  final String description;
  final String animationAsset;
  final Color color;

  OnboardingPage({
    required this.title,
    required this.description,
    required this.animationAsset,
    required this.color,
  });
}