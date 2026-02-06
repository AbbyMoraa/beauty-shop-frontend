const Footer = () => {
  return (
    <footer className="bg-pink-100 text-pink-600 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">Beauty Shop</h3>
            <p className="text-pink-500 text-sm">Your beauty destination</p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-pink-500 text-sm">Email: info@beautyshop.com</p>
            <p className="text-pink-500 text-sm">Phone: +254 700 000 000</p>
          </div>
        </div>
        <div className="border-t border-pink-300 mt-4 pt-4 text-center">
          <p className="text-pink-500 text-sm">&copy; 2024 Beauty Shop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
