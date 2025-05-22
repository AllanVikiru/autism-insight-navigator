
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="inline-flex items-center gap-2">
              <div className="rounded-full bg-brand-600 p-1">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="h-4 w-4 text-white"
                >
                  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z"/>
                  <path d="M12 16v-4"/>
                  <path d="M12 8h.01"/>
                </svg>
              </div>
              <span className="text-lg font-bold text-brand-800">EmotionInsight</span>
            </Link>
            <p className="mt-4 text-sm text-gray-500">
              Empowering understanding through emotional insights for autism support.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold">Platform</h3>
            <ul className="mt-4 space-y-3 text-sm text-gray-500">
              <li><Link to="/" className="hover:text-brand-600 transition-all-200">Home</Link></li>
              <li><Link to="/about" className="hover:text-brand-600 transition-all-200">About</Link></li>
              <li><Link to="/resources" className="hover:text-brand-600 transition-all-200">Resources</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold">Resources</h3>
            <ul className="mt-4 space-y-3 text-sm text-gray-500">
              <li><a href="#" className="hover:text-brand-600 transition-all-200">Documentation</a></li>
              <li><a href="#" className="hover:text-brand-600 transition-all-200">Research</a></li>
              <li><a href="#" className="hover:text-brand-600 transition-all-200">Support Groups</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold">Legal</h3>
            <ul className="mt-4 space-y-3 text-sm text-gray-500">
              <li><a href="#" className="hover:text-brand-600 transition-all-200">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-brand-600 transition-all-200">Terms of Service</a></li>
              <li><a href="#" className="hover:text-brand-600 transition-all-200">Accessibility</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-6">
          <p className="text-center text-xs text-gray-500">
            &copy; {new Date().getFullYear()} EmotionInsight. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
