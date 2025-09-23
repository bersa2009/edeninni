import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';
import '../../models/cry_analysis.dart';
import '../../models/user_feedback.dart';
import '../../services/storage_service.dart';
import 'feedback_dialog.dart';

class AnalysisCard extends StatelessWidget {
  final CryAnalysis analysis;
  final bool showFeedbackButton;

  const AnalysisCard({
    super.key,
    required this.analysis,
    this.showFeedbackButton = false,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 4,
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildHeader(context),
            const SizedBox(height: 16),
            _buildMainInfo(context),
            const SizedBox(height: 16),
            _buildConfidenceChart(context),
            const SizedBox(height: 16),
            _buildSuggestion(context),
            if (showFeedbackButton) ...[
              const SizedBox(height: 20),
              _buildFeedbackButton(context),
            ],
          ],
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
              analysis.cryType.displayName,
              style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                fontWeight: FontWeight.bold,
                color: _getCryTypeColor(analysis.cryType),
              ),
            ),
            const SizedBox(height: 4),
            Text(
              _formatDateTime(analysis.timestamp),
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                color: Colors.grey[600],
              ),
            ),
          ],
        ),
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
          decoration: BoxDecoration(
            color: _getConfidenceColor(analysis.confidence).withOpacity(0.1),
            borderRadius: BorderRadius.circular(20),
            border: Border.all(
              color: _getConfidenceColor(analysis.confidence).withOpacity(0.3),
            ),
          ),
          child: Text(
            '${(analysis.confidence * 100).toStringAsFixed(0)}%',
            style: TextStyle(
              color: _getConfidenceColor(analysis.confidence),
              fontWeight: FontWeight.w600,
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildMainInfo(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.grey[50],
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(
                _getCryTypeIcon(analysis.cryType),
                color: _getCryTypeColor(analysis.cryType),
                size: 24,
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Text(
                  analysis.cryType.description,
                  style: Theme.of(context).textTheme.bodyLarge,
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          Row(
            children: [
              Icon(
                Icons.access_time,
                size: 16,
                color: Colors.grey[600],
              ),
              const SizedBox(width: 8),
              Text(
                'Süre: ${_formatDuration(analysis.duration)}',
                style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                  color: Colors.grey[600],
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildConfidenceChart(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Güven Skoru',
          style: Theme.of(context).textTheme.titleMedium?.copyWith(
            fontWeight: FontWeight.w600,
          ),
        ),
        const SizedBox(height: 12),
        SizedBox(
          height: 8,
          child: LinearProgressIndicator(
            value: analysis.confidence,
            backgroundColor: Colors.grey[200],
            valueColor: AlwaysStoppedAnimation<Color>(
              _getConfidenceColor(analysis.confidence),
            ),
            borderRadius: BorderRadius.circular(4),
          ),
        ),
        const SizedBox(height: 8),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              'Düşük',
              style: Theme.of(context).textTheme.bodySmall?.copyWith(
                color: Colors.grey[600],
              ),
            ),
            Text(
              'Yüksek',
              style: Theme.of(context).textTheme.bodySmall?.copyWith(
                color: Colors.grey[600],
              ),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildSuggestion(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Theme.of(context).primaryColor.withOpacity(0.1),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: Theme.of(context).primaryColor.withOpacity(0.2),
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(
                Icons.lightbulb_outline,
                color: Theme.of(context).primaryColor,
                size: 20,
              ),
              const SizedBox(width: 8),
              Text(
                'Öneri',
                style: Theme.of(context).textTheme.titleSmall?.copyWith(
                  fontWeight: FontWeight.w600,
                  color: Theme.of(context).primaryColor,
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
          Text(
            analysis.cryType.suggestion,
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
              color: Theme.of(context).primaryColor.withOpacity(0.8),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildFeedbackButton(BuildContext context) {
    return SizedBox(
      width: double.infinity,
      child: ElevatedButton.icon(
        onPressed: () => _showFeedbackDialog(context),
        icon: const Icon(Icons.feedback_outlined),
        label: const Text('Geri Bildirim Ver'),
        style: ElevatedButton.styleFrom(
          padding: const EdgeInsets.symmetric(vertical: 12),
        ),
      ),
    );
  }

  void _showFeedbackDialog(BuildContext context) {
    showDialog(
      context: context,
      builder: (context) => FeedbackDialog(
        analysis: analysis,
        onFeedbackSubmitted: (feedback) async {
          await StorageService.saveFeedback(feedback);
          if (context.mounted) {
            ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(
                content: Text('Geri bildiriminiz kaydedildi. Teşekkürler!'),
                backgroundColor: Colors.green,
              ),
            );
          }
        },
      ),
    );
  }

  Color _getCryTypeColor(CryType type) {
    switch (type) {
      case CryType.hungry:
        return Colors.orange;
      case CryType.sleepy:
        return Colors.purple;
      case CryType.uncomfortable:
        return Colors.red;
      case CryType.pain:
        return Colors.red[700]!;
      case CryType.attention:
        return Colors.blue;
      case CryType.unknown:
        return Colors.grey;
    }
  }

  IconData _getCryTypeIcon(CryType type) {
    switch (type) {
      case CryType.hungry:
        return Icons.restaurant;
      case CryType.sleepy:
        return Icons.bedtime;
      case CryType.uncomfortable:
        return Icons.child_care;
      case CryType.pain:
        return Icons.healing;
      case CryType.attention:
        return Icons.favorite;
      case CryType.unknown:
        return Icons.help_outline;
    }
  }

  Color _getConfidenceColor(double confidence) {
    if (confidence >= 0.8) return Colors.green;
    if (confidence >= 0.6) return Colors.orange;
    return Colors.red;
  }

  String _formatDateTime(DateTime dateTime) {
    return '${dateTime.day}/${dateTime.month}/${dateTime.year} ${dateTime.hour.toString().padLeft(2, '0')}:${dateTime.minute.toString().padLeft(2, '0')}';
  }

  String _formatDuration(Duration duration) {
    String twoDigits(int n) => n.toString().padLeft(2, '0');
    String minutes = twoDigits(duration.inMinutes);
    String seconds = twoDigits(duration.inSeconds.remainder(60));
    return '$minutes:$seconds';
  }
}