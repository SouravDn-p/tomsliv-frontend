import React from "react";
import { motion } from "motion/react";
import tom from "@/assets/tomslive/Photo/tom.jpg";
import director from "@/assets/tomslive/Photo/Director.jpg";
import Container from "@/common/Container";

const AboutUs: React.FC = () => {
  return (
    <Container className="bg-white py-16 px-4">
      <div className="w-full mx-auto">
        {/* Section Heading */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-gray-900">About Us</h1>
          <motion.p
            className="mt-4 text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Our names are Tom and Morgan, and we are co-founders of FarmLink. We
            designed FarmLink to help farmers more efficiently find their
            perfect employee. Born in England, Tom discovered his passion for
            dairy farming at a young age and has since combined hands-on
            industry experience with strong business knowledge to improve the
            way farmers connect with great people. Morgan is a Harvard graduate
            in psychology who loves working with people. She has an eye for
            detail and is passionate about helping people reach their goals.
          </motion.p>
        </motion.div>

        {/* Profiles */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Tom */}
          <motion.div
            className="bg-gray-50 rounded-2xl p-8 shadow-sm flex flex-col text-center hover:shadow-md transition-shadow"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex justify-start items-center gap-4">
              <motion.img
                src={tom}
                alt="Tom - Owner and Director"
                className="size-24 md:size-40  rounded-full object-cover border-4 border-primary-blue mb-6"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ scale: 1.05 }}
              />

              <motion.div
                className="text-start space-y-1 mb-3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h2 className="text-2xl font-semibold text-gray-900">Tom</h2>
                <p className="text-primary-blue font-medium">Owner & Director</p>
                <p>
                  Email:{" "}
                  <a
                    href="mailto:tom@farmlink.nz"
                    className="text-primary-blue font-medium hover:underline"
                  >
                    tom@farmlink.nz
                  </a>
                </p>
              </motion.div>
            </div>

            <motion.div
              className="text-left space-y-4 mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <p className="text-gray-700 leading-relaxed">
                Born in England, I first discovered my love of dairy farming at
                19 during a working holiday in New Zealand. That experience
                inspired me to complete a Bachelor of Science (Hons) in
                Agriculture with Farm Business Management, before returning to
                New Zealand in 2022 to continue my career among the best farmers
                in the world.
              </p>

              <p className="text-gray-700 leading-relaxed">
                Over the years, farming has become more than just a job – it’s
                my passion, purpose, and lifestyle. I live by the motto of
                “Making dreams reality” and have enjoyed the challenge of
                balancing farming with personal goals such as completing the
                Taupō IRONMAN, starting my own business, and travelling around
                the world.
              </p>
            </motion.div>
          </motion.div>

          {/* Morgan */}
          <motion.div
            className="bg-gray-50 rounded-2xl p-8 shadow-sm flex flex-col text-center hover:shadow-md transition-shadow"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex justify-start items-center gap-4">
              <motion.img
                src={director}
                alt="Morgan - Director"
                className="size-24 md:size-40  rounded-full object-cover border-4 border-primary-blue mb-6"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ scale: 1.05 }}
              />

              <motion.div
                className="text-start space-y-1 mb-3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h2 className="text-2xl font-semibold text-gray-900">Morgan</h2>
                <p className="text-primary-blue font-medium">Director</p>
                <p>
                  Email:{" "}
                  <a
                    href="mailto:morgan@farmlink.nz"
                    className="text-primary-blue font-medium hover:underline"
                  >
                    morgan@farmlink.nz
                  </a>
                </p>
              </motion.div>
            </div>

            <motion.div
              className="text-left space-y-4 mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <p className="text-gray-700 leading-relaxed">
                Growing up on Auckland’s North Shore, I knew nothing about dairy
                farming until I met Tom. When my family relocated to the Waikato
                midway through high school, I quickly realised how much I loved
                rural life.
              </p>

              <p className="text-gray-700 leading-relaxed">
                After graduating from St Peter’s, I was accepted to study and
                row at Harvard University, where I completed my Bachelor of Arts
                (Hons) and captained the women’s rowing team. I am now
                completing my PhD and clinical psychology training at the
                University of Waikato, with the goal of working in adolescent
                mental health.
              </p>

              <p className="text-gray-700 leading-relaxed">
                Outside of my studies and FarmLink, I enjoy staying active and
                completed the 2026 Taupō IRONMAN – inspired by Tom! I also stay
                involved in high school rowing and coach whenever I can.
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-gray-800 font-medium">
            Thank you for supporting FarmLink!
          </p>
        </motion.div>
      </div>
    </Container>
  );
};

export default AboutUs;

// import React from "react";
// import tom from "@/assets/tomslive/Photo/tom.jpg";
// import director from "@/assets/tomslive/Photo/Director.jpg";
// import Container from "@/common/Container";

// const AboutUs: React.FC = () => {
//   return (
//     <Container className="bg-white py-16 px-4">
//       <div className="w-full mx-auto">
//         {/* Section Heading */}
//         <div className="text-center mb-14">
//           <h1 className="text-4xl font-bold text-gray-900">About Us</h1>
//           <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
//             Our names are Tom and Morgan, and we are co-founders of FarmLink. We
//             designed FarmLink to help farmers more efficiently find their
//             perfect employee. Tom is a dairy farmer who understands the
//             challenges of the agricultural industry and hopes to use his
//             business knowledge to streamline the recruitment process. Morgan is
//             a Harvard graduate in psychology who loves working with people. She
//             has an eye for detail and is passionate about helping people reach
//             their goals
//           </p>
//         </div>

//         {/* Profiles */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//           {/* Tom */}
//           <div className="bg-gray-50 rounded-2xl p-8 shadow-sm flex flex-col text-center">
//             <div className="flex justify-start items-center gap-4">
//               <div>
//                 <img
//                   src={tom}
//                   alt="Tom - Owner and Director"
//                   className="sze-24 md:size-40  rounded-full object-cover border-4 border-[#1868C9] mb-6"
//                 />
//               </div>
//               <div className="text-start space-y-1 mb-3">
//                 <h2 className="text-2xl font-semibold text-gray-900">Tom</h2>
//                 <p className="text-[#1868C9] font-medium">Owner & Director</p>
//                 <p>
//                   Email:{" "}
//                   <a
//                     href="mailto:tom@farmlink.nz"
//                     className="text-[#1868C9] font-medium hover:underline"
//                   >
//                     tom@farmlink.nz
//                   </a>
//                 </p>
//               </div>
//             </div>

//             <div className="text-left space-y-4 mb-6">
//               <p className="text-gray-700 leading-relaxed">
//                 Born in England, I first discovered my love of dairy farming at
//                 19 during a working holiday in New Zealand. That experience
//                 inspired me to complete a Bachelor of Science (Hons) in
//                 Agriculture with Farm Business Management, before returning to
//                 New Zealand in 2022 to continue my career among the best farmers
//                 in the world.
//               </p>

//               <p className="text-gray-700 leading-relaxed">
//                 Over the years, farming has become more than just a job – it’s
//                 my passion, purpose, and lifestyle. I live by the motto of “Work
//                 hard, play hard” and have enjoyed the challenge of balancing
//                 farming with personal goals such as completing the Taupō
//                 IRONMAN, starting my own business, and travelling around the
//                 world.
//               </p>

//               <p className="text-gray-700 leading-relaxed">
//                 FarmLink is my first – and exciting – step into
//                 entrepreneurship, and I’m excited to see how we grow!
//               </p>
//             </div>
//           </div>

//           {/* Morgan */}
//           <div className="bg-gray-50 rounded-2xl p-8 shadow-sm flex flex-col text-center">
//             <div className="flex justify-start items-center gap-4">
//               <div>
//                 <img
//                   src={director}
//                   alt="Morgan - Director"
//                   className="size-40  rounded-full object-cover border-4 border-[#1868C9] mb-6"
//                 />
//               </div>
//               <div className="text-start space-y-1 mb-3">
//                 <h2 className="text-2xl font-semibold text-gray-900">Morgan</h2>
//                 <p className="text-[#1868C9] font-medium">Director</p>
//                 <p>
//                   Email:{" "}
//                   <a
//                     href="mailto:morgan@farmlink.nz"
//                     className="text-[#1868C9] font-medium hover:underline"
//                   >
//                     morgan@farmlink.nz
//                   </a>
//                 </p>
//               </div>
//             </div>

//             <div className="text-left space-y-4 mb-6">
//               <p className="text-gray-700 leading-relaxed">
//                 Growing up Auckland’s North Shore, I knew nothing about dairy
//                 farming until I met Tom. Fortunately, when my family relocated
//                 to the Waikato midway through high school, I quickly realised
//                 how much I love rural life.
//               </p>

//               <p className="text-gray-700 leading-relaxed">
//                 After graduating from St Peter’s, I was accepted to study and
//                 row Harvard University, where I completed my Bachelor of Arts
//                 (Hons) and had the privilege of captaining the women’s rowing
//                 team. Now, I’m completing my PhD and clinical psychology
//                 training at the University of Waikato, with the goal of working
//                 in adolescent mental health once qualified.
//               </p>

//               <p className="text-gray-700 leading-relaxed">
//                 Outside of my studies and FarmLink, I love staying active and
//                 completed the 2026 Taupō IRONMAN – inspired by Tom! I also enjoy
//                 staying involved in high school rowing and coach casually
//                 whenever I can.
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Footer Message */}
//         <div className="text-center mt-16">
//           <p className="text-gray-800 font-medium">
//             Thank you for supporting FarmLink!
//           </p>
//         </div>
//       </div>
//     </Container>
//   );
// };

// export default AboutUs;
