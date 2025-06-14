import { motion } from "framer-motion";

const PageTransition = (Component: React.ComponentType) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="p-4"
  >
    <Component />
  </motion.div>
);

export default PageTransition;
