import 'package:flutter/material.dart';

class RecordingButton extends StatelessWidget {
  final bool isRecording;
  final bool isAnalyzing;
  final VoidCallback? onPressed;
  final AnimationController pulseAnimation;

  const RecordingButton({
    super.key,
    required this.isRecording,
    required this.isAnalyzing,
    required this.onPressed,
    required this.pulseAnimation,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onPressed,
      child: AnimatedBuilder(
        animation: pulseAnimation,
        builder: (context, child) {
          return Container(
            width: 120,
            height: 120,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              gradient: LinearGradient(
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
                colors: isRecording
                    ? [Colors.red[400]!, Colors.red[600]!]
                    : isAnalyzing
                        ? [Colors.orange[400]!, Colors.orange[600]!]
                        : [Theme.of(context).primaryColor, Theme.of(context).primaryColor.withOpacity(0.8)],
              ),
              boxShadow: [
                BoxShadow(
                  color: (isRecording ? Colors.red : Theme.of(context).primaryColor).withOpacity(0.3),
                  blurRadius: 20,
                  spreadRadius: isRecording ? 5 + (pulseAnimation.value * 10) : 0,
                ),
              ],
            ),
            child: Center(
              child: AnimatedSwitcher(
                duration: const Duration(milliseconds: 300),
                child: isAnalyzing
                    ? const CircularProgressIndicator(
                        color: Colors.white,
                        strokeWidth: 3,
                      )
                    : Icon(
                        isRecording ? Icons.stop : Icons.mic,
                        size: 48,
                        color: Colors.white,
                        key: ValueKey(isRecording),
                      ),
              ),
            ),
          );
        },
      ),
    );
  }
}