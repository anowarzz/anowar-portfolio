"use client";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  fullScreen?: boolean;
}

export const LoadingSpinner = ({
  size = "md",
  text = "Loading...",
  fullScreen = false,
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  const containerClasses = fullScreen
    ? "min-h-screen bg-black flex items-center justify-center px-4 relative overflow-hidden"
    : "flex flex-col items-center justify-center space-y-4 p-8";

  const spinner = (
    <div className="relative">
      <div
        className={`${sizeClasses[size]} border-2 border-white/20 border-t-blue-400 rounded-full animate-spin`}
      ></div>
      <div
        className={`absolute inset-0 ${sizeClasses[size]} border-2 border-transparent border-r-cyan-400 rounded-full animate-spin`}
        style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
      ></div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className={containerClasses}>
        {/* Background gradient */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99, 102, 241, 0.15), transparent 70%)",
          }}
        />

        {/* Floating particles */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-60" />
          <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-cyan-400 rounded-full animate-pulse opacity-60 delay-1000" />
          <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-blue-300 rounded-full animate-pulse opacity-60 delay-500" />
          <div className="absolute bottom-1/3 right-1/3 w-1 h-1 bg-cyan-300 rounded-full animate-pulse opacity-60 delay-1500" />
        </div>

        <div className="relative z-10 text-center space-y-8 max-w-md mx-auto">
          {spinner}

          {/* Loading Text */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-semibold text-white">
              <span className="inline-block">
                {text}
                <span
                  className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 animate-bounce"
                  style={{
                    animation: "dots 1.5s infinite",
                    width: "1.5em",
                    textAlign: "left",
                  }}
                >
                  ...
                </span>
              </span>
            </h2>
            <p className="text-white/70 text-sm md:text-base">
              Please wait while we load the content
            </p>
          </div>

          {/* Progress Bar */}
          <div className="w-full max-w-xs mx-auto">
            <div className="h-1 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-pulse"
                style={{ width: "60%" }}
              ></div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="flex justify-center space-x-2">
            <div
              className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
              style={{ animationDelay: "0ms" }}
            ></div>
            <div
              className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
              style={{ animationDelay: "150ms" }}
            ></div>
            <div
              className="w-2 h-2 bg-blue-300 rounded-full animate-bounce"
              style={{ animationDelay: "300ms" }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={containerClasses}>
      {spinner}
      {text && <p className="text-white/70 text-sm text-center">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
