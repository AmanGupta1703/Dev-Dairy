import type { ReactElement } from "react";

interface IHowItWorksStep {
  id: number;
  icon: ReactElement;
  title: string;
  description: string;
}

const howItWorksItems: IHowItWorksStep[] = [
  {
    id: 1,
    icon: (
      <span role="img" aria-label="Write">
        ✎
      </span>
    ),
    title: "Write",
    description:
      "Capture your thoughts and experiences in a simple, distraction-free editor.",
  },
  {
    id: 2,
    icon: (
      <span role="img" aria-label="Publish">
        📝
      </span>
    ),
    title: "Publish",
    description:
      "Share your entries with the world or keep them private—your choice.",
  },
  {
    id: 3,
    icon: (
      <span role="img" aria-label="Connect">
        👥
      </span>
    ),
    title: "Connect",
    description:
      "Engage with a community of developers, exchange feedback, and grow together.",
  },
];

function HowItWorksStep() {
  return (
    <div className="mt-6 flex flex-wrap justify-center gap-8">
      {howItWorksItems.map((item) => (
        <div key={item.id} className="mx-auto max-w-xs">
          <div className="mb-2 text-4xl">{item.icon}</div>
          <h3 className="text-xl font-semibold">{item.title}</h3>
          <p className="text-slate-600">{item.description}</p>
        </div>
      ))}
    </div>
  );
}

function HowItWorks() {
  return (
    <section className="my-10 text-center">
      <h2 className="text-3xl font-bold">How It Works</h2>
      <HowItWorksStep />
    </section>
  );
}

export default HowItWorks;
