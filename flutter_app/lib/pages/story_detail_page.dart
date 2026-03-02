import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../data/stories.dart' as app_data;

class StoryDetailPage extends StatelessWidget {
  final String storyId;

  const StoryDetailPage({super.key, required this.storyId});

  @override
  Widget build(BuildContext context) {
    final story = app_data.stories.firstWhere(
      (s) => s.id == storyId,
      orElse: () => app_data.stories[0],
    );

    final relatedStories = story.relatedStories != null
        ? app_data.stories
            .where((s) => story.relatedStories!.contains(s.id))
            .toList()
        : <dynamic>[];

    return Scaffold(
      backgroundColor: AppColors.textureBg,
      body: Column(
        children: [
          // Sticky Header
          Container(
            color: AppColors.cream.withValues(alpha: 0.95),
            child: SafeArea(
              bottom: false,
              child: Container(
                decoration: const BoxDecoration(
                  border: Border(
                    bottom: BorderSide(color: AppColors.border),
                  ),
                ),
                padding:
                    const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    GestureDetector(
                      onTap: () => Navigator.pop(context),
                      child: const Padding(
                        padding: EdgeInsets.all(8),
                        child: Icon(Icons.arrow_back,
                            size: 22, color: AppColors.ink),
                      ),
                    ),
                    Row(
                      children: [
                        GestureDetector(
                          onTap: () {},
                          child: const Padding(
                            padding: EdgeInsets.all(8),
                            child: Icon(Icons.bookmark_border,
                                size: 20, color: AppColors.inkSoft),
                          ),
                        ),
                        GestureDetector(
                          onTap: () {},
                          child: const Padding(
                            padding: EdgeInsets.all(8),
                            child: Icon(Icons.share_outlined,
                                size: 20, color: AppColors.inkSoft),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
          ),

          // Story Content
          Expanded(
            child: SingleChildScrollView(
              physics: const BouncingScrollPhysics(),
              padding: const EdgeInsets.fromLTRB(24, 32, 24, 96),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Region
                  Row(
                    children: [
                      const Icon(Icons.location_on_outlined,
                          size: 14, color: AppColors.terracotta),
                      const SizedBox(width: 8),
                      Text(
                        story.region.toUpperCase(),
                        style: AppTheme.sansStyle.copyWith(
                          fontSize: 12,
                          letterSpacing: 1.2,
                          color: AppColors.terracotta,
                        ),
                      ),
                    ],
                  ),

                  const SizedBox(height: 24),

                  // Title
                  Text(
                    story.title,
                    style: AppTheme.serifStyle.copyWith(
                      fontSize: 36,
                      height: 1.2,
                      color: AppColors.ink,
                    ),
                  ),

                  const SizedBox(height: 16),

                  // Origin
                  Text(
                    story.origin,
                    style: AppTheme.serifStyle.copyWith(
                      fontSize: 13,
                      fontStyle: FontStyle.italic,
                      color: AppColors.oliveMuted,
                    ),
                  ),

                  const SizedBox(height: 32),

                  // Divider
                  Container(height: 1, color: AppColors.border),

                  const SizedBox(height: 32),

                  // Body Text
                  ...story.content.split('\n\n').asMap().entries.map((entry) {
                    final index = entry.key;
                    final paragraph = entry.value;

                    if (index == 0) {
                      // First paragraph with drop cap
                      return _buildDropCapParagraph(paragraph);
                    }

                    return Padding(
                      padding: const EdgeInsets.only(bottom: 16),
                      child: Text(
                        paragraph,
                        style: AppTheme.sansStyle.copyWith(
                          fontSize: 16,
                          height: 1.75,
                          color: AppColors.ink,
                        ),
                      ),
                    );
                  }),

                  // Pull Quote
                  if (story.quote != null) ...[
                    const SizedBox(height: 32),
                    Container(
                      padding: const EdgeInsets.all(24),
                      decoration: BoxDecoration(
                        color: AppColors.creamWarm,
                        border: const Border(
                          left: BorderSide(
                              color: AppColors.terracotta, width: 3),
                        ),
                      ),
                      child: Text(
                        '"${story.quote}"',
                        style: AppTheme.serifStyle.copyWith(
                          fontSize: 20,
                          height: 1.6,
                          fontStyle: FontStyle.italic,
                          color: AppColors.ink,
                        ),
                      ),
                    ),
                  ],

                  // Related Stories
                  if (relatedStories.isNotEmpty) ...[
                    const SizedBox(height: 64),
                    Container(height: 1, color: AppColors.border),
                    const SizedBox(height: 32),
                    Text(
                      'Related from this region',
                      style: AppTheme.serifStyle.copyWith(
                        fontSize: 18,
                        color: AppColors.ink,
                      ),
                    ),
                    const SizedBox(height: 24),
                    ...relatedStories.map((related) {
                      return GestureDetector(
                        onTap: () {
                          Navigator.pushNamed(context, '/story',
                              arguments: related.id);
                        },
                        behavior: HitTestBehavior.opaque,
                        child: Padding(
                          padding: const EdgeInsets.only(bottom: 20),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                related.title,
                                style: AppTheme.serifStyle.copyWith(
                                  fontSize: 18,
                                  height: 1.3,
                                  color: AppColors.ink,
                                ),
                              ),
                              const SizedBox(height: 8),
                              Text(
                                related.excerpt,
                                maxLines: 2,
                                overflow: TextOverflow.ellipsis,
                                style: AppTheme.sansStyle.copyWith(
                                  fontSize: 14,
                                  color: AppColors.inkSoft,
                                ),
                              ),
                            ],
                          ),
                        ),
                      );
                    }),
                  ],
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildDropCapParagraph(String text) {
    if (text.isEmpty) return const SizedBox.shrink();

    final firstLetter = text[0];
    final restOfText = text.substring(1);

    return Padding(
      padding: const EdgeInsets.only(bottom: 16),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.only(right: 8),
            child: Text(
              firstLetter,
              style: AppTheme.serifStyle.copyWith(
                fontSize: 56,
                height: 0.85,
                color: AppColors.terracotta,
              ),
            ),
          ),
          Expanded(
            child: Text(
              restOfText,
              style: AppTheme.sansStyle.copyWith(
                fontSize: 16,
                height: 1.75,
                color: AppColors.ink,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
