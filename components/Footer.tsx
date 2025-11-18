"use client";

import { Shield, Scale, FileCheck } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">DH</span>
                </div>
                <span className="text-lg font-semibold">Dependency Hearing SMS</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Secure, compliant case management and communication system for dependency court proceedings.
              </p>
            </div>

            {/* Compliance */}
            <div>
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
                Compliance
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2 text-gray-400">
                  <Shield className="w-4 h-4 text-blue-500" />
                  <span>HIPAA Compliant</span>
                </li>
                <li className="flex items-center gap-2 text-gray-400">
                  <FileCheck className="w-4 h-4 text-blue-500" />
                  <span>FERPA Certified</span>
                </li>
                <li className="flex items-center gap-2 text-gray-400">
                  <Scale className="w-4 h-4 text-blue-500" />
                  <span>Legal Standards Met</span>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
                Support
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="text-gray-400">Technical Support: Available 24/7</li>
                <li className="text-gray-400">Emergency Contact: 1-800-XXX-XXXX</li>
                <li className="text-gray-400">Email: support@dependencyhearing.gov</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-400">
              © {currentYear} Dependency Hearing SMS. All rights reserved.
            </div>
            
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span>Secured & Monitored</span>
              <span>•</span>
              <span>All Activities Logged</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
