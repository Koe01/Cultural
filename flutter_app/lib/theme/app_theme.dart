import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppColors {
  static const Color terracotta = Color(0xFFC86D5D);
  static const Color terracottaLight = Color(0xFFD68E7F);
  static const Color olive = Color(0xFF8B8F6F);
  static const Color oliveMuted = Color(0xFFA5A892);
  static const Color indigoDeep = Color(0xFF3B4356);
  static const Color cream = Color(0xFFF9F6F1);
  static const Color creamWarm = Color(0xFFF5EFE7);
  static const Color ink = Color(0xFF2A2520);
  static const Color inkSoft = Color(0xFF4A453F);
  static const Color textureBg = Color(0xFFFAF8F4);
  static const Color border = Color(0x1F2A2520); // rgba(42, 37, 32, 0.12)
  static const Color white = Colors.white;
}

class AppTheme {
  static TextStyle get serifStyle => GoogleFonts.crimsonPro();
  static TextStyle get sansStyle => GoogleFonts.inter();

  static ThemeData get theme {
    return ThemeData(
      useMaterial3: true,
      scaffoldBackgroundColor: AppColors.cream,
      colorScheme: const ColorScheme.light(
        primary: AppColors.indigoDeep,
        secondary: AppColors.olive,
        surface: AppColors.cream,
        onPrimary: AppColors.cream,
        onSecondary: AppColors.cream,
        onSurface: AppColors.ink,
      ),
      textTheme: GoogleFonts.interTextTheme(),
      appBarTheme: const AppBarTheme(
        backgroundColor: Colors.transparent,
        elevation: 0,
        scrolledUnderElevation: 0,
      ),
    );
  }
}
