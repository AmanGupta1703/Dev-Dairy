function HeroSection() {
  return (
    <section className="flex items-center justify-between py-8">
      <div className="">
        <h1 className="mb-4 text-5xl font-bold">Welcome to Dev Diary</h1>
        <p className="w-2/3 text-lg text-gray-600">
          Track your coding progress, share insights, and grow with the
          developer community. Start your Dev Diary today!
        </p>
      </div>
      <div className="flex justify-center">
        <img
          src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80"
          alt="Developer at work"
          className="w-full max-w-lg rounded-xl object-cover shadow-lg"
        />
      </div>
    </section>
  );
}

export default HeroSection;
