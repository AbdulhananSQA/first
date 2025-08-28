// app/page.tsx
"use client";

import { useState } from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import CVAnalyzer from "./components/cvanalyzer";

export default function Home() {
  const [currentPage, setCurrentPage] = useState<"home" | "about" | "analyzer">(
    "home"
  );

  const renderContent = () => {
    switch (currentPage) {
      case "home":
        return (
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
            <div className="container mx-auto px-6 text-center">
              <h1 className="text-5xl font-bold text-gray-800 mb-6">
                Welcome to change your CV
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Analyze your CV with AI-powered insights. Get detailed feedback
                on content, formatting, and optimization suggestions to land
                your dream job.
              </p>
              <button
                onClick={() => setCurrentPage("analyzer")}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-200 text-lg"
              >
                Analyze Your CV Now
              </button>

              <div className="mt-16 grid md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="text-blue-600 text-4xl mb-4">📊</div>
                  <h3 className="text-xl font-semibold mb-2">Smart Analysis</h3>
                  <p className="text-gray-600">
                    AI-powered analysis of your CV content and structure
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="text-green-600 text-4xl mb-4">🎯</div>
                  <h3 className="text-xl font-semibold mb-2">Score Rating</h3>
                  <p className="text-gray-600">
                    Get a comprehensive score out of 100 with detailed breakdown
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="text-purple-600 text-4xl mb-4">💡</div>
                  <h3 className="text-xl font-semibold mb-2">
                    Recommendations
                  </h3>
                  <p className="text-gray-600">
                    Receive actionable suggestions to improve your CV
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case "about":
        return (
          <div className="min-h-screen bg-gray-50 py-20">
            <div className="container mx-auto px-6">
              <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
                  About CV Analyzer Pro
                </h1>
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <p className="text-lg text-gray-600 mb-6">
                    CV Analyzer Pro is a cutting-edge tool designed to help job
                    seekers optimize their resumes and increase their chances of
                    landing interviews. Our advanced algorithms analyze various
                    aspects of your CV to provide comprehensive feedback.
                  </p>

                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    How It Works
                  </h2>
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start">
                      <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4">
                        1
                      </span>
                      <p className="text-gray-600">
                        Upload or paste your CV content
                      </p>
                    </div>
                    <div className="flex items-start">
                      <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4">
                        2
                      </span>
                      <p className="text-gray-600">
                        Our AI analyzes content, structure, and formatting
                      </p>
                    </div>
                    <div className="flex items-start">
                      <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4">
                        3
                      </span>
                      <p className="text-gray-600">
                        Receive a detailed score and improvement recommendations
                      </p>
                    </div>
                  </div>

                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Features
                  </h2>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Comprehensive CV scoring out of 100</li>
                    <li>• Visual progress indicators with color coding</li>
                    <li>• Detailed analysis of different CV sections</li>
                    <li>• Actionable improvement suggestions</li>
                    <li>• Industry-standard best practices</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case "analyzer":
        return <CVAnalyzer />;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="flex-grow">{renderContent()}</main>
      <Footer />
    </div>
  );
}
