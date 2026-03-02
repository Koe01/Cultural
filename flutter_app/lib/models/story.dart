class Story {
  final String id;
  final String title;
  final String region;
  final String category;
  final String excerpt;
  final String content;
  final String? quote;
  final String origin;
  final List<String>? relatedStories;

  const Story({
    required this.id,
    required this.title,
    required this.region,
    required this.category,
    required this.excerpt,
    required this.content,
    this.quote,
    required this.origin,
    this.relatedStories,
  });
}

class Proverb {
  final String id;
  final String text;
  final String meaning;
  final String region;
  final String? language;

  const Proverb({
    required this.id,
    required this.text,
    required this.meaning,
    required this.region,
    this.language,
  });
}

class Region {
  final String id;
  final String name;
  final String description;
  final int storyCount;

  const Region({
    required this.id,
    required this.name,
    required this.description,
    required this.storyCount,
  });
}
