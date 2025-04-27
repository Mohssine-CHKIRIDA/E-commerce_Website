import { MdExpandLess } from "react-icons/md";

function Footer() {
  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <a onClick={handleClick}>
        <div className="bg-[#37475a] text-center mb-12 hover:bg-[#485769] focus:bg-[#485769] cursor-pointer rounded-full shadow-lg transition-all duration-300 fixed bottom-8 right-8">
          <MdExpandLess className="text-white py-3 text-4xl hover:text-5xl transition-transform transform hover:scale-110" />
        </div>
      </a>
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 mb-8">
            <div className="flex flex-col items-center">
              <h3 className="font-bold text-lg mb-3 text-white">
                Get to Know Us
              </h3>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition duration-200"
                >
                  About
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition duration-200"
                >
                  Careers
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition duration-200"
                >
                  Press
                </a>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <h3 className="font-bold text-lg mb-3 text-white">
                Connect with Us
              </h3>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition duration-200"
                >
                  Facebook
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition duration-200"
                >
                  Twitter
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition duration-200"
                >
                  Instagram
                </a>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <h3 className="font-bold text-lg mb-3 text-white">
                Help & Information
              </h3>
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition duration-200"
                >
                  COVID-19
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition duration-200"
                >
                  Your Account
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition duration-200"
                >
                  Returns
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition duration-200"
                >
                  Protection
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition duration-200"
                >
                  App
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition duration-200"
                >
                  Assistant
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition duration-200"
                >
                  Help
                </a>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-700 my-4"></div>

          {/* Copyright section */}
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>© 2025 Company Name. All rights reserved.</p>
            <div className="flex gap-6 mt-3 md:mt-0">
              <a href="#" className="hover:text-white transition duration-200">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition duration-200">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition duration-200">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
