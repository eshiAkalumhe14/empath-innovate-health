import './home.css';


function HomePage() {
    return (
      <div >
        <div className="header">
            <h1>Introducing Em<span className="coloured-text">Path</span></h1>
            <p>Your safe space to ask questions and find support for gender-based violence.</p>
            <button>START CHAT</button>
        </div>
        <div className="body">
            <h2>What is Em<span className="coloured-text">Path</span>?</h2>
            <p>Empath is a supportive, AI-powered chatbot designed to help individuals affected by gender-based violence.
            Whether you’re seeking information, need someone to talk to, or just want to be heard — Empath is here for you.
            </p>
            <h2>Who Can Use Empath?</h2>
            <ul>
            <li>Survivors of gender-based violence</li>
            <li>Those seeking to support a friend or loved one</li>
            <li>LGBTQ+ individuals looking for inclusive guidance</li>
            <li>Anyone with questions about safety, consent, or identity</li>
            </ul>
            <h2>How It Works</h2>
            <ol>
            <li>Start chatting with Empath anonymously</li>
            <li>Describe what you’re going through or ask a question</li>
            <li>Get supportive, thoughtful guidance and resources</li>
            </ol>
            <p><strong>Your privacy matters.</strong> Everything you say to Empath is anonymous and confidential. We’re here to listen without judgment.</p>

        </div>
      </div>
    );
  }

    export default HomePage; // Export the HomePage component