import React from "react";
import "./About.scss";

const About: React.FC = () => {
  return (
    <section id="about">
      <div className="about-wrapper">
        <div className="about-text">
          <h1>Senior Full-Stack Developer</h1>
          <p>
            Hi, I'm Sujith Kumar Sadineni, an innovative Frontend Developer with
            6+ years of experience, specializing in building dynamic,
            user-centric web applications. My expertise spans a wide range of
            technologies, including HTML5, CSS3, JavaScript, TypeScript,
            ReactJS, Redux, Angular, GraphQL, REST APIs, and mobile frameworks
            like React Native, Expo, and Flutter.
          </p>
          <a
            href="https://www.linkedin.com/in/YOUR-LINKEDIN-ID"
            className="linkedin-button"
            target="_blank"
            rel="noopener noreferrer"
          >
            Follow on LinkedIn
          </a>
        </div>

        <div className="code-card">
          {/* Decorative Dots */}
          <div className="w-72 h-72 bg-blue-500/20 rounded-full absolute -top-4 -right-4 blur-3xl" />
          <div className="w-72 h-72 bg-purple-500/20 rounded-full absolute -bottom-4 -left-4 blur-3xl" />

          {/* Code Box */}
          <div className="relative bg-neutral-800/50 backdrop-blur-sm border border-neutral-700 rounded-2xl p-8">
            {/* Top dots */}
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>

            <pre className="text-sm font-mono leading-6">
              <code className="text-blue-400">const</code>{" "}
              <code className="text-green-400">developer</code>{" "}
              <code className="text-white">=</code>{" "}
              <code className="text-yellow-400">{"{"}</code>
              <br />
              &nbsp;&nbsp;<code className="text-green-400">name</code>:{" "}
              <code className="text-orange-400">'Frontend Expert'</code>,
              <br />
              &nbsp;&nbsp;<code className="text-green-400">
                experience
              </code>: <code className="text-purple-400">13</code>,
              <br />
              &nbsp;&nbsp;<code className="text-green-400">skills</code>:{" "}
              <code className="text-yellow-400">[</code>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;
              <code className="text-orange-400">'HTML5'</code>,
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;
              <code className="text-orange-400">'CSS3'</code>,
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;
              <code className="text-orange-400">'Advanced JavaScript'</code>,
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;
              <code className="text-orange-400">'Bootstrap'</code>,
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;
              <code className="text-orange-400">'TailwindCSS'</code>,
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;
              <code className="text-orange-400">'React.JS'</code>,
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;
              <code className="text-orange-400">'Redux State Management'</code>,
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;
              <code className="text-orange-400">'Next.JS'</code>,
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;
              <code className="text-orange-400">'Node.JS'</code>,
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;
              <code className="text-orange-400">'Express.JS'</code>,
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;
              <code className="text-orange-400">'GraphQL'</code>,
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;
              <code className="text-orange-400">'Mongo DB'</code>,
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;
              <code className="text-orange-400">'React Native'</code>,
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;
              <code className="text-orange-400">'Web App Development'</code>,
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;
              <code className="text-orange-400">'Mobile App Development'</code>,
              <br />
              &nbsp;&nbsp;<code className="text-yellow-400">]</code>
              <br />
              <code className="text-yellow-400">{"}"}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
