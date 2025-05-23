/**
 * AboutUs Page Component
 *
 * Displays information about the company, team members, testimonials,
 * and key statistics. Showcases the company culture and achievements.
 *
 * @module Pages/AboutUs
 */

/**
 * Interface for team member data
 * @interface TeamMember
 */
interface TeamMember {
  /** Name of the team member */
  name: string;
  /** Job title or role in the company */
  role: string;
  /** URL to team member's profile image */
  image: string;
  /** Inspirational quote from the team member */
  quote: string;
}

/**
 * Interface for company statistics
 * @interface Statistic
 */
interface Statistic {
  /** Numerical value or metric to display */
  value: string;
  /** Label describing what the value represents */
  label: string;
}

/**
 * AboutUs page component
 * Displays company information, team, testimonials and statistics
 *
 * @returns {JSX.Element} AboutUs page component
 */
const AboutUs = () => {
  return (
    <div className="text-gray-900 p-6 md:p-12 flex-grow">
      {/* About Us Section */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6">About Us</h2>
      </div>

      {/* Our Perfect Team */}
      <div className="max-w-6xl mx-auto mt-12 text-center">
        <h2 className="text-3xl font-bold mb-6">Our Perfect Team</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white shadow-md p-6 rounded-lg">
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 mx-auto rounded-full"
              />
              <h4 className="mt-4 font-semibold">{member.name}</h4>
              <p className="text-sm text-gray-600">{member.role}</p>
              <p className="text-gray-500 mt-2">"{member.quote}"</p>
            </div>
          ))}
        </div>
      </div>

      {/* Clients Testimonials */}
      <div
        className="relative bg-cover bg-center mt-12 py-16 px-6 text-white"
        style={{ backgroundImage: "url('/car-interior.jpg')" }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold">Clients Testimonials</h2>
          <p className="mt-4">
            "Getting the coveted high-five in the hallway..."
          </p>
          <p className="font-bold mt-2">- Christian Doe</p>
        </div>
      </div>

      {/* Some Numbers */}
      <div className="max-w-6xl mx-auto mt-12 grid md:grid-cols-4 text-center gap-6">
        {numbers.map((item, index) => (
          <div key={index} className="bg-white shadow-md p-6 rounded-lg">
            <h3 className="text-2xl font-bold">{item.value}</h3>
            <p className="text-gray-600">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Team members data array
 * @type {TeamMember[]}
 */
const teamMembers: TeamMember[] = [
  {
    name: "George Michael Lee",
    role: "General Director",
    image: "/team1.jpg",
    quote: "The fool doth think he is wise...",
  },
  {
    name: "Jane Doe",
    role: "Art Director",
    image: "/team2.jpg",
    quote: "A woman is like a tea bag...",
  },
  {
    name: "Stanley Deo",
    role: "Marketing",
    image: "/team3.jpg",
    quote: "It is better to be hated...",
  },
  {
    name: "Jennifer Baker",
    role: "Designer",
    image: "/team4.jpg",
    quote: "Good friends, good books...",
  },
];

const numbers = [
  { value: "14000+", label: "Happy Clients" },
  { value: "50", label: "Languages" },
  { value: "10+", label: "Years of Work" },
  { value: "2000+", label: "Cups of Coffee" },
];

export default AboutUs;
