const Footer = () => {
  return (
    <footer className="py-10">
      <div className="container border-t border-black  mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
          <div>
            <h4 className="text-lg font-semibold mb-4">About Artisan Nepal</h4>
            <p className="text-sm">
              We connect artisans with customers, providing a platform to
              showcase and sell unique creations while fostering a supportive
              community.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="text-sm space-y-2">
              <li>
                <a href="/" className="hover:text-gray-400">
                  Home
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-gray-400">
                  About Us
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-gray-400">
                  Shop
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-gray-400">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-gray-400">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="text-sm space-y-2">
              <li>
                Email:{" "}
                <a
                  href="mailto:support@artisannepal.com"
                  className="hover:text-gray-400"
                >
                  support@artisannepal.com
                </a>
              </li>
              <li>
                Phone:{" "}
                <a href="tel:+977-1234567890" className="hover:text-gray-400">
                  +977-1234567890
                </a>
              </li>
              <li>Address: Rupandehi, Nepal</li>
            </ul>
            <div className="mt-4">
              <a href="#" className="text-gray-400 hover:text-white mr-2">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white mr-2">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center border-t border-gray-700 pt-4">
          <p className="text-sm">
            &copy; 2024 Artisan Nepal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
