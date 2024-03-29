"use client";

import { SparklesCore } from "./ui/sparkles";

export function SparklesBackground({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-dvh w-full flex-col items-center justify-start overflow-hidden rounded-md bg-black pb-16">
      <div className="absolute inset-0 h-screen w-full">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="h-full w-full"
          particleColor="#FFFFFF"
        />
      </div>
      <h1 className="relative z-20 my-20 text-center text-5xl font-bold text-white md:text-6xl lg:text-7xl">
        SyncBoard
      </h1>
      <div className="z-10 w-full">{children}</div>
    </div>
  );
}
