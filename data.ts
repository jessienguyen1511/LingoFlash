export interface VocabCard {
  id: number;
  word: string;
  phonetics: string;
  type: string; // n, adj, idiom
  definition: string;
  example: string;
}

export const vocabList: VocabCard[] = [
  // Image 1
  {
    id: 1,
    word: "Comparison culture",
    phonetics: "/kəmˈpær.ɪ.sən ˈkʌl.tʃər/",
    type: "n",
    definition: "The habit of constantly comparing yourself to others, especially online.",
    example: "Comparison culture on social media can damage self-esteem."
  },
  {
    id: 2,
    word: "Validation",
    phonetics: "/ˌvæl.ɪˈdeɪ.ʃən/",
    type: "n",
    definition: "Approval or recognition from others.",
    example: "Many users seek validation through likes and comments."
  },
  {
    id: 3,
    word: "Misinformation",
    phonetics: "/ˌmɪs.ɪn.fəˈmeɪ.ʃən/",
    type: "n",
    definition: "False or inaccurate information spread unintentionally.",
    example: "Misinformation spreads quickly on social media."
  },
  {
    id: 4,
    word: "Mental well-being",
    phonetics: "/ˌmen.təl ˌwelˈbiː.ɪŋ/",
    type: "n",
    definition: "A person's emotional and psychological health.",
    example: "Excessive screen time can affect mental well-being."
  },
  {
    id: 5,
    word: "Information overload",
    phonetics: "/ˌɪn.fəˈmeɪ.ʃən ˈəʊ.və.ləʊd/",
    type: "n",
    definition: "Having too much information to process effectively.",
    example: "Social media often causes information overload."
  },
  // Image 2
  {
    id: 6,
    word: "Digital boundaries",
    phonetics: "/ˌdɪdʒ.ɪ.təl ˈbaʊn.dər.iz/",
    type: "n",
    definition: "Limits set to control online behavior and screen time.",
    example: "Setting digital boundaries helps reduce stress."
  },
  {
    id: 7,
    word: "Dopamine-driven",
    phonetics: "/ˈdəʊ.pə.miːn ˌdrɪv.ən/",
    type: "adj",
    definition: "Designed to trigger pleasure and reward in the brain.",
    example: "Social media platforms are highly dopamine-driven."
  },
  {
    id: 8,
    word: "Addictive",
    phonetics: "/əˈdɪk.tɪv/",
    type: "adj",
    definition: "Hard to stop doing or using.",
    example: "Many people find social media addictive."
  },
  {
    id: 9,
    word: "Superficial",
    phonetics: "/ˌsuː.pəˈfɪʃ.əl/",
    type: "adj",
    definition: "Focused only on the surface, not deep or meaningful.",
    example: "Online connections can sometimes feel superficial."
  },
  {
    id: 10,
    word: "Distraction",
    phonetics: "/dɪˈstræk.ʃən/",
    type: "n",
    definition: "Something that takes attention away from what matters.",
    example: "Social media is a major distraction during work or study."
  },
  // Image 3 (Idioms) - Inferred types and phonetics where not explicit, matching style
  {
    id: 11,
    word: "Down the rabbit hole",
    phonetics: "/daʊn ðə ˈræb.ɪt həʊl/",
    type: "idiom",
    definition: "Spending way more time than planned on something engrossing.",
    example: "I went down the rabbit hole on Instagram and lost two hours."
  },
  {
    id: 12,
    word: "It’s a double-edged sword",
    phonetics: "/ˌdʌb.əlˌedʒd ˈsɔːrd/",
    type: "idiom",
    definition: "Has both positive and negative effects.",
    example: "Social media is a double-edged sword — it connects people but also creates pressure."
  },
  {
    id: 13,
    word: "It messes with s.o head",
    phonetics: "/mes wɪð ... hed/",
    type: "idiom",
    definition: "Affects someone's mental or emotional state negatively.",
    example: "Comparing yourself to influencers can really mess with your head."
  },
  {
    id: 14,
    word: "Addicted to the feed",
    phonetics: "/əˈdɪk.tɪd tu ðə fiːd/",
    type: "idiom",
    definition: "Unable to stop checking social media updates.",
    example: "I realized I was addicted to the feed, so I deleted the app for a while."
  }
];