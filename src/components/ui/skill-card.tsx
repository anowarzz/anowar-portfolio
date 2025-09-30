import Image from "next/image";

const SkillCard = ({ skill }: { skill: { name: string; icon: string } }) => (
  <div className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 hover:bg-white/10 hover:border-green-500/50 transition-all duration-300 hover:scale-105">
    <div className="flex flex-col items-center text-center space-y-3">
      <div className="w-12 h-12 flex items-center justify-center">
        <Image
          loading="lazy"
          src={skill.icon}
          alt={skill.name}
          className="w-full h-full object-contain hover:animate-spin"
        />
      </div>
      <h3 className="text-white font-medium text-sm">{skill.name}</h3>
    </div>
  </div>
);

export default SkillCard;
