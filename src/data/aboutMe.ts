// Static About Me data for SSG
export interface IAboutMeData {
  title: string;
  subtitle: string;
  name: string;
  imageAlt: string;
  badgeText: string;
  whoAmITitle: string;
  paragraphs: string[];
  details: {
    location: {
      title: string;
      value: string;
    };
    education: {
      title: string;
      value: string;
    };
  };
}

export const getStaticAboutMeData = async (): Promise<IAboutMeData> => {
  // Simulate fetching from an API or database
  // In a real app, this could fetch from CMS, API, or database

  const aboutMeData: IAboutMeData = {
    title: "About Me",
    subtitle:
      "Get to know more about my journey and passion for web development.",
    name: "Anowar Hosen",
    imageAlt: "Anowar Hosen",
    badgeText: "👋 About Me",
    whoAmITitle: "Who Am I?",
    paragraphs: [
      "Hi! I'm Anowar from Cumilla, Bangladesh. I've got my Bachelor's and Master's in Business Administration from National University (CGPA 2.98 and 3.13). I Always loved exploring technologies and learning about tech.",
      "Started with just curiosity about websites and apps, now I'm hooked on web development. Love writing code and solving problems. Whether it's making beautiful interfaces or building the behind-the-scenes stuff, it's all fun to me.",
      "My business background helps me understand what clients really need. I'm always learning new tech stuff - from AI to blockchain. When I'm not coding, I'm probably reading about the latest trends or thinking up new ideas.",
    ],
    details: {
      location: {
        title: "Location",
        value: "Cumilla, Bangladesh",
      },
      education: {
        title: "Education",
        value: "MBA, National University",
      },
    },
  };

  // Simulate async data fetching
  return Promise.resolve(aboutMeData);
};
