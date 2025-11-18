"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Users, MessageSquare, FileText, Shield, Clock, Database, Bell, Phone, Calendar, CheckCircle, Activity, Lock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const features = [
    {
      icon: Users,
      title: "Case Management",
      description: "Comprehensive case tracking with docket numbers, hearing dates, and participant details",
      color: "text-blue-600 dark:text-blue-400",
      href: "/cases"
    },
    {
      icon: Phone,
      title: "Contact Management",
      description: "Parent and guardian contact information with consent tracking",
      color: "text-green-600 dark:text-green-400",
      href: "/contacts"
    },
    {
      icon: MessageSquare,
      title: "Message Scheduling",
      description: "Automated SMS reminders and two-way messaging with parent contacts",
      color: "text-purple-600 dark:text-purple-400",
      href: "/messages"
    },
    {
      icon: Bell,
      title: "Message Inbox",
      description: "Handle incoming SMS replies with auto-tagging and queue management",
      color: "text-yellow-600 dark:text-yellow-400",
      href: "/inbox"
    },
    {
      icon: Activity,
      title: "Message History",
      description: "Complete record of all sent and received SMS communications",
      color: "text-indigo-600 dark:text-indigo-400",
      href: "/message-history"
    },
    {
      icon: Users,
      title: "Participant Management",
      description: "Track all parties involved including children, parents, attorneys, and case workers",
      color: "text-orange-600 dark:text-orange-400",
      href: "/participants"
    },
    {
      icon: FileText,
      title: "Document Storage",
      description: "Secure storage for case files, evidence, and legal documentation",
      color: "text-red-600 dark:text-red-400",
      href: "/documents"
    },
    {
      icon: Shield,
      title: "Audit Trail",
      description: "Comprehensive logging of all system activities and user actions",
      color: "text-cyan-600 dark:text-cyan-400",
      href: "/audit"
    },
    {
      icon: Database,
      title: "System Integrations",
      description: "DEX, CPCMS, and Access Database integration management",
      color: "text-slate-600 dark:text-slate-400",
      href: "/integrations"
    },
    {
      icon: Phone,
      title: "Twilio Configuration",
      description: "Configure SMS integration, phone numbers, and message templates",
      color: "text-teal-600 dark:text-teal-400",
      href: "/twilio-settings"
    },
    {
      icon: Lock,
      title: "Security & Compliance",
      description: "Role-based access, HIPAA/FERPA settings, and data retention policies",
      color: "text-rose-600 dark:text-rose-400",
      href: "/security"
    },
    {
      icon: Activity,
      title: "Reports & Analytics",
      description: "Comprehensive reporting dashboard with case statistics and performance metrics",
      color: "text-emerald-600 dark:text-emerald-400",
      href: "/reports"
    }
  ];

  const capabilities = [
    {
      icon: Phone,
      title: "Twilio Integration",
      description: "Enterprise-grade SMS delivery with delivery status tracking"
    },
    {
      icon: Users,
      title: "Parent Contact Entry",
      description: "Capture names, phone numbers, and consent preferences"
    },
    {
      icon: FileText,
      title: "Case Linking",
      description: "Associate contacts with docket numbers and hearing dates"
    },
    {
      icon: Bell,
      title: "Message Scheduling",
      description: "Automated reminders 24 hours before hearings"
    },
    {
      icon: MessageSquare,
      title: "Incoming Message Handling",
      description: "Route replies to queue with automatic case ID tagging"
    },
    {
      icon: Activity,
      title: "Audit Trail & Logging",
      description: "Complete tracking of all sent/received messages with timestamps"
    }
  ];

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-2xl mb-6 shadow-lg">
            <MessageSquare className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 text-balance">
            Dependency Hearing SMS
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-8 text-balance leading-relaxed">
            Streamlined case management and automated SMS communication system for dependency court proceedings
          </p>
          <div className="flex flex-wrap gap-4 justify-center items-center text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>HIPAA Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>FERPA Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>Secure & Auditable</span>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Application Features
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Comprehensive tools designed specifically for dependency court case management and communication
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Link key={index} href={feature.href}>
                <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-md bg-white dark:bg-gray-800 h-full cursor-pointer group">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg bg-gray-50 dark:bg-gray-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <feature.icon className={`w-6 h-6 ${feature.color}`} />
                    </div>
                    <CardTitle className="text-xl text-gray-900 dark:text-white flex items-center justify-between">
                      {feature.title}
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* System Capabilities Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              System Capabilities
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Advanced features powered by Twilio integration and intelligent automation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((capability, index) => (
              <div 
                key={index}
                className="flex gap-4 p-6 rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                    <capability.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {capability.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {capability.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance & Security Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-6">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Security & Compliance
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Built with the highest standards for legal and healthcare data protection
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="border-0 shadow-lg bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                  <Lock className="w-5 h-5 text-blue-600" />
                  Role-Based Access Control
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Granular permissions for viewing and editing sensitive case information based on user roles and responsibilities
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                  <Activity className="w-5 h-5 text-blue-600" />
                  Complete Audit Trail
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Comprehensive logging of all changes, communications, and user actions for legal compliance and accountability
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                  <Database className="w-5 h-5 text-blue-600" />
                  Data Retention Policies
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Automated data lifecycle management ensuring compliance with legal retention requirements
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                  <FileText className="w-5 h-5 text-blue-600" />
                  Legal Notices & Disclaimers
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Built-in legal notices and consent management for all communications and data processing
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              System Integration
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Seamless connectivity with existing court management systems
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="border-0 shadow-lg bg-white dark:bg-gray-800 text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Database className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">
                  DEX / CPCMS Integration
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Automated data import and export with court management systems
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white dark:bg-gray-800 text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">
                  Access Database Mapping
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Legacy system support with complete data migration tools
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white dark:bg-gray-800 text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">
                  Real-Time Sync
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Automated workflow with instant updates across all systems
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Legal Notice */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-5xl mx-auto">
          <Card className="border-0 shadow-md bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-center text-gray-900 dark:text-white">
                Legal Notice & Disclaimer
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-600 dark:text-gray-300 space-y-3 leading-relaxed">
              <p>
                This system is designed for use by authorized court personnel only. All communications are subject to legal privilege and confidentiality requirements under applicable state and federal law.
              </p>
              <p>
                By using this system, you acknowledge that all data is protected under HIPAA, FERPA, and other applicable privacy regulations. Unauthorized access, use, or disclosure of case information is strictly prohibited and may result in criminal prosecution.
              </p>
              <p>
                All system activities are logged and monitored. Users are responsible for maintaining the confidentiality of their access credentials and must report any suspected security breaches immediately.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
