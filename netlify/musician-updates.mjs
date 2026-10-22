// One-time roster updates for the live musician data (Netlify Blobs).
// Each update runs once: its id is recorded in the "data" store under
// migrations.json. Updates only touch the musicians they name, so edits
// made in the Admin panel to anyone else are left alone.

const KIM_TRIBUTE =
  "*In 2025, our dear friend and bandmate, Kim Burgie, passed away. He was a founding member and vital part of this group. His humor and artistry are missed by all who had the pleasure of playing with him; his music will live on through the tunes and arrangements that continue to bring joy to our audiences.*";

const roster2026Nov = [
  {
    match: { ids: ["nancy-maron"], names: ["Nancy Maron"] },
    set: {
      instrument: "Alto saxophone",
      role: "Artistic Director",
      bio: "When not playing with Library Jazz Band, Nancy performs with the Lehman and Westchester concert bands, and when the music calls for it, with local orchestras including Yonkers Philharmonic and Excelsior Symphony Orchestra. In addition to managing LJB, she loves finding new ways to share music, bringing Make Music Day to Yonkers in 2021, and producing the Phenomenal Music series for the YPL in 2026. She currently serves as President of the Board of Trustees for the Yonkers Public Library and President of the Foundation for the Yonkers Public Library.",
    },
  },
  {
    match: { ids: ["musician-1762923848163"], names: ["Kim Burgie"] },
    update: (musician) =>
      musician.bio?.startsWith(KIM_TRIBUTE)
        ? {}
        : { bio: `${KIM_TRIBUTE}\n\n${musician.bio || ""}`.trim() },
  },
  {
    // No longer a regular member: keep him, but last in the section.
    match: { ids: ["musician-1762923305677"], names: ["Chris Ferdinand"] },
    position: "last",
  },
  {
    match: {
      ids: ["musician-1763152597574", "rocco-dapice"],
      names: ["Rocco Dapice"],
    },
    set: {
      name: "Rocco Dapice",
      instrument: "Piano",
      section: "Rhythm",
      photo: "/src/lib/assets/Dapice_piano.webp",
      isHidden: false,
      bio: "Rocco is a pianist, teacher, writer, YAMAHA Performing Artist, and graduate of the Manhattan School of Music (M.M., Jazz Arts). In recent years he has served on the faculty at the Manhattan School's summer program (MSM Summer); at New Visions School for Advanced Math & Science; and has taught piano privately. Rocco has performed in nearly 400 cities and has communicated in word and song in 45 of the 50 states.",
    },
    create: { id: "rocco-dapice", after: ["sarah-cion", "Sarah Cion"] },
  },
  {
    match: { ids: ["tony-romano"], names: ["Tony Romano"] },
    set: {
      name: "Tony Romano",
      instrument: "Guitar",
      section: "Rhythm",
      photo: "/src/lib/assets/Romano_guitar.webp",
      bio: "Guitarist and composer Tony Romano has been a visible part of the New York City music scene for over twenty-five years. Just Jazz Guitar magazine wrote “His tone is beautiful and soulful, and his remarkable technique is a servant to his rich musical imagination and broad harmonic palette.” With a wide range of playing styles, Tony has toured worldwide and performed and recorded with an eclectic array of artists, including Randy Brecker, Joe Locke, Michael Feinstein, Bill Warfield, Harvie S, Joe Bataan, Dave Valentin, Hermán Olivera, Candido Camero, Yomo Toro, Sound Bridges, Joel Frahm, Thomas Chapin, Brit Woodman, Paul Bollenback, Stanley Jordan, The Aimée Allen Group and Debbie Gibson. Tony's guitar work can be heard on all 52 episodes of the BBC series 3rd & Bird as well as the Discovery Channel miniseries Going, Going, Gone! He has also performed for NPR broadcasts, and has appeared on NBC's The Today Show, Telemundo, and the ABC Morning Show. Tony teaches at Riverdale Country School and has been an adjunct professor at Five Towns College, Long Island University, a Teaching Artist for the Kupferberg Center at Queens College and an instructor for the National Guitar Workshop.",
    },
    create: {
      id: "tony-romano",
      after: ["musician-1763152597574", "rocco-dapice", "Rocco Dapice"],
    },
  },
  {
    match: { ids: ["bruce-williamson"], names: ["Bruce Williamson"] },
    set: {
      name: "Bruce Williamson",
      instrument: "Alto saxophone",
      section: "Saxophones",
      photo: "/src/lib/assets/Williamson_alto.webp",
      bio: "Multi-instrumentalist Bruce Williamson was active in the San Francisco Bay Area music scene until moving to New York City in the mid-1980s. He joined organist Jack McDuff's band (with Dave Stryker on guitar), giving him the opportunity to meet and play with Jimmy Smith, Stanley Turrentine and George Benson. Other jazz notables Bruce has performed and/or recorded with include Gary Peacock, Fred Hersch, Dave Douglas, Randy Brecker, Paul McCandless, Tom Harrell, Mark Soskin, Jim Pepper and Toshiko Akiyoshi. Bruce can be heard on more than 60 recordings playing saxophones, clarinets, flutes and keyboards. In New York City's theater world, Bruce has performed in many of Julie Taymor's productions. He is currently playing Reed-1 in the long-running Broadway musical “Chicago”.",
    },
    create: { id: "bruce-williamson", after: ["nancy-maron", "Nancy Maron"] },
  },
  {
    match: {
      ids: ["mike-bomwell"],
      names: ["Mike Bomwell", "Michael Bomwell"],
    },
    set: {
      name: "Mike Bomwell",
      instrument: "Alto saxophone",
      section: "Saxophones",
      photo: "/src/lib/assets/Bomwell_alto.webp",
      bio: "Born and raised in upstate New York, Michael Bomwell went on to study with Donald Sinta at the University of Michigan and earned degrees in classical saxophone and jazz studies. Since moving back to New York in 2001, he has performed with David Liebman, Clarence Clemons, Sandy Duncan, Charli Persip's Supersound, Edison Woods, Olivia Newton-John, and Ken Peplowski, among others. He toured the U.S. and Europe as a founding member of the groundbreaking bhangra brass band, Red Baraat, and can be heard on several of their recordings. He has subbed on Broadway and Off Broadway productions, and performed at several jazz festivals, including Montreux-Detroit, Monterey, Montreal, Molde, Pori, Cape May, and New Orleans Jazz and Heritage Festival. In addition to being a saxophone, flute, and clarinet player, Bomwell teaches instrumental music at an independent school in Bronx, NY. In 2020 he moved with his family to Ossining, NY after 19 years in Manhattan.",
    },
    create: { id: "mike-bomwell", after: ["bruce-williamson"] },
  },
  {
    match: { ids: ["frank-petrocelli"], names: ["Frank Petrocelli"] },
    set: {
      name: "Frank Petrocelli",
      instrument: "Tenor saxophone",
      section: "Saxophones",
      photo: "/src/lib/assets/Petrocelli_tenor.webp",
      bio: "Frank has performed with the Tommy Dorsey and Jimmy Dorsey Orchestras and enjoys a busy freelance career performing in such famous landmarks as Birdland Jazz Club, Feinstein's/54 Below, Town Hall and Carnegie Hall. As an educator and performer, Frank has worked and collaborated with many outstanding artists including Marcus Belgrave, Todd Williams, Ron Blake, Xavier Davis, Todd Coolman, Gary Smulyan, Justin DiCioccio, Mike Holober, Billy Hart and Joe Alessi, to name a few. Frank has been a music educator for over 25 years. He currently teaches at Monroe-Woodbury High School where he directs the Symphonic Band, Jazz Ensemble and Pep Band. He has a master's degree in saxophone performance and jazz studies from Western Michigan University where he studied with Trent Kynaston. He has been a soloist with the Greater Newburgh Symphony Orchestra, Kalamazoo Symphony, Grand Rapids Symphony and West Shore Symphony. Frank resides in Rockland County with his wife and two children.",
    },
    create: {
      id: "frank-petrocelli",
      after: ["musician-1762923131959", "Matt Garrison"],
    },
  },
  {
    match: {
      ids: ["musician-1763152683734", "phil-granger"],
      names: ["Phil Grainger", "Phil Granger"],
    },
    set: {
      name: "Phil Granger",
      instrument: "Trumpet",
      section: "Trumpets",
      photo: "/src/lib/assets/Granger_trumpet.webp",
      isHidden: false,
      bio: "Phil has been playing the trumpet for over 60 years. He was raised in Great Neck, Long Island. He enjoyed playing for the pit orchestras on Broadway for 45 years. He was the Music Director, Lead Trumpet, and Road Manager for Jay Black & The Americans (60's rock 'n' roll sensation) for 30 years. He still enjoys working with tribute bands on Long Island: FM (Steely Dan), PseudoSsudio (Phil Collins), Sir Duke (Stevie Wonder) and Desert Highway (The Eagles). Phil is 1st Trumpet of the Long Island Pops. He has played with the Symphonic Brass Alliance (founded by Rob Susman, lead trombone with the Library Jazz Band), performing all of the convocations for the various colleges of NYU for over 34 years. He is also Lead Trumpet with the Berkshire Jazz Orchestra based in Bethel, CT. Phil is overjoyed to be a member of the Library Jazz Band based in Yonkers, NY.\n\nPhil lives with his wife, Leslie, in Bridgewater, CT with a bunch of dogs and cats since their four children are grown.",
    },
    create: { id: "phil-granger", after: [] },
  },
];

// Dave Levitt is listed as trombone only (he stays co-founder).
const levittTrombone = [
  {
    match: { ids: ["musician-1762925026566"], names: ["Dave Levitt"] },
    set: { instrument: "Trombone" },
  },
];

export const MUSICIAN_UPDATES = [
  { id: "2026-11-roster", changes: roster2026Nov },
  { id: "2026-10-levitt-trombone", changes: levittTrombone },
];

const norm = (s) => (s || "").trim().toLowerCase();

const findMusician = (musicians, { ids = [], names = [] }) =>
  musicians.find((m) => ids.includes(m.id)) ||
  musicians.find((m) => names.map(norm).includes(norm(m.name)));

// Where a musician lands within their section: just after an anchor
// musician (halfway to the next one), or at the end of the section.
const sortOrderAfter = (musicians, section, anchorKeys, self) => {
  const inSection = musicians
    .filter((m) => m.section === section && m !== self)
    .sort((a, b) => a.sortOrder - b.sortOrder);
  const last = inSection.length ? inSection[inSection.length - 1].sortOrder : 0;
  const anchor = inSection.find(
    (m) =>
      anchorKeys.includes(m.id) || anchorKeys.map(norm).includes(norm(m.name)),
  );
  if (!anchor) return last + 1;
  const next = inSection.find((m) => m.sortOrder > anchor.sortOrder);
  return next ? (anchor.sortOrder + next.sortOrder) / 2 : anchor.sortOrder + 1;
};

// Apply one update's changes to a musician list. Safe to run more than
// once: musicians are matched by id or name before anything is added.
export const applyMusicianChanges = (input, changes) => {
  const musicians = input.map((m) => ({ ...m }));
  for (const change of changes) {
    let musician = findMusician(musicians, change.match);
    if (!musician) {
      if (!change.create) continue;
      musician = {
        id: change.create.id,
        name: "",
        role: "",
        instrument: "",
        photo: "",
        bio: "",
        isHidden: false,
        section: change.set?.section || "",
        sortOrder: 0,
      };
      Object.assign(musician, change.set);
      musician.sortOrder = sortOrderAfter(
        musicians,
        musician.section,
        change.create.after,
        musician,
      );
      musicians.push(musician);
      continue;
    }
    Object.assign(musician, change.set, change.update?.(musician));
    if (change.position === "last") {
      const others = musicians.filter(
        (m) => m.section === musician.section && m !== musician,
      );
      const max = Math.max(...others.map((m) => m.sortOrder));
      if (others.length && musician.sortOrder <= max) {
        musician.sortOrder = max + 1;
      }
    }
  }
  return musicians;
};

// Run any updates the store hasn't recorded yet. Returns the (possibly
// updated) list; writes back to the store only when something ran.
export const runMusicianUpdates = async (store, musicians) => {
  const applied = (await store.get("migrations.json", { type: "json" })) || [];
  const pending = MUSICIAN_UPDATES.filter((u) => !applied.includes(u.id));
  if (pending.length === 0) return musicians;

  let updated = musicians;
  for (const update of pending) {
    updated = applyMusicianChanges(updated, update.changes);
  }
  await store.setJSON("musicians.json", updated);
  await store.setJSON("migrations.json", [
    ...applied,
    ...pending.map((u) => u.id),
  ]);
  console.log(
    `Applied musician updates: ${pending.map((u) => u.id).join(", ")}`,
  );
  return updated;
};
