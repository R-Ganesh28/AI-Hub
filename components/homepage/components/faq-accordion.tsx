import { motion, useAnimation, useInView } from "framer-motion";
import { useRef, useEffect } from "react";

export function FAQAccordion({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView]);

  return (
    <motion.details
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5 }}
      className="group border border-border p-4 rounded-xl transition-all hover:shadow-md"
    >
      <summary className="cursor-pointer list-none text-lg font-medium flex justify-between items-center">
        {question}
        <span className="transition-transform group-open:rotate-45 text-blue-500">
          +
        </span>
      </summary>
      <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
        {answer}
      </p>
    </motion.details>
  );
}
