// app/components/CVAnalyzer.tsx
'use client';

import { useState, useEffect } from 'react';
import CircularProgress from '../components/circularprogress'

interface AnalysisResult {
  overallScore: number;
  sections: {
    personalInfo: number;
    experience: number;
    skills: number;
    education: number;
    formatting: number;
  };
  suggestions: string[];
  strengths: string[];
}

const CVAnalyzer = () => {
  const [cvText, setCvText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const analyzeCV = () => {
    if (!cvText.trim()) return;

    setIsAnalyzing(true);
    
    // Simulate analysis with setTimeout
    setTimeout(() => {
      const words = cvText.split(/\s+/).filter(word => word.length > 0);
      const hasPersonalInfo = /\b(email|phone|address|linkedin)\b/i.test(cvText);
      const hasExperience = /\b(experience|worked|company|position|job)\b/i.test(cvText);
      const hasSkills = /\b(skills|proficient|expert|knowledge)\b/i.test(cvText);
      const hasEducation = /\b(education|degree|university|college|school)\b/i.test(cvText);
      
      const personalInfoScore = hasPersonalInfo ? 85 + Math.random() * 15 : 40 + Math.random() * 30;
      const experienceScore = hasExperience ? 75 + Math.random() * 20 : 30 + Math.random() * 40;
      const skillsScore = hasSkills ? 80 + Math.random() * 15 : 35 + Math.random() * 35;
      const educationScore = hasEducation ? 85 + Math.random() * 15 : 45 + Math.random() * 25;
      const formattingScore = words.length > 50 ? 70 + Math.random() * 25 : 40 + Math.random() * 30;
      
      const overallScore = Math.round(
        (personalInfoScore + experienceScore + skillsScore + educationScore + formattingScore) / 5
      );

      const suggestions = [];
      const strengths = [];

      if (personalInfoScore < 70) suggestions.push('Add complete contact information including email, phone, and LinkedIn profile');
      else strengths.push('Good personal information section');

      if (experienceScore < 70) suggestions.push('Provide more detailed work experience with specific achievements and responsibilities');
      else strengths.push('Strong work experience description');

      if (skillsScore < 70) suggestions.push('Include a comprehensive skills section with relevant technical and soft skills');
      else strengths.push('Well-defined skills section');

      if (educationScore < 70) suggestions.push('Add education background including degrees, institutions, and graduation dates');
      else strengths.push('Clear education information');

      if (formattingScore < 70) suggestions.push('Improve formatting and structure for better readability');
      else strengths.push('Good document structure and formatting');

      if (words.length < 100) suggestions.push('Expand your CV content - it seems too brief for a comprehensive overview');
      if (words.length > 800) suggestions.push('Consider condensing your CV - it may be too lengthy for quick review');

      setAnalysisResult({
        overallScore,
        sections: {
          personalInfo: Math.round(personalInfoScore),
          experience: Math.round(experienceScore),
          skills: Math.round(skillsScore),
          education: Math.round(educationScore),
          formatting: Math.round(formattingScore),
        },
        suggestions,
        strengths,
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setCvText(content);
      };
      reader.readAsText(selectedFile);
    }
  };

  const getScoreColor = (score: number): 'green' | 'orange' | 'red' => {
    if (score >= 75) return 'green';
    if (score >= 50) return 'orange';
    return 'red';
  };

  const getScoreLabel = (score: number): string => {
    if (score >= 90) return 'Excellent';
    if (score >= 75) return 'Good';
    if (score >= 50) return 'Fair';
    return 'Needs Improvement';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">CV Analyzer</h1>
            <p className="text-xl text-gray-600">
              Upload your CV or paste the content below for instant analysis
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Upload Your CV</h2>
              
              {/* File Upload */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload CV File (Optional)
                </label>
                <input
                  type="file"
                  accept=".txt,.doc,.docx"
                  onChange={handleFileUpload}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {file && (
                  <p className="mt-2 text-sm text-green-600">File loaded: {file.name}</p>
                )}
              </div>

              {/* Text Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Or Paste Your CV Content
                </label>
                <textarea
                  value={cvText}
                  onChange={(e) => setCvText(e.target.value)}
                  placeholder="Paste your CV content here..."
                  rows={12}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="mt-2 text-sm text-gray-500">
                  {cvText.split(/\s+/).filter(word => word.length > 0).length} words
                </p>
              </div>

              <button
                onClick={analyzeCV}
                disabled={!cvText.trim() || isAnalyzing}
                className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors duration-200 ${
                  !cvText.trim() || isAnalyzing
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isAnalyzing ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Analyzing...
                  </div>
                ) : (
                  'Analyze CV'
                )}
              </button>
            </div>

            {/* Results Section */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Analysis Results</h2>
              
              {!analysisResult && !isAnalyzing && (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">📊</div>
                  <p className="text-gray-500">Upload or paste your CV content and click "Analyze CV" to see results</p>
                </div>
              )}

              {isAnalyzing && (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Analyzing your CV...</p>
                </div>
              )}

              {analysisResult && (
                <div>
                  {/* Overall Score */}
                  <div className="text-center mb-8">
                    <CircularProgress
                      score={analysisResult.overallScore}
                      size={120}
                      color={getScoreColor(analysisResult.overallScore)}
                    />
                    <h3 className="text-2xl font-bold text-gray-800 mt-4">
                      Overall Score: {analysisResult.overallScore}/100
                    </h3>
                    <p className={`text-lg font-semibold ${
                      getScoreColor(analysisResult.overallScore) === 'green' ? 'text-green-600' :
                      getScoreColor(analysisResult.overallScore) === 'orange' ? 'text-orange-600' :
                      'text-red-600'
                    }`}>
                      {getScoreLabel(analysisResult.overallScore)}
                    </p>
                  </div>

                  {/* Section Scores */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Section Breakdown</h3>
                    <div className="space-y-4">
                      {Object.entries(analysisResult.sections).map(([key, score]) => {
                        const sectionNames = {
                          personalInfo: 'Personal Information',
                          experience: 'Work Experience',
                          skills: 'Skills',
                          education: 'Education',
                          formatting: 'Formatting & Structure',
                        };
                        
                        return (
                          <div key={key} className="flex items-center justify-between">
                            <span className="text-gray-700">{sectionNames[key as keyof typeof sectionNames]}</span>
                            <div className="flex items-center">
                              <CircularProgress
                                score={score}
                                size={40}
                                color={getScoreColor(score)}
                              />
                              <span className="ml-2 font-semibold text-gray-800">{score}/100</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Strengths */}
                  {analysisResult.strengths.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-green-600 mb-3">✅ Strengths</h3>
                      <ul className="space-y-2">
                        {analysisResult.strengths.map((strength, index) => (
                          <li key={index} className="text-gray-700 flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Suggestions */}
                  {analysisResult.suggestions.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-orange-600 mb-3">💡 Suggestions</h3>
                      <ul className="space-y-2">
                        {analysisResult.suggestions.map((suggestion, index) => (
                          <li key={index} className="text-gray-700 flex items-start">
                            <span className="text-orange-500 mr-2">•</span>
                            {suggestion}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVAnalyzer;