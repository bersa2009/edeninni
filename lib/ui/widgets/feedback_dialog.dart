import 'package:flutter/material.dart';
import 'package:uuid/uuid.dart';
import '../../models/cry_analysis.dart';
import '../../models/user_feedback.dart';

class FeedbackDialog extends StatefulWidget {
  final CryAnalysis analysis;
  final Function(FeedbackData) onFeedbackSubmitted;

  const FeedbackDialog({
    super.key,
    required this.analysis,
    required this.onFeedbackSubmitted,
  });

  @override
  State<FeedbackDialog> createState() => _FeedbackDialogState();
}

class _FeedbackDialogState extends State<FeedbackDialog> {
  bool? _wasAccurate;
  CryType? _correctedType;
  int _satisfactionRating = 3;
  bool _suggestionWasHelpful = true;
  String _additionalComments = '';
  final _commentsController = TextEditingController();

  @override
  void dispose() {
    _commentsController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: const Text('Analiz Değerlendirmesi'),
      content: SingleChildScrollView(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Analiz: ${widget.analysis.cryType.displayName}',
              style: Theme.of(context).textTheme.titleMedium?.copyWith(
                fontWeight: FontWeight.w600,
              ),
            ),
            const SizedBox(height: 20),
            
            // Doğruluk kontrolü
            _buildAccuracySection(),
            const SizedBox(height: 20),
            
            // Düzeltme seçimi (eğer yanlışsa)
            if (_wasAccurate == false) ...[
              _buildCorrectionSection(),
              const SizedBox(height: 20),
            ],
            
            // Memnuniyet skoru
            _buildSatisfactionSection(),
            const SizedBox(height: 20),
            
            // Öneri yardımcı oldu mu?
            _buildSuggestionSection(),
            const SizedBox(height: 20),
            
            // Ek yorumlar
            _buildCommentsSection(),
          ],
        ),
      ),
      actions: [
        TextButton(
          onPressed: () => Navigator.of(context).pop(),
          child: const Text('İptal'),
        ),
        ElevatedButton(
          onPressed: _wasAccurate != null ? _submitFeedback : null,
          child: const Text('Gönder'),
        ),
      ],
    );
  }

  Widget _buildAccuracySection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Analiz doğru muydu?',
          style: Theme.of(context).textTheme.titleSmall?.copyWith(
            fontWeight: FontWeight.w600,
          ),
        ),
        const SizedBox(height: 8),
        Row(
          children: [
            Expanded(
              child: RadioListTile<bool>(
                title: const Text('Evet'),
                value: true,
                groupValue: _wasAccurate,
                onChanged: (value) {
                  setState(() {
                    _wasAccurate = value;
                    _correctedType = null;
                  });
                },
                contentPadding: EdgeInsets.zero,
              ),
            ),
            Expanded(
              child: RadioListTile<bool>(
                title: const Text('Hayır'),
                value: false,
                groupValue: _wasAccurate,
                onChanged: (value) {
                  setState(() {
                    _wasAccurate = value;
                  });
                },
                contentPadding: EdgeInsets.zero,
              ),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildCorrectionSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Doğru ağlama türü hangisiydi?',
          style: Theme.of(context).textTheme.titleSmall?.copyWith(
            fontWeight: FontWeight.w600,
          ),
        ),
        const SizedBox(height: 8),
        DropdownButtonFormField<CryType>(
          value: _correctedType,
          decoration: const InputDecoration(
            hintText: 'Doğru türü seçin',
            border: OutlineInputBorder(),
          ),
          items: CryType.values
              .where((type) => type != CryType.unknown)
              .map((type) => DropdownMenuItem(
                    value: type,
                    child: Text(type.displayName),
                  ))
              .toList(),
          onChanged: (value) {
            setState(() {
              _correctedType = value;
            });
          },
        ),
      ],
    );
  }

  Widget _buildSatisfactionSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Genel memnuniyetiniz? (1-5)',
          style: Theme.of(context).textTheme.titleSmall?.copyWith(
            fontWeight: FontWeight.w600,
          ),
        ),
        const SizedBox(height: 8),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: List.generate(5, (index) {
            final rating = index + 1;
            return GestureDetector(
              onTap: () {
                setState(() {
                  _satisfactionRating = rating;
                });
              },
              child: Icon(
                Icons.star,
                size: 32,
                color: rating <= _satisfactionRating
                    ? Colors.amber
                    : Colors.grey[300],
              ),
            );
          }),
        ),
        const SizedBox(height: 8),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              'Çok kötü',
              style: Theme.of(context).textTheme.bodySmall?.copyWith(
                color: Colors.grey[600],
              ),
            ),
            Text(
              'Mükemmel',
              style: Theme.of(context).textTheme.bodySmall?.copyWith(
                color: Colors.grey[600],
              ),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildSuggestionSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Öneriler yardımcı oldu mu?',
          style: Theme.of(context).textTheme.titleSmall?.copyWith(
            fontWeight: FontWeight.w600,
          ),
        ),
        const SizedBox(height: 8),
        Row(
          children: [
            Expanded(
              child: RadioListTile<bool>(
                title: const Text('Evet'),
                value: true,
                groupValue: _suggestionWasHelpful,
                onChanged: (value) {
                  setState(() {
                    _suggestionWasHelpful = value ?? true;
                  });
                },
                contentPadding: EdgeInsets.zero,
              ),
            ),
            Expanded(
              child: RadioListTile<bool>(
                title: const Text('Hayır'),
                value: false,
                groupValue: _suggestionWasHelpful,
                onChanged: (value) {
                  setState(() {
                    _suggestionWasHelpful = value ?? true;
                  });
                },
                contentPadding: EdgeInsets.zero,
              ),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildCommentsSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Ek yorumlarınız (opsiyonel)',
          style: Theme.of(context).textTheme.titleSmall?.copyWith(
            fontWeight: FontWeight.w600,
          ),
        ),
        const SizedBox(height: 8),
        TextField(
          controller: _commentsController,
          decoration: const InputDecoration(
            hintText: 'Yorumlarınızı yazın...',
            border: OutlineInputBorder(),
          ),
          maxLines: 3,
          onChanged: (value) {
            _additionalComments = value;
          },
        ),
      ],
    );
  }

  void _submitFeedback() {
    final feedback = FeedbackData(
      id: const Uuid().v4(),
      analysisId: widget.analysis.id,
      wasAccurate: _wasAccurate!,
      correctedType: _correctedType,
      satisfactionRating: _satisfactionRating,
      suggestionWasHelpful: _suggestionWasHelpful,
      additionalComments: _additionalComments.isEmpty ? null : _additionalComments,
      createdAt: DateTime.now(),
    );

    widget.onFeedbackSubmitted(feedback);
    Navigator.of(context).pop();
  }
}