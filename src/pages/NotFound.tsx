import { LinkButton } from "@/common/LinkButton";
import { motion } from "framer-motion";
import {
  Home,
  Search,
  ArrowLeft,
  Leaf,
  Tractor,
  MapPinOff,
} from "lucide-react";
import Container from "@/common/Container";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background-lightBlue overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {/* Abstract Shapes */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[10%] left-[5%] opacity-10"
        >
          <Leaf className="w-32 h-32 text-primary-blue" />
        </motion.div>

        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -10, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[10%] right-[10%] opacity-10"
        >
          <Tractor className="w-40 h-40 text-primary-blue" />
        </motion.div>

        {/* Floating blurred circles */}
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary-blue/5 rounded-full blur-[80px]" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-[#006D77]/5 rounded-full blur-[80px]" />
      </div>

      <Container className="relative z-10">
        <div className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto">
          {/* Animated 404 Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="relative">
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="text-9xl md:text-[12rem] font-bold text-transparent bg-clip-text bg-linear-to-b from-primary-blue to-medium-blue/80 drop-shadow-sm leading-tight select-none"
              >
                404
              </motion.div>

              {/* Icon overlaying the 0 or near it */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center justify-center bg-white p-4 rounded-2xl shadow-xl shadow-primary-blue/10 border border-primary-blue/10"
              >
                <MapPinOff className="w-8 h-8 md:w-10 md:h-10 text-destructive animate-pulse" />
              </motion.div>
            </div>
          </motion.div>

          {/* Heading Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-5xl font-bold text-website-black mb-4">
              Page Not Found
            </h1>
            <p className="text-lg md:text-xl text-paragraph-gray mb-10 max-w-md mx-auto">
              Oops! It looks like this link has withered away or was moved to
              another field.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center"
          >
            <LinkButton
              to="/"
              variant="primary"
              size="lg"
              className="w-full sm:w-auto min-w-[180px] h-14"
            >
              <Home className="w-5 h-5 mr-1" />
              Back to Home
            </LinkButton>

            <LinkButton
              to="/jobs"
              variant="outline"
              size="lg"
              className="w-full sm:w-auto min-w-[180px] h-14"
            >
              <Search className="w-5 h-5 mr-1" />
              Explore Jobs
            </LinkButton>
          </motion.div>

          {/* Secondary Action */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12"
          >
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 text-paragraph-secondary-gray hover:text-primary-blue transition-colors text-sm font-medium cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Go back to previous page
            </button>
          </motion.div>
        </div>
      </Container>

      {/* Small brand indicator */}
      <footer className="absolute bottom-8 left-0 right-0 text-center flex items-center justify-center gap-2 text-paragraph-secondary-gray/50 text-xs tracking-widest uppercase">
        <span className="w-8 h-[1px] bg-paragraph-secondary-gray/20"></span>
        FarmLink Platform
        <span className="w-8 h-[1px] bg-paragraph-secondary-gray/20"></span>
      </footer>
    </div>
  );
};

export default NotFound;
