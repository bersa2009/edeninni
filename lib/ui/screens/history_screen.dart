import 'package:flutter/material.dart';
import '../../services/storage_service.dart';
import '../../models/cry_analysis.dart';
import '../widgets/analysis_card.dart';

class HistoryScreen extends StatefulWidget {
  const HistoryScreen({super.key});

  @override
  State<HistoryScreen> createState() => _HistoryScreenState();
}

class _HistoryScreenState extends State<HistoryScreen> {
  List<CryAnalysis> _analyses = [];
  List<CryAnalysis> _filteredAnalyses = [];
  String _searchQuery = '';
  CryType? _selectedFilter;
  DateTimeRange? _dateRange;

  @override
  void initState() {
    super.initState();
    _loadAnalyses();
  }

  void _loadAnalyses() {
    setState(() {
      _analyses = StorageService.getAllAnalyses();
      _filteredAnalyses = _analyses;
    });
  }

  void _applyFilters() {
    setState(() {
      _filteredAnalyses = _analyses.where((analysis) {
        // Arama filtresi
        if (_searchQuery.isNotEmpty) {
          final searchLower = _searchQuery.toLowerCase();
          if (!analysis.cryType.displayName.toLowerCase().contains(searchLower) &&
              !analysis.cryType.description.toLowerCase().contains(searchLower)) {
            return false;
          }
        }

        // Tür filtresi
        if (_selectedFilter != null && analysis.cryType != _selectedFilter) {
          return false;
        }

        // Tarih filtresi
        if (_dateRange != null) {
          if (analysis.timestamp.isBefore(_dateRange!.start) ||
              analysis.timestamp.isAfter(_dateRange!.end.add(const Duration(days: 1)))) {
            return false;
          }
        }

        return true;
      }).toList();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Analiz Geçmişi'),
        elevation: 0,
        actions: [
          IconButton(
            onPressed: _showFilterDialog,
            icon: Badge(
              isLabelVisible: _hasActiveFilters(),
              child: const Icon(Icons.filter_list),
            ),
          ),
        ],
      ),
      body: Column(
        children: [
          // Arama çubuğu
          Padding(
            padding: const EdgeInsets.all(16),
            child: TextField(
              decoration: const InputDecoration(
                hintText: 'Analiz ara...',
                prefixIcon: Icon(Icons.search),
                border: OutlineInputBorder(),
              ),
              onChanged: (value) {
                _searchQuery = value;
                _applyFilters();
              },
            ),
          ),

          // Aktif filtreler
          if (_hasActiveFilters()) _buildActiveFilters(),

          // Analiz listesi
          Expanded(
            child: _filteredAnalyses.isEmpty
                ? _buildEmptyState()
                : ListView.builder(
                    padding: const EdgeInsets.all(16),
                    itemCount: _filteredAnalyses.length,
                    itemBuilder: (context, index) {
                      final analysis = _filteredAnalyses[index];
                      return Padding(
                        padding: const EdgeInsets.only(bottom: 16),
                        child: Dismissible(
                          key: Key(analysis.id),
                          direction: DismissDirection.endToStart,
                          background: Container(
                            alignment: Alignment.centerRight,
                            padding: const EdgeInsets.only(right: 20),
                            decoration: BoxDecoration(
                              color: Colors.red,
                              borderRadius: BorderRadius.circular(16),
                            ),
                            child: const Icon(
                              Icons.delete,
                              color: Colors.white,
                              size: 24,
                            ),
                          ),
                          confirmDismiss: (direction) => _confirmDelete(analysis),
                          onDismissed: (direction) => _deleteAnalysis(analysis),
                          child: AnalysisCard(
                            analysis: analysis,
                            showFeedbackButton: true,
                          ),
                        ),
                      );
                    },
                  ),
          ),
        ],
      ),
    );
  }

  Widget _buildEmptyState() {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(
            _hasActiveFilters() ? Icons.search_off : Icons.history,
            size: 64,
            color: Colors.grey[400],
          ),
          const SizedBox(height: 16),
          Text(
            _hasActiveFilters() 
                ? 'Filtre kriterlerine uygun analiz bulunamadı'
                : 'Henüz analiz geçmişi bulunmuyor',
            style: Theme.of(context).textTheme.titleLarge?.copyWith(
              color: Colors.grey[600],
            ),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 8),
          Text(
            _hasActiveFilters()
                ? 'Filtreleri temizleyerek tüm analizleri görebilirsiniz'
                : 'Bebek ağlama analizi yaparak geçmişi görüntüleyebilirsiniz',
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
              color: Colors.grey[500],
            ),
            textAlign: TextAlign.center,
          ),
          if (_hasActiveFilters()) ...[
            const SizedBox(height: 16),
            ElevatedButton(
              onPressed: _clearFilters,
              child: const Text('Filtreleri Temizle'),
            ),
          ],
        ],
      ),
    );
  }

  Widget _buildActiveFilters() {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      child: Wrap(
        spacing: 8,
        runSpacing: 8,
        children: [
          if (_selectedFilter != null)
            Chip(
              label: Text(_selectedFilter!.displayName),
              onDeleted: () {
                setState(() {
                  _selectedFilter = null;
                });
                _applyFilters();
              },
            ),
          if (_dateRange != null)
            Chip(
              label: Text(
                '${_formatDate(_dateRange!.start)} - ${_formatDate(_dateRange!.end)}',
              ),
              onDeleted: () {
                setState(() {
                  _dateRange = null;
                });
                _applyFilters();
              },
            ),
        ],
      ),
    );
  }

  void _showFilterDialog() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Filtrele'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Tür filtresi
            Text(
              'Ağlama Türü',
              style: Theme.of(context).textTheme.titleSmall?.copyWith(
                fontWeight: FontWeight.w600,
              ),
            ),
            const SizedBox(height: 8),
            DropdownButtonFormField<CryType?>(
              value: _selectedFilter,
              decoration: const InputDecoration(
                hintText: 'Tür seçin',
                border: OutlineInputBorder(),
              ),
              items: [
                const DropdownMenuItem<CryType?>(
                  value: null,
                  child: Text('Tümü'),
                ),
                ...CryType.values
                    .where((type) => type != CryType.unknown)
                    .map((type) => DropdownMenuItem(
                          value: type,
                          child: Text(type.displayName),
                        )),
              ],
              onChanged: (value) {
                setState(() {
                  _selectedFilter = value;
                });
              },
            ),
            const SizedBox(height: 16),

            // Tarih filtresi
            Text(
              'Tarih Aralığı',
              style: Theme.of(context).textTheme.titleSmall?.copyWith(
                fontWeight: FontWeight.w600,
              ),
            ),
            const SizedBox(height: 8),
            OutlinedButton(
              onPressed: _selectDateRange,
              child: Text(
                _dateRange != null
                    ? '${_formatDate(_dateRange!.start)} - ${_formatDate(_dateRange!.end)}'
                    : 'Tarih aralığı seçin',
              ),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('İptal'),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.of(context).pop();
              _applyFilters();
            },
            child: const Text('Uygula'),
          ),
        ],
      ),
    );
  }

  Future<void> _selectDateRange() async {
    final DateTimeRange? picked = await showDateRangePicker(
      context: context,
      firstDate: DateTime.now().subtract(const Duration(days: 365)),
      lastDate: DateTime.now(),
      initialDateRange: _dateRange,
    );

    if (picked != null) {
      setState(() {
        _dateRange = picked;
      });
    }
  }

  Future<bool> _confirmDelete(CryAnalysis analysis) async {
    return await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Analizi Sil'),
        content: Text(
          '${analysis.cryType.displayName} analizini silmek istediğinizden emin misiniz?',
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(false),
            child: const Text('İptal'),
          ),
          ElevatedButton(
            onPressed: () => Navigator.of(context).pop(true),
            style: ElevatedButton.styleFrom(backgroundColor: Colors.red),
            child: const Text('Sil'),
          ),
        ],
      ),
    ) ?? false;
  }

  Future<void> _deleteAnalysis(CryAnalysis analysis) async {
    try {
      await StorageService.deleteAnalysis(analysis.id);
      _loadAnalyses();
      
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Analiz silindi'),
            backgroundColor: Colors.green,
          ),
        );
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

  void _clearFilters() {
    setState(() {
      _selectedFilter = null;
      _dateRange = null;
      _searchQuery = '';
    });
    _applyFilters();
  }

  bool _hasActiveFilters() {
    return _selectedFilter != null || _dateRange != null || _searchQuery.isNotEmpty;
  }

  String _formatDate(DateTime date) {
    return '${date.day}/${date.month}/${date.year}';
  }
}