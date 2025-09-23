import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:hive_flutter/hive_flutter.dart';
import 'package:permission_handler/permission_handler.dart';

import 'core/app_theme.dart';
import 'core/app_router.dart';
import 'services/ai_service.dart';
import 'services/audio_service.dart';
import 'services/storage_service.dart';
import 'models/cry_analysis.dart';
import 'models/user_feedback.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  // Hive veritabanını başlat
  await Hive.initFlutter();
  Hive.registerAdapter(CryAnalysisAdapter());
  Hive.registerAdapter(CryTypeAdapter());
  Hive.registerAdapter(UserFeedbackAdapter());
  Hive.registerAdapter(FeedbackDataAdapter());
  
  // İzinleri kontrol et ve iste
  await _requestPermissions();
  
  // Servisleri başlat
  await StorageService.initialize();
  await AIService.initialize();
  
  runApp(const ProviderScope(child: BabyCryApp()));
}

Future<void> _requestPermissions() async {
  await [
    Permission.microphone,
    Permission.storage,
  ].request();
}

class BabyCryApp extends ConsumerWidget {
  const BabyCryApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return MaterialApp.router(
      title: 'Bebek Ağlama Analizi',
      theme: AppTheme.lightTheme,
      darkTheme: AppTheme.darkTheme,
      themeMode: ThemeMode.system,
      routerConfig: AppRouter.router,
      debugShowCheckedModeBanner: false,
      locale: const Locale('tr', 'TR'),
      supportedLocales: const [
        Locale('tr', 'TR'),
        Locale('en', 'US'),
      ],
    );
  }
}