import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:intl/intl.dart';
import '../theme/app_theme.dart';

class _Submission {
  final String title;
  final String region;
  final String category;
  final String story;
  final String name;
  final String date;
  final String status;

  _Submission({
    required this.title,
    required this.region,
    required this.category,
    required this.story,
    required this.name,
    required this.date,
    this.status = 'Pending Review',
  });

  Map<String, dynamic> toJson() => {
        'title': title,
        'region': region,
        'category': category,
        'story': story,
        'name': name,
        'date': date,
        'status': status,
      };

  factory _Submission.fromJson(Map<String, dynamic> json) => _Submission(
        title: json['title'] ?? '',
        region: json['region'] ?? '',
        category: json['category'] ?? '',
        story: json['story'] ?? '',
        name: json['name'] ?? '',
        date: json['date'] ?? '',
        status: json['status'] ?? 'Pending Review',
      );
}

const _categoryLabels = {
  'legend': 'Legend',
  'folktale': 'Folk Tale',
  'myth': 'Myth',
  'proverb': 'Proverb or Idiom',
  'oral-history': 'Oral History',
  'saying': 'Local Saying',
};

class SubmitPage extends StatefulWidget {
  const SubmitPage({super.key});

  @override
  State<SubmitPage> createState() => _SubmitPageState();
}

class _SubmitPageState extends State<SubmitPage> {
  final _formKey = GlobalKey<FormState>();
  final _titleController = TextEditingController();
  final _regionController = TextEditingController();
  final _storyController = TextEditingController();
  final _nameController = TextEditingController();
  String _category = '';
  List<_Submission> _submissions = [];
  bool _showForm = true;

  @override
  void initState() {
    super.initState();
    _loadSubmissions();
  }

  @override
  void dispose() {
    _titleController.dispose();
    _regionController.dispose();
    _storyController.dispose();
    _nameController.dispose();
    super.dispose();
  }

  Future<void> _loadSubmissions() async {
    final prefs = await SharedPreferences.getInstance();
    final data = prefs.getStringList('submissions') ?? [];
    setState(() {
      _submissions = data
          .map((s) => _Submission.fromJson(jsonDecode(s)))
          .toList()
          .reversed
          .toList();
    });
  }

  Future<void> _saveSubmission(_Submission submission) async {
    final prefs = await SharedPreferences.getInstance();
    final data = prefs.getStringList('submissions') ?? [];
    data.add(jsonEncode(submission.toJson()));
    await prefs.setStringList('submissions', data);
  }

  void _handleSubmit() {
    if (_formKey.currentState!.validate()) {
      final submission = _Submission(
        title: _titleController.text.trim(),
        region: _regionController.text.trim(),
        category: _category,
        story: _storyController.text.trim(),
        name: _nameController.text.trim().isEmpty
            ? 'Anonymous'
            : _nameController.text.trim(),
        date: DateFormat('d MMM yyyy').format(DateTime.now()),
      );

      _saveSubmission(submission);

      setState(() {
        _submissions.insert(0, submission);
        _showForm = false;
      });

      _titleController.clear();
      _regionController.clear();
      _storyController.clear();
      _nameController.clear();
      _category = '';

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          backgroundColor: AppColors.olive,
          behavior: SnackBarBehavior.floating,
          margin: const EdgeInsets.fromLTRB(24, 0, 24, 80),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(4)),
          content: Row(
            children: [
              const Icon(Icons.check_circle_outline,
                  color: Colors.white, size: 18),
              const SizedBox(width: 10),
              Expanded(
                child: Text(
                  'Story submitted successfully!',
                  style: AppTheme.sansStyle.copyWith(
                    color: Colors.white,
                    fontSize: 14,
                  ),
                ),
              ),
            ],
          ),
        ),
      );
    }
  }

  Future<void> _deleteSubmission(int index) async {
    final prefs = await SharedPreferences.getInstance();
    final data = prefs.getStringList('submissions') ?? [];
    final removeIndex = data.length - 1 - index;
    if (removeIndex >= 0 && removeIndex < data.length) {
      data.removeAt(removeIndex);
      await prefs.setStringList('submissions', data);
    }
    setState(() {
      _submissions.removeAt(index);
    });
  }

  InputDecoration _inputDecoration(String placeholder) {
    return InputDecoration(
      hintText: placeholder,
      hintStyle: AppTheme.sansStyle.copyWith(
        fontSize: 16,
        color: AppColors.oliveMuted,
      ),
      filled: true,
      fillColor: Colors.white,
      contentPadding: const EdgeInsets.all(16),
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(2),
        borderSide: const BorderSide(color: AppColors.border),
      ),
      enabledBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(2),
        borderSide: const BorderSide(color: AppColors.border),
      ),
      focusedBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(2),
        borderSide: const BorderSide(color: AppColors.olive, width: 2),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      bottom: false,
      child: Column(
        children: [
          // Header
          Padding(
            padding: const EdgeInsets.fromLTRB(24, 32, 24, 0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Share a Story',
                  style: AppTheme.serifStyle.copyWith(
                    fontSize: 32,
                    height: 1.2,
                    color: AppColors.ink,
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  'Help preserve the collective memory.',
                  style: AppTheme.sansStyle.copyWith(
                    fontSize: 15,
                    color: AppColors.inkSoft,
                  ),
                ),
                const SizedBox(height: 20),
                // Toggle tabs
                Row(
                  children: [
                    _buildTab('New Story', _showForm, () {
                      setState(() => _showForm = true);
                    }),
                    const SizedBox(width: 4),
                    _buildTab(
                      'My Submissions (${_submissions.length})',
                      !_showForm,
                      () {
                        setState(() => _showForm = false);
                      },
                    ),
                  ],
                ),
              ],
            ),
          ),

          const SizedBox(height: 4),
          Container(height: 1, color: AppColors.border),

          // Content
          Expanded(
            child: _showForm ? _buildForm() : _buildSubmissionsList(),
          ),
        ],
      ),
    );
  }

  Widget _buildTab(String label, bool isActive, VoidCallback onTap) {
    return GestureDetector(
      onTap: onTap,
      behavior: HitTestBehavior.opaque,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
        decoration: BoxDecoration(
          border: Border(
            bottom: BorderSide(
              color: isActive ? AppColors.terracotta : Colors.transparent,
              width: 2,
            ),
          ),
        ),
        child: Text(
          label,
          style: AppTheme.sansStyle.copyWith(
            fontSize: 14,
            color: isActive ? AppColors.ink : AppColors.oliveMuted,
            fontWeight: isActive ? FontWeight.w500 : FontWeight.w400,
          ),
        ),
      ),
    );
  }

  Widget _buildForm() {
    return SingleChildScrollView(
      physics: const BouncingScrollPhysics(),
      padding: const EdgeInsets.fromLTRB(24, 24, 24, 96),
      child: Form(
        key: _formKey,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Story Title
            Text(
              'Story Title',
              style: AppTheme.serifStyle.copyWith(
                fontSize: 14,
                color: AppColors.ink,
              ),
            ),
            const SizedBox(height: 8),
            TextFormField(
              controller: _titleController,
              style: AppTheme.sansStyle.copyWith(
                fontSize: 16,
                color: AppColors.ink,
              ),
              decoration: _inputDecoration('The tale as it was told to you'),
              validator: (v) => v == null || v.isEmpty ? 'Required' : null,
            ),
            const SizedBox(height: 24),

            // Region
            Text(
              'Region or Origin',
              style: AppTheme.serifStyle.copyWith(
                fontSize: 14,
                color: AppColors.ink,
              ),
            ),
            const SizedBox(height: 8),
            TextFormField(
              controller: _regionController,
              style: AppTheme.sansStyle.copyWith(
                fontSize: 16,
                color: AppColors.ink,
              ),
              decoration:
                  _inputDecoration('Where did this story come from?'),
              validator: (v) => v == null || v.isEmpty ? 'Required' : null,
            ),
            const SizedBox(height: 24),

            // Category
            Text(
              'Type',
              style: AppTheme.serifStyle.copyWith(
                fontSize: 14,
                color: AppColors.ink,
              ),
            ),
            const SizedBox(height: 8),
            DropdownButtonFormField<String>(
              initialValue: _category.isEmpty ? null : _category,
              decoration: _inputDecoration(''),
              hint: Text(
                'Select a type',
                style: AppTheme.sansStyle.copyWith(
                  fontSize: 16,
                  color: AppColors.oliveMuted,
                ),
              ),
              dropdownColor: Colors.white,
              style: AppTheme.sansStyle.copyWith(
                fontSize: 16,
                color: AppColors.ink,
              ),
              items: _categoryLabels.entries
                  .map((e) =>
                      DropdownMenuItem(value: e.key, child: Text(e.value)))
                  .toList(),
              onChanged: (v) => setState(() => _category = v ?? ''),
              validator: (v) => v == null || v.isEmpty ? 'Required' : null,
            ),
            const SizedBox(height: 24),

            // Story Content
            Text(
              'The Story',
              style: AppTheme.serifStyle.copyWith(
                fontSize: 14,
                color: AppColors.ink,
              ),
            ),
            const SizedBox(height: 8),
            TextFormField(
              controller: _storyController,
              maxLines: 8,
              style: AppTheme.sansStyle.copyWith(
                fontSize: 16,
                height: 1.7,
                color: AppColors.ink,
              ),
              decoration: _inputDecoration(
                  'Tell the story as it was passed to you...'),
              validator: (v) => v == null || v.isEmpty ? 'Required' : null,
            ),
            const SizedBox(height: 24),

            // Name
            RichText(
              text: TextSpan(
                children: [
                  TextSpan(
                    text: 'Your Name ',
                    style: AppTheme.serifStyle.copyWith(
                      fontSize: 14,
                      color: AppColors.ink,
                    ),
                  ),
                  TextSpan(
                    text: '(optional)',
                    style: AppTheme.serifStyle.copyWith(
                      fontSize: 14,
                      fontStyle: FontStyle.italic,
                      color: AppColors.oliveMuted,
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 8),
            TextFormField(
              controller: _nameController,
              style: AppTheme.sansStyle.copyWith(
                fontSize: 16,
                color: AppColors.ink,
              ),
              decoration: _inputDecoration('How should we credit you?'),
            ),

            const SizedBox(height: 32),
            Container(height: 1, color: AppColors.border),
            const SizedBox(height: 32),

            // Submit Button
            SizedBox(
              width: double.infinity,
              height: 56,
              child: ElevatedButton(
                onPressed: _handleSubmit,
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppColors.indigoDeep,
                  foregroundColor: AppColors.cream,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(2),
                  ),
                  elevation: 0,
                ),
                child: Text(
                  'Submit Story',
                  style: AppTheme.serifStyle.copyWith(
                    fontSize: 17,
                    color: AppColors.cream,
                  ),
                ),
              ),
            ),

            const SizedBox(height: 16),
            Center(
              child: Text(
                'All submissions are reviewed to ensure authenticity and respect for cultural traditions.',
                textAlign: TextAlign.center,
                style: AppTheme.serifStyle.copyWith(
                  fontSize: 13,
                  fontStyle: FontStyle.italic,
                  height: 1.6,
                  color: AppColors.oliveMuted,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSubmissionsList() {
    if (_submissions.isEmpty) {
      return Center(
        child: Padding(
          padding: const EdgeInsets.all(48),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(Icons.auto_stories_outlined,
                  size: 48, color: AppColors.oliveMuted.withValues(alpha: 0.4)),
              const SizedBox(height: 16),
              Text(
                'No stories submitted yet',
                style: AppTheme.serifStyle.copyWith(
                  fontSize: 18,
                  color: AppColors.inkSoft,
                ),
              ),
              const SizedBox(height: 8),
              Text(
                'Your submitted stories will appear here',
                style: AppTheme.sansStyle.copyWith(
                  fontSize: 14,
                  color: AppColors.oliveMuted,
                ),
              ),
            ],
          ),
        ),
      );
    }

    return ListView.builder(
      physics: const BouncingScrollPhysics(),
      padding: const EdgeInsets.fromLTRB(24, 16, 24, 96),
      itemCount: _submissions.length,
      itemBuilder: (context, index) {
        final sub = _submissions[index];
        return Container(
          margin: const EdgeInsets.only(bottom: 16),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(2),
            border: Border.all(color: AppColors.border),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Padding(
                padding: const EdgeInsets.fromLTRB(16, 16, 16, 12),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Title & delete
                    Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Expanded(
                          child: Text(
                            sub.title,
                            style: AppTheme.serifStyle.copyWith(
                              fontSize: 18,
                              height: 1.3,
                              color: AppColors.ink,
                            ),
                          ),
                        ),
                        GestureDetector(
                          onTap: () => _confirmDelete(index),
                          child: Padding(
                            padding: const EdgeInsets.all(4),
                            child: Icon(Icons.close,
                                size: 16, color: AppColors.oliveMuted),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 8),

                    // Region & category
                    Row(
                      children: [
                        Icon(Icons.location_on_outlined,
                            size: 12, color: AppColors.terracotta),
                        const SizedBox(width: 4),
                        Text(
                          sub.region,
                          style: AppTheme.sansStyle.copyWith(
                            fontSize: 12,
                            color: AppColors.terracotta,
                          ),
                        ),
                        const SizedBox(width: 12),
                        Container(
                          padding: const EdgeInsets.symmetric(
                              horizontal: 8, vertical: 2),
                          decoration: BoxDecoration(
                            color: AppColors.creamWarm,
                            borderRadius: BorderRadius.circular(2),
                          ),
                          child: Text(
                            _categoryLabels[sub.category] ?? sub.category,
                            style: AppTheme.sansStyle.copyWith(
                              fontSize: 11,
                              color: AppColors.inkSoft,
                            ),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 10),

                    // Story preview
                    Text(
                      sub.story,
                      maxLines: 3,
                      overflow: TextOverflow.ellipsis,
                      style: AppTheme.sansStyle.copyWith(
                        fontSize: 14,
                        height: 1.6,
                        color: AppColors.inkSoft,
                      ),
                    ),
                  ],
                ),
              ),

              Container(height: 1, color: AppColors.border),

              // Footer
              Padding(
                padding:
                    const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Row(
                      children: [
                        Container(
                          width: 6,
                          height: 6,
                          decoration: BoxDecoration(
                            color: sub.status == 'Pending Review'
                                ? AppColors.terracottaLight
                                : AppColors.olive,
                            shape: BoxShape.circle,
                          ),
                        ),
                        const SizedBox(width: 6),
                        Text(
                          sub.status,
                          style: AppTheme.sansStyle.copyWith(
                            fontSize: 12,
                            color: AppColors.oliveMuted,
                          ),
                        ),
                      ],
                    ),
                    Row(
                      children: [
                        Text(
                          'by ${sub.name}',
                          style: AppTheme.sansStyle.copyWith(
                            fontSize: 12,
                            fontStyle: FontStyle.italic,
                            color: AppColors.oliveMuted,
                          ),
                        ),
                        const SizedBox(width: 8),
                        Text(
                          sub.date,
                          style: AppTheme.sansStyle.copyWith(
                            fontSize: 12,
                            color: AppColors.oliveMuted,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ),
        );
      },
    );
  }

  void _confirmDelete(int index) {
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        backgroundColor: AppColors.cream,
        title: Text(
          'Delete Submission?',
          style: AppTheme.serifStyle.copyWith(
            fontSize: 18,
            color: AppColors.ink,
          ),
        ),
        content: Text(
          'This will permanently remove this story from your submissions.',
          style: AppTheme.sansStyle.copyWith(
            fontSize: 14,
            color: AppColors.inkSoft,
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx),
            child: Text(
              'Cancel',
              style: AppTheme.sansStyle.copyWith(color: AppColors.oliveMuted),
            ),
          ),
          TextButton(
            onPressed: () {
              Navigator.pop(ctx);
              _deleteSubmission(index);
            },
            child: Text(
              'Delete',
              style:
                  AppTheme.sansStyle.copyWith(color: AppColors.terracotta),
            ),
          ),
        ],
      ),
    );
  }
}
