function MemberCard({ teamMembers }) {
  return (
    <>
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl shadow-xl border border-gray-700 hover:border-orange-500 transform hover:-translate-y-2 transition duration-300 group"
          >
            <div className="relative mb-4 group">
              <img
                src={member.img}
                alt={member.name}
                className="w-24 h-24 rounded-full mx-auto border-4 border-orange-500 object-cover transition group-hover:border-orange-400"
              />
              <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/10 rounded-full transition"></div>
            </div>

            <h4 className="text-lg font-bold text-white text-center mb-1">
              {member.name}
            </h4>
            <p className="text-orange-400 text-sm text-center mb-3 font-medium">
              {member.role}
            </p>
            <p className="text-gray-400 text-sm text-center leading-relaxed">
              {member.description}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

export default MemberCard;
