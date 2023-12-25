import type { PropsWithChildren } from "react";

export const PageLayout = (props: PropsWithChildren) => {
  return (
    <main
      className="overflow-none flex justify-center"
      style={{ height: "100dvh" }}
    >
      <div
        className="flex h-full w-full flex-col pt-14"
        style={{ backgroundColor: "#1b1e2c" }}
      >
        {props.children}
      </div>
    </main>
  );
};
