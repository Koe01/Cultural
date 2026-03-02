import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../data/stories.dart' as app_data;

class ExplorePage extends StatelessWidget {
  const ExplorePage({super.key});

  @override
  Widget build(BuildContext context) {
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
              padding: const EdgeInsets.fromLTRB(24, 32, 24, 32),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Explore by Region',
                    style: AppTheme.serifStyle.copyWith(
                      fontSize: 32,
                      height: 1.2,
                      color: AppColors.ink,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'Stories organized by their place of origin',
                    style: AppTheme.sansStyle.copyWith(
                      fontSize: 15,
                      color: AppColors.inkSoft,
                    ),
                  ),
                ],
              ),
            ),

            // World Map visual
            Container(
              margin: const EdgeInsets.symmetric(horizontal: 24),
              height: 220,
              decoration: BoxDecoration(
                color: AppColors.creamWarm,
                borderRadius: BorderRadius.circular(2),
                border: Border.all(color: AppColors.border),
              ),
              child: ClipRRect(
                borderRadius: BorderRadius.circular(2),
                child: CustomPaint(
                  size: const Size(double.infinity, 220),
                  painter: _WorldMapPainter(),
                ),
              ),
            ),

            const SizedBox(height: 32),

            // Region List
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 24),
              child: Column(
                children: app_data.regions.map((region) {
                  return GestureDetector(
                    onTap: () {},
                    behavior: HitTestBehavior.opaque,
                    child: Container(
                      padding: const EdgeInsets.symmetric(
                          vertical: 24, horizontal: 8),
                      decoration: const BoxDecoration(
                        border: Border(
                          bottom: BorderSide(color: AppColors.border),
                        ),
                      ),
                      child: Row(
                        children: [
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  region.name,
                                  style: AppTheme.serifStyle.copyWith(
                                    fontSize: 20,
                                    height: 1.3,
                                    color: AppColors.ink,
                                  ),
                                ),
                                const SizedBox(height: 4),
                                Text(
                                  region.description,
                                  style: AppTheme.sansStyle.copyWith(
                                    fontSize: 13,
                                    color: AppColors.inkSoft,
                                  ),
                                ),
                                const SizedBox(height: 4),
                                Text(
                                  '${region.storyCount} stories collected',
                                  style: AppTheme.sansStyle.copyWith(
                                    fontSize: 12,
                                    color: AppColors.oliveMuted,
                                  ),
                                ),
                              ],
                            ),
                          ),
                          const SizedBox(width: 16),
                          Icon(Icons.chevron_right,
                              size: 18, color: AppColors.oliveMuted),
                        ],
                      ),
                    ),
                  );
                }).toList(),
              ),
            ),

            // Bottom note
            Padding(
              padding: const EdgeInsets.fromLTRB(24, 48, 24, 16),
              child: Center(
                child: Text(
                  'Each region holds countless untold stories',
                  style: AppTheme.serifStyle.copyWith(
                    fontSize: 13,
                    fontStyle: FontStyle.italic,
                    color: AppColors.oliveMuted,
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _WorldMapPainter extends CustomPainter {
  // Convert longitude/latitude to canvas coordinates
  // lon: -180..180 -> x: 0..width
  // lat: 85..-60 -> y: 0..height
  Offset _geo(double lon, double lat, Size size) {
    final x = (lon + 180) / 360 * size.width;
    final y = (85 - lat) / 145 * size.height;
    return Offset(x, y);
  }

  Path _pathFromGeo(List<List<double>> points, Size size) {
    final path = Path();
    final first = _geo(points[0][0], points[0][1], size);
    path.moveTo(first.dx, first.dy);
    for (var i = 1; i < points.length; i++) {
      final p = _geo(points[i][0], points[i][1], size);
      path.lineTo(p.dx, p.dy);
    }
    path.close();
    return path;
  }

  @override
  void paint(Canvas canvas, Size size) {
    final landFill = Paint()
      ..color = AppColors.olive.withValues(alpha: 0.18)
      ..style = PaintingStyle.fill;

    final landStroke = Paint()
      ..color = AppColors.olive.withValues(alpha: 0.30)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 0.8;

    // Grid lines
    final gridPaint = Paint()
      ..color = AppColors.oliveMuted.withValues(alpha: 0.10)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 0.5;

    // Horizontal grid lines (latitudes)
    for (final lat in [60.0, 30.0, 0.0, -30.0]) {
      final y = _geo(0, lat, size).dy;
      canvas.drawLine(Offset(0, y), Offset(size.width, y), gridPaint);
    }
    // Vertical grid lines (longitudes)
    for (final lon in [-120.0, -60.0, 0.0, 60.0, 120.0]) {
      final x = _geo(lon, 0, size).dx;
      canvas.drawLine(Offset(x, 0), Offset(x, size.height), gridPaint);
    }

    // ---- Continents (simplified polygons) ----

    // North America
    final northAmerica = [
      [-140.0, 62.0], [-120.0, 72.0], [-95.0, 72.0], [-75.0, 62.0],
      [-55.0, 50.0], [-65.0, 45.0], [-75.0, 35.0], [-82.0, 30.0],
      [-98.0, 28.0], [-105.0, 22.0], [-100.0, 18.0], [-90.0, 16.0],
      [-85.0, 12.0], [-105.0, 20.0], [-118.0, 33.0], [-125.0, 40.0],
      [-125.0, 50.0], [-135.0, 58.0], [-140.0, 62.0],
    ];
    canvas.drawPath(_pathFromGeo(northAmerica, size), landFill);
    canvas.drawPath(_pathFromGeo(northAmerica, size), landStroke);

    // Greenland
    final greenland = [
      [-55.0, 60.0], [-45.0, 60.0], [-20.0, 72.0], [-25.0, 78.0],
      [-45.0, 82.0], [-60.0, 78.0], [-55.0, 68.0], [-55.0, 60.0],
    ];
    canvas.drawPath(_pathFromGeo(greenland, size), landFill);
    canvas.drawPath(_pathFromGeo(greenland, size), landStroke);

    // South America
    final southAmerica = [
      [-80.0, 10.0], [-65.0, 10.0], [-55.0, 5.0], [-35.0, -5.0],
      [-35.0, -15.0], [-40.0, -22.0], [-48.0, -28.0], [-55.0, -34.0],
      [-68.0, -52.0], [-73.0, -45.0], [-70.0, -18.0], [-75.0, -5.0],
      [-80.0, 10.0],
    ];
    canvas.drawPath(_pathFromGeo(southAmerica, size), landFill);
    canvas.drawPath(_pathFromGeo(southAmerica, size), landStroke);

    // Europe
    final europe = [
      [-10.0, 36.0], [-5.0, 44.0], [-2.0, 48.0], [3.0, 48.0],
      [5.0, 52.0], [10.0, 55.0], [12.0, 58.0], [18.0, 60.0],
      [25.0, 65.0], [30.0, 70.0], [40.0, 68.0], [40.0, 55.0],
      [30.0, 48.0], [28.0, 42.0], [25.0, 38.0], [20.0, 36.0],
      [15.0, 38.0], [10.0, 36.0], [5.0, 42.0], [-10.0, 36.0],
    ];
    canvas.drawPath(_pathFromGeo(europe, size), landFill);
    canvas.drawPath(_pathFromGeo(europe, size), landStroke);

    // Africa
    final africa = [
      [-15.0, 32.0], [-5.0, 36.0], [10.0, 36.0], [15.0, 32.0],
      [25.0, 32.0], [35.0, 30.0], [40.0, 22.0], [43.0, 12.0],
      [50.0, 5.0], [42.0, -2.0], [40.0, -10.0], [35.0, -20.0],
      [30.0, -30.0], [20.0, -35.0], [18.0, -28.0], [12.0, -18.0],
      [10.0, -5.0], [8.0, 5.0], [2.0, 6.0], [-5.0, 5.0],
      [-15.0, 10.0], [-18.0, 16.0], [-15.0, 22.0], [-15.0, 32.0],
    ];
    canvas.drawPath(_pathFromGeo(africa, size), landFill);
    canvas.drawPath(_pathFromGeo(africa, size), landStroke);

    // Asia
    final asia = [
      [40.0, 55.0], [50.0, 55.0], [60.0, 55.0], [70.0, 60.0],
      [80.0, 65.0], [100.0, 68.0], [120.0, 65.0], [140.0, 60.0],
      [145.0, 50.0], [140.0, 42.0], [130.0, 35.0], [122.0, 30.0],
      [120.0, 22.0], [110.0, 15.0], [105.0, 10.0], [100.0, 5.0],
      [95.0, 8.0], [88.0, 22.0], [80.0, 28.0], [72.0, 20.0],
      [68.0, 24.0], [60.0, 25.0], [50.0, 28.0], [42.0, 35.0],
      [40.0, 42.0], [40.0, 55.0],
    ];
    canvas.drawPath(_pathFromGeo(asia, size), landFill);
    canvas.drawPath(_pathFromGeo(asia, size), landStroke);

    // Australia
    final australia = [
      [115.0, -15.0], [130.0, -12.0], [140.0, -15.0], [150.0, -22.0],
      [152.0, -28.0], [148.0, -35.0], [140.0, -38.0], [130.0, -35.0],
      [118.0, -34.0], [115.0, -28.0], [115.0, -15.0],
    ];
    canvas.drawPath(_pathFromGeo(australia, size), landFill);
    canvas.drawPath(_pathFromGeo(australia, size), landStroke);

    // Japan (small)
    final japan = [
      [130.0, 32.0], [132.0, 34.0], [136.0, 36.0], [140.0, 40.0],
      [142.0, 44.0], [141.0, 40.0], [138.0, 36.0], [134.0, 33.0],
      [130.0, 32.0],
    ];
    canvas.drawPath(_pathFromGeo(japan, size), landFill);
    canvas.drawPath(_pathFromGeo(japan, size), landStroke);

    // Indonesia (simplified)
    final indo1 = [
      [96.0, 5.0], [105.0, -5.0], [115.0, -8.0], [110.0, -6.0],
      [100.0, 0.0], [96.0, 5.0],
    ];
    canvas.drawPath(_pathFromGeo(indo1, size), landFill);

    // ---- Story region markers ----
    final dotOuter = Paint()
      ..color = AppColors.terracotta
      ..style = PaintingStyle.fill;
    final dotInner = Paint()
      ..color = AppColors.cream
      ..style = PaintingStyle.fill;
    final dotGlow = Paint()
      ..color = AppColors.terracotta.withValues(alpha: 0.20)
      ..style = PaintingStyle.fill;

    // Region locations: [lon, lat, label]
    final regionPoints = <List<dynamic>>[
      [-96.0, 17.0, 'Oaxaca'],          // Oaxaca, Mexico
      [76.0, 10.0, 'Kerala'],           // Kerala, India
      [-3.0, 16.7, 'Timbuktu'],         // Timbuktu, Mali
      [-19.0, 64.0, 'Iceland'],         // Iceland
      [136.0, 35.0, 'Kyoto'],           // Kyoto, Japan
      [-1.5, 7.0, 'Ghana'],             // Akan, Ghana
      [106.0, 10.0, 'Vietnam'],         // Mekong Delta, Vietnam
      [38.0, 11.5, 'Ethiopia'],         // Amhara, Ethiopia
    ];

    for (final rp in regionPoints) {
      final pos = _geo(rp[0] as double, rp[1] as double, size);
      canvas.drawCircle(pos, 8, dotGlow);
      canvas.drawCircle(pos, 3.5, dotOuter);
      canvas.drawCircle(pos, 1.5, dotInner);
    }

    // "Stories from across the world" text
    final textPainter = TextPainter(
      text: TextSpan(
        text: 'Stories from across the world',
        style: AppTheme.serifStyle.copyWith(
          fontSize: 12,
          fontStyle: FontStyle.italic,
          color: AppColors.olive.withValues(alpha: 0.7),
        ),
      ),
      textDirection: TextDirection.ltr,
    );
    textPainter.layout();
    textPainter.paint(
      canvas,
      Offset(
        (size.width - textPainter.width) / 2,
        size.height - textPainter.height - 10,
      ),
    );
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}
