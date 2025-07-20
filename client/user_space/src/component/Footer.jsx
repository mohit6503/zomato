const Footer = () => {
  return (
    <footer className="bg-gray-100 py-10 px-6 mt-12">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Explore More on Zomato</h2>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          <a href="#" className="hover:text-red-500">About Us</a>
          <a href="#" className="hover:text-red-500">Careers</a>
          <a href="#" className="hover:text-red-500">Blog</a>
          <a href="#" className="hover:text-red-500">Restaurants</a>
          <a href="#" className="hover:text-red-500">Privacy Policy</a>
          <a href="#" className="hover:text-red-500">Terms</a>
        </div>
        <p className="mt-6 text-xs text-gray-400">&copy; {new Date().getFullYear()} Zomato Clone. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
