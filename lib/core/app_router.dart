import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../ui/screens/home_screen.dart';
import '../ui/screens/analysis_screen.dart';
import '../ui/screens/history_screen.dart';
import '../ui/screens/settings_screen.dart';
import '../ui/screens/onboarding_screen.dart';

class AppRouter {
  static final GoRouter router = GoRouter(
    initialLocation: '/onboarding',
    routes: [
      GoRoute(
        path: '/onboarding',
        name: 'onboarding',
        builder: (context, state) => const OnboardingScreen(),
      ),
      GoRoute(
        path: '/',
        name: 'home',
        builder: (context, state) => const HomeScreen(),
      ),
      GoRoute(
        path: '/analysis',
        name: 'analysis',
        builder: (context, state) => const AnalysisScreen(),
      ),
      GoRoute(
        path: '/history',
        name: 'history',
        builder: (context, state) => const HistoryScreen(),
      ),
      GoRoute(
        path: '/settings',
        name: 'settings',
        builder: (context, state) => const SettingsScreen(),
      ),
    ],
  );
}