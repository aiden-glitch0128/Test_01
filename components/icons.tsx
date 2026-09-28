import type { SVGProps } from "react";
export function Icon({ name, ...props }: SVGProps<SVGSVGElement> & { name: "home" | "timeline" | "plus" | "chart" | "image" | "arrow" | "pin" }) {
  const paths = { home: "M3 11.5 12 4l9 7.5V21h-6v-6H9v6H3z", timeline: "M6 4v16M6 7h12M6 12h9M6 17h12", plus: "M12 5v14M5 12h14", chart: "M5 20V10m7 10V4m7 16v-7", image: "M4 5h16v14H4zM4 16l5-5 4 4 2-2 5 4M15 9h.01", arrow: "m9 18 6-6-6-6", pin: "M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0ZM12 7v6m-3-3h6" };
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}><path d={paths[name]} /></svg>;
}
