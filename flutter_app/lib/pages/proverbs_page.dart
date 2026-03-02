import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import '../theme/app_theme.dart';
import '../data/stories.dart' as app_data;
import '../models/story.dart';

class ProverbsPage extends StatefulWidget {
  const ProverbsPage({super.key});

  @override
  State<ProverbsPage> createState() => _ProverbsPageState();
}

class _ProverbsPageState extends State<ProverbsPage> {
  int _currentIndex = 0;
  double _dragStartX = 0;
  double _dragEndX = 0;
  static const double _minSwipeDistance = 50;
  static const int _dailyCount = 7;

  /// Returns 7 proverbs for today, rotating daily based on the date.
  List<Proverb> get _todayProverbs {
    final allProverbs = app_data.proverbs;
    final dayOfYear = _dayOfYear(DateTime.now());
    final totalSets = (allProverbs.length / _dailyCount).ceil();
    final setIndex = (dayOfYear % totalSets);
    final start = (setIndex * _dailyCount) % allProverbs.length;

    final result = <Proverb>[];
    for (var i = 0; i < _dailyCount; i++) {
      result.add(allProverbs[(start + i) % allProverbs.length]);
    }
    return result;
  }

  int _dayOfYear(DateTime date) {
    final firstDay = DateTime(date.year, 1, 1);
    return date.difference(firstDay).inDays;
  }

  void _goToNext() {
    setState(() {
      _currentIndex = (_currentIndex + 1) % _dailyCount;
    });
  }

  void _goToPrevious() {
    setState(() {
      _currentIndex = (_currentIndex - 1 + _dailyCount) % _dailyCount;
    });
  }

  @override
  Widget build(BuildContext context) {
    final dailyProverbs = _todayProverbs;
    final currentProverb = dailyProverbs[_currentIndex];
    final today = DateFormat('d MMMM yyyy').format(DateTime.now());

    return SafeArea(
      bottom: false,
      child: GestureDetector(
        onHorizontalDragStart: (details) {
          _dragStartX = details.globalPosition.dx;
          _dragEndX = 0;
        },
        onHorizontalDragUpdate: (details) {
          _dragEndX = details.globalPosition.dx;
        },
        onHorizontalDragEnd: (details) {
          if (_dragEndX == 0) return;
          final distance = _dragStartX - _dragEndX;
          if (distance > _minSwipeDistance) {
            _goToNext();
          } else if (distance < -_minSwipeDistance) {
            _goToPrevious();
          }
        },
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Header
            Padding(
              padding: const EdgeInsets.fromLTRB(24, 32, 24, 24),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Proverbs & Idioms',
                    style: AppTheme.serifStyle.copyWith(
                      fontSize: 28,
                      height: 1.2,
                      color: AppColors.ink,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'Wisdom distilled into a single breath',
                    style: AppTheme.sansStyle.copyWith(
                      fontSize: 14,
                      color: AppColors.inkSoft,
                    ),
                  ),
                  const SizedBox(height: 12),
                  Row(
                    children: [
                      Icon(Icons.calendar_today_outlined,
                          size: 13, color: AppColors.olive),
                      const SizedBox(width: 6),
                      Text(
                        today,
                        style: AppTheme.sansStyle.copyWith(
                          fontSize: 12,
                          color: AppColors.olive,
                        ),
                      ),
                      const SizedBox(width: 8),
                      Container(
                        width: 3,
                        height: 3,
                        decoration: const BoxDecoration(
                          color: AppColors.oliveMuted,
                          shape: BoxShape.circle,
                        ),
                      ),
                      const SizedBox(width: 8),
                      Text(
                        'Refreshes daily',
                        style: AppTheme.sansStyle.copyWith(
                          fontSize: 12,
                          fontStyle: FontStyle.italic,
                          color: AppColors.oliveMuted,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),

            // Main Proverb Display
            Expanded(
              child: Center(
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 24),
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      // Decorative element
                      Container(
                        width: 48,
                        height: 2,
                        color: AppColors.terracotta,
                      ),
                      const SizedBox(height: 32),

                      // Proverb Text
                      Text(
                        '"${currentProverb.text}"',
                        textAlign: TextAlign.center,
                        style: AppTheme.serifStyle.copyWith(
                          fontSize: 26,
                          height: 1.5,
                          color: AppColors.ink,
                        ),
                      ),
                      const SizedBox(height: 32),

                      // Meaning
                      Container(
                        width: double.infinity,
                        padding: const EdgeInsets.all(20),
                        decoration: BoxDecoration(
                          color: Colors.white.withValues(alpha: 0.6),
                          borderRadius: BorderRadius.circular(2),
                          border: Border.all(color: AppColors.border),
                        ),
                        child: Text(
                          currentProverb.meaning,
                          textAlign: TextAlign.center,
                          style: AppTheme.sansStyle.copyWith(
                            fontSize: 15,
                            height: 1.7,
                            color: AppColors.inkSoft,
                          ),
                        ),
                      ),
                      const SizedBox(height: 24),

                      // Region
                      Text(
                        currentProverb.region,
                        style: AppTheme.sansStyle.copyWith(
                          fontSize: 13,
                          color: AppColors.olive,
                        ),
                      ),

                      const SizedBox(height: 32),

                      // Decorative element
                      Container(
                        width: 32,
                        height: 1,
                        color: AppColors.oliveMuted,
                      ),
                    ],
                  ),
                ),
              ),
            ),

            // Navigation Controls
            Padding(
              padding: const EdgeInsets.fromLTRB(24, 0, 24, 32),
              child: Column(
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      GestureDetector(
                        onTap: _goToPrevious,
                        child: Container(
                          width: 56,
                          height: 56,
                          decoration: BoxDecoration(
                            color: Colors.white,
                            shape: BoxShape.circle,
                            border: Border.all(color: AppColors.border),
                          ),
                          child: const Center(
                            child: Icon(Icons.chevron_left,
                                size: 22, color: AppColors.ink),
                          ),
                        ),
                      ),

                      Text(
                        '${_currentIndex + 1} of $_dailyCount',
                        style: AppTheme.sansStyle.copyWith(
                          fontSize: 13,
                          color: AppColors.oliveMuted,
                        ),
                      ),

                      GestureDetector(
                        onTap: _goToNext,
                        child: Container(
                          width: 56,
                          height: 56,
                          decoration: BoxDecoration(
                            color: Colors.white,
                            shape: BoxShape.circle,
                            border: Border.all(color: AppColors.border),
                          ),
                          child: const Center(
                            child: Icon(Icons.chevron_right,
                                size: 22, color: AppColors.ink),
                          ),
                        ),
                      ),
                    ],
                  ),

                  const SizedBox(height: 24),

                  // Dots indicator (7 dots)
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: List.generate(_dailyCount, (index) {
                      final isActive = index == _currentIndex;
                      return GestureDetector(
                        onTap: () => setState(() => _currentIndex = index),
                        behavior: HitTestBehavior.opaque,
                        child: SizedBox(
                          width: 36,
                          height: 44,
                          child: Center(
                            child: AnimatedContainer(
                              duration: const Duration(milliseconds: 200),
                              width: isActive ? 24 : 6,
                              height: 6,
                              decoration: BoxDecoration(
                                color: isActive
                                    ? AppColors.terracotta
                                    : AppColors.oliveMuted,
                                borderRadius:
                                    BorderRadius.circular(isActive ? 1 : 3),
                              ),
                            ),
                          ),
                        ),
                      );
                    }),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
