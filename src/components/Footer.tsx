function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-800 py-6 text-slate-200 shadow-inner">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm tracking-wide">
          &copy; {currentYear} <span className="font-semibold">Dev Dairy</span>.
          All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
