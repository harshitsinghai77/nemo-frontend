import moods from "./data/mood.json";

const category = moods.map((el) => el.title);

const mood_images = {};
moods.forEach((m) => {
  const img_src = (
    <img src={require(`./wallpapers/${m.cover}`).default} alt={m.title} />
  );
  mood_images[m.title] = img_src;
});

export const moodsCategory = category;
export const moodImages = mood_images;
