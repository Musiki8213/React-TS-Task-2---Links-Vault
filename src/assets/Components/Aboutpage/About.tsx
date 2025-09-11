import './About.css';

export const About = () => {
  return (
    <div className="about-container" id="aboutPage">
      <h1 id="aboutPageHeading">About LinkSaver</h1>
      <p id="aboutPageIntro">
        <strong>Save Your Links. Access Them Anywhere.</strong> LinkSaver helps...
      </p>

      <section id="aboutPageWhy">
        <h2 id="aboutPageWhyHeading">Why We Built This</h2>
        <p>We all know the frustration...</p>
      </section>

      <section id="aboutPageWhat">
        <h2 id="aboutPageWhatHeading">What You Can Do</h2>
        <ul id="aboutPageWhatList">
          <li>Save new links with a title, description, and tags</li>
          <li>View your saved links in a clean, organized layout</li>
          <li>Edit and update links anytime</li>
          <li>Delete old links you no longer need</li>
          <li>Search & filter by title, description, tags, or URL</li>
        </ul>
      </section>

      <section id="aboutPageMission">
        <h2 id="aboutPageMissionHeading">Our Mission</h2>
        <p>To make managing your favorite links effortless...</p>
      </section>

      <section id="aboutPageNext">
        <h2 id="aboutPageNextHeading">What’s Next</h2>
        <ul id="aboutPageNextList">
          <li>☁️ Cloud sync across devices</li>
          <li>👤 User accounts for secure access</li>
          <li>✨ Smarter link organization and recommendations</li>
        </ul>
      </section>
    </div>
  );
};
