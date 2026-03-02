import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../data/stories.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    final heroStory = stories[0];
    final otherStories = stories.sublist(1);

    return SafeArea(
      bottom: false,
      child: SingleChildScrollView(
        physics: const BouncingScrollPhysics(),
        padding: const EdgeInsets.only(bottom: 20),
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
                    'Archive of\nCollective Memory',
                    style: AppTheme.serifStyle.copyWith(
                      fontSize: 32,
                      height: 1.2,
                      color: AppColors.ink,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'Stories, myths & wisdom passed through generations',
                    style: AppTheme.sansStyle.copyWith(
                      fontSize: 15,
                      color: AppColors.inkSoft,
                    ),
                  ),
                ],
              ),
            ),

            // Hero Story
            GestureDetector(
              onTap: () {
                Navigator.pushNamed(context, '/story', arguments: heroStory.id);
              },
              child: Container(
                margin: const EdgeInsets.symmetric(horizontal: 24),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(2),
                  border: Border.all(color: AppColors.border),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withValues(alpha: 0.04),
                      blurRadius: 4,
                      offset: const Offset(0, 2),
                    ),
                  ],
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Padding(
                      padding: const EdgeInsets.fromLTRB(24, 24, 24, 20),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            children: [
                              Icon(Icons.location_on_outlined,
                                  size: 13, color: AppColors.terracotta),
                              const SizedBox(width: 8),
                              Text(
                                heroStory.region.toUpperCase(),
                                style: AppTheme.sansStyle.copyWith(
                                  fontSize: 12,
                                  letterSpacing: 1.2,
                                  color: AppColors.terracotta,
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(height: 12),
                          Text(
                            heroStory.title,
                            style: AppTheme.serifStyle.copyWith(
                              fontSize: 28,
                              height: 1.25,
                              color: AppColors.ink,
                            ),
                          ),
                          if (heroStory.quote != null) ...[
                            const SizedBox(height: 12),
                            Container(
                              padding: const EdgeInsets.only(left: 16),
                              decoration: const BoxDecoration(
                                border: Border(
                                  left: BorderSide(
                                      color: AppColors.olive, width: 2),
                                ),
                              ),
                              child: Padding(
                                padding:
                                    const EdgeInsets.symmetric(vertical: 8),
                                child: Text(
                                  '"${heroStory.quote}"',
                                  style: AppTheme.serifStyle.copyWith(
                                    fontSize: 16,
                                    height: 1.6,
                                    fontStyle: FontStyle.italic,
                                    color: AppColors.inkSoft,
                                  ),
                                ),
                              ),
                            ),
                          ],
                          const SizedBox(height: 12),
                          Text(
                            heroStory.excerpt,
                            style: AppTheme.sansStyle.copyWith(
                              fontSize: 15,
                              height: 1.7,
                              color: AppColors.inkSoft,
                            ),
                          ),
                        ],
                      ),
                    ),
                    Container(
                      height: 1,
                      margin: const EdgeInsets.symmetric(horizontal: 24),
                      color: AppColors.border,
                    ),
                    Padding(
                      padding: const EdgeInsets.symmetric(
                          horizontal: 24, vertical: 12),
                      child: Text(
                        'Read full story \u2192',
                        style: AppTheme.sansStyle.copyWith(
                          fontSize: 13,
                          color: AppColors.olive,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),

            const SizedBox(height: 32),

            // Other Stories
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 24),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'RECENT ADDITIONS',
                    style: AppTheme.sansStyle.copyWith(
                      fontSize: 13,
                      letterSpacing: 1.2,
                      color: AppColors.olive,
                    ),
                  ),
                  const SizedBox(height: 16),
                  ...otherStories.asMap().entries.map((entry) {
                    final index = entry.key;
                    final story = entry.value;
                    return GestureDetector(
                      onTap: () {
                        Navigator.pushNamed(context, '/story',
                            arguments: story.id);
                      },
                      behavior: HitTestBehavior.opaque,
                      child: Container(
                        padding: EdgeInsets.only(
                          top: index > 0 ? 24 : 0,
                        ),
                        decoration: index > 0
                            ? const BoxDecoration(
                                border: Border(
                                  top: BorderSide(color: AppColors.border),
                                ),
                              )
                            : null,
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Row(
                              children: [
                                Icon(Icons.location_on_outlined,
                                    size: 12, color: AppColors.oliveMuted),
                                const SizedBox(width: 8),
                                Text(
                                  story.region,
                                  style: AppTheme.sansStyle.copyWith(
                                    fontSize: 12,
                                    color: AppColors.oliveMuted,
                                  ),
                                ),
                              ],
                            ),
                            const SizedBox(height: 8),
                            Padding(
                              padding: const EdgeInsets.only(left: 24),
                              child: Text(
                                story.title,
                                style: AppTheme.serifStyle.copyWith(
                                  fontSize: 22,
                                  height: 1.3,
                                  color: AppColors.ink,
                                ),
                              ),
                            ),
                            const SizedBox(height: 8),
                            Padding(
                              padding: const EdgeInsets.only(left: 24),
                              child: Text(
                                story.excerpt,
                                style: AppTheme.sansStyle.copyWith(
                                  fontSize: 14,
                                  height: 1.6,
                                  color: AppColors.inkSoft,
                                ),
                              ),
                            ),
                            const SizedBox(height: 24),
                          ],
                        ),
                      ),
                    );
                  }),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
