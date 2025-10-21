function MemberCard({teamMembers}) {
  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
        {teamMembers.map((member, idx) => (
          <div
            key={idx}
            className="bg-gray-800 p-6 rounded-2xl text-center w-full max-w-xs shadow-lg hover:scale-105 transition"
          >
            <img
              src={member.img}
              alt={member.name}
              className="w-28 h-28 rounded-full mx-auto mb-4 border-4 border-orange-500"
            />
            <h3 className="text-xl font-semibold">{member.name}</h3>
            <p className="text-gray-400 text-sm mb-2">{member.role}</p>
            <p className="text-gray-500 text-sm">{member.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default MemberCard;
