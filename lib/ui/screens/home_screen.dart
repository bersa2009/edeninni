import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:lottie/lottie.dart';

import '../../services/audio_service.dart';
import '../../services/storage_service.dart';
import '../../models/cry_analysis.dart';
import '../widgets/recording_button.dart';
import '../widgets/analysis_card.dart';
import '../widgets/quick_stats_card.dart';
import '../providers/audio_provider.dart';

class HomeScreen extends ConsumerStatefulWidget {
  const HomeScreen({super.key});

  @override
  ConsumerState<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends ConsumerState<HomeScreen> with TickerProviderStateMixin {
  late AnimationController _pulseController;
  late AnimationController _waveController;
  CryAnalysis? _lastAnalysis;

  @override
  void initState() {
    super.initState();
    _pulseController = AnimationController(
      duration: const Duration(seconds: 2),
      vsync: this,
    )..repeat();
    
    _waveController = AnimationController(
      duration: const Duration(milliseconds: 1500),
      vsync: this,
    )..repeat();
    
    _loadLastAnalysis();
  }

  @override
  void dispose() {
    _pulseController.dispose();
    _waveController.dispose();
    super.dispose();
  }

  void _loadLastAnalysis() {
    final analyses = StorageService.getAllAnalyses();
    if (analyses.isNotEmpty) {
      setState(() {
        _lastAnalysis = analyses.first;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final audioState = ref.watch(audioProvider);
    
    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _buildHeader(context),
              const SizedBox(height: 30),
              _buildMainRecordingArea(context, audioState),
              const SizedBox(height: 30),
              if (_lastAnalysis != null) ...[
                _buildLastAnalysisSection(),
                const SizedBox(height: 30),
              ],
              _buildQuickStats(),
              const SizedBox(height: 30),
              _buildQuickActions(context),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildHeader(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Merhaba! 👋',
              style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                fontWeight: FontWeight.w600,
                color: Colors.grey[600],
              ),
            ),
            const SizedBox(height: 4),
            Text(
              'Bebeğinizi dinlemeye hazırım',
              style: Theme.of(context).textTheme.titleLarge?.copyWith(
                fontWeight: FontWeight.bold,
              ),
            ),
          ],
        ),
        IconButton(
          onPressed: () => context.push('/settings'),
          icon: const Icon(Icons.settings_outlined),
          style: IconButton.styleFrom(
            backgroundColor: Colors.grey[100],
            padding: const EdgeInsets.all(12),
          ),
        ),
      ],
    );
  }

  Widget _buildMainRecordingArea(BuildContext context, AudioService audioState) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(30),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [
            Theme.of(context).primaryColor.withOpacity(0.1),
            Theme.of(context).primaryColor.withOpacity(0.05),
          ],
        ),
        borderRadius: BorderRadius.circular(24),
        border: Border.all(
          color: Theme.of(context).primaryColor.withOpacity(0.2),
          width: 1,
        ),
      ),
      child: Column(
        children: [
          // Ses dalgası animasyonu
          if (audioState.isRecording)
            SizedBox(
              height: 80,
              child: AnimatedBuilder(
                animation: _waveController,
                builder: (context, child) {
                  return CustomPaint(
                    painter: SoundWavePainter(
                      amplitude: audioState.currentAmplitude,
                      animation: _waveController,
                    ),
                    size: const Size(double.infinity, 80),
                  );
                },
              ),
            )
          else
            SizedBox(
              height: 120,
              child: Lottie.asset(
                'assets/animations/microphone.json',
                repeat: false,
              ),
            ),
          
          const SizedBox(height: 20),
          
          // Durum metni
          Text(
            audioState.isRecording 
                ? 'Dinliyorum...' 
                : audioState.isAnalyzing 
                    ? 'Analiz ediyorum...'
                    : 'Kayıt için butona basın',
            style: Theme.of(context).textTheme.titleMedium?.copyWith(
              fontWeight: FontWeight.w500,
              color: audioState.isRecording 
                  ? Theme.of(context).primaryColor
                  : Colors.grey[600],
            ),
          ),
          
          if (audioState.isRecording) ...[
            const SizedBox(height: 8),
            Text(
              _formatDuration(audioState.recordingDuration),
              style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                color: Theme.of(context).primaryColor,
                fontWeight: FontWeight.w600,
              ),
            ),
          ],
          
          const SizedBox(height: 30),
          
          // Kayıt butonu
          RecordingButton(
            isRecording: audioState.isRecording,
            isAnalyzing: audioState.isAnalyzing,
            onPressed: audioState.isAnalyzing ? null : _toggleRecording,
            pulseAnimation: _pulseController,
          ),
        ],
      ),
    );
  }

  Widget _buildLastAnalysisSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              'Son Analiz',
              style: Theme.of(context).textTheme.titleLarge?.copyWith(
                fontWeight: FontWeight.bold,
              ),
            ),
            TextButton(
              onPressed: () => context.push('/history'),
              child: const Text('Tümünü Gör'),
            ),
          ],
        ),
        const SizedBox(height: 16),
        AnalysisCard(analysis: _lastAnalysis!),
      ],
    );
  }

  Widget _buildQuickStats() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Hızlı İstatistikler',
          style: Theme.of(context).textTheme.titleLarge?.copyWith(
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 16),
        const QuickStatsCard(),
      ],
    );
  }

  Widget _buildQuickActions(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Hızlı Erişim',
          style: Theme.of(context).textTheme.titleLarge?.copyWith(
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 16),
        Row(
          children: [
            Expanded(
              child: _buildActionCard(
                context: context,
                icon: Icons.history,
                title: 'Geçmiş',
                subtitle: 'Önceki analizler',
                onTap: () => context.push('/history'),
              ),
            ),
            const SizedBox(width: 16),
            Expanded(
              child: _buildActionCard(
                context: context,
                icon: Icons.analytics_outlined,
                title: 'Analiz',
                subtitle: 'Detaylı görünüm',
                onTap: () => context.push('/analysis'),
              ),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildActionCard({
    required BuildContext context,
    required IconData icon,
    required String title,
    required String subtitle,
    required VoidCallback onTap,
  }) {
    return Card(
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(16),
        child: Padding(
          padding: const EdgeInsets.all(20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Icon(
                icon,
                size: 32,
                color: Theme.of(context).primaryColor,
              ),
              const SizedBox(height: 12),
              Text(
                title,
                style: Theme.of(context).textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.w600,
                ),
              ),
              const SizedBox(height: 4),
              Text(
                subtitle,
                style: Theme.of(context).textTheme.bodySmall?.copyWith(
                  color: Colors.grey[600],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  void _toggleRecording() async {
    final audioService = ref.read(audioProvider);
    
    try {
      if (audioService.isRecording) {
        final analysis = await audioService.stopRecording();
        if (analysis != null) {
          await StorageService.saveAnalysis(analysis);
          setState(() {
            _lastAnalysis = analysis;
          });
          
          // Analiz sonucunu göster
          if (mounted) {
            _showAnalysisResult(analysis);
          }
        }
      } else {
        await audioService.startRecording();
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Hata: ${e.toString()}'),
            backgroundColor: Colors.red,
          ),
        );
      }
    }
  }

  void _showAnalysisResult(CryAnalysis analysis) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => Container(
        height: MediaQuery.of(context).size.height * 0.7,
        decoration: const BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.only(
            topLeft: Radius.circular(24),
            topRight: Radius.circular(24),
          ),
        ),
        child: Column(
          children: [
            Container(
              width: 40,
              height: 4,
              margin: const EdgeInsets.only(top: 12),
              decoration: BoxDecoration(
                color: Colors.grey[300],
                borderRadius: BorderRadius.circular(2),
              ),
            ),
            Expanded(
              child: Padding(
                padding: const EdgeInsets.all(20),
                child: AnalysisCard(
                  analysis: analysis,
                  showFeedbackButton: true,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  String _formatDuration(Duration duration) {
    String twoDigits(int n) => n.toString().padLeft(2, '0');
    String minutes = twoDigits(duration.inMinutes);
    String seconds = twoDigits(duration.inSeconds.remainder(60));
    return '$minutes:$seconds';
  }
}

// Ses dalgası çizen custom painter
class SoundWavePainter extends CustomPainter {
  final double amplitude;
  final Animation<double> animation;

  SoundWavePainter({required this.amplitude, required this.animation});

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = Colors.blue.withOpacity(0.6)
      ..strokeWidth = 2
      ..style = PaintingStyle.stroke;

    final path = Path();
    final centerY = size.height / 2;
    
    for (double x = 0; x <= size.width; x += 2) {
      final normalizedX = x / size.width;
      final wave1 = amplitude * 20 * 
          (0.5 + 0.5 * (normalizedX * 2 * 3.14159 + animation.value * 2 * 3.14159).sin());
      final wave2 = amplitude * 15 * 
          (0.5 + 0.5 * (normalizedX * 4 * 3.14159 + animation.value * 4 * 3.14159).sin());
      
      final y = centerY + wave1 + wave2;
      
      if (x == 0) {
        path.moveTo(x, y);
      } else {
        path.lineTo(x, y);
      }
    }
    
    canvas.drawPath(path, paint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => true;
}