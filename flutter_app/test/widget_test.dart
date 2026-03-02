import 'package:flutter_test/flutter_test.dart';

import 'package:cultural_storytelling_platform/main.dart';

void main() {
  testWidgets('App renders smoke test', (WidgetTester tester) async {
    await tester.pumpWidget(const CulturalStorytellingApp());
    expect(find.text('Archive of\nCollective Memory'), findsOneWidget);
  });
}
